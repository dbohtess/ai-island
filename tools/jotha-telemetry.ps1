param(
  [string]$KahfPath = "\\192.168.1.229\\KAHF",
  [int]$Port = 8787,
  [int]$SampleSeconds = 2,
  [double]$ActiveThresholdBytesPerSecond = 65536
)

$latest = @{
  updatedAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  snapshot = @{
    devices = @{
      jotha = @{ online = $true }
      kahf = @{ online = $false }
    }
    transfer = @{
      source = "kahf"; destination = "jotha"; active = $false; bytesPerSecond = 0
    }
  }
}

function Get-NetworkBytes {
  $sum = 0.0
  Get-Counter '\Network Interface(*)\Bytes Total/sec' -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty CounterSamples |
    Where-Object { $_.InstanceName -notmatch 'Loopback|isatap|Teredo' } |
    ForEach-Object { $sum += [double]$_.CookedValue }
  return [math]::Max(0, $sum)
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "AI Island telemetry listening on http://127.0.0.1:$Port/api/island/telemetry"

$lastSample = [DateTime]::MinValue
while ($listener.IsListening) {
  if (((Get-Date) - $lastSample).TotalSeconds -ge $SampleSeconds) {
    $lastSample = Get-Date
    $kahfOnline = Test-Path $KahfPath
    $bps = if ($kahfOnline) { Get-NetworkBytes } else { 0 }
    $latest.updatedAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    $latest.snapshot.devices.kahf.online = $kahfOnline
    $latest.snapshot.transfer.active = $kahfOnline -and ($bps -ge $ActiveThresholdBytesPerSecond)
    $latest.snapshot.transfer.bytesPerSecond = [math]::Round($bps)
  }

  $context = $listener.GetContext()
  $context.Response.Headers.Add('Access-Control-Allow-Origin', '*')
  if ($context.Request.Url.AbsolutePath -eq "/api/island/telemetry") {
    $bytes = [Text.Encoding]::UTF8.GetBytes(($latest | ConvertTo-Json -Depth 8))
    $context.Response.ContentType = "application/json"
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else { $context.Response.StatusCode = 404 }
  $context.Response.Close()
}
