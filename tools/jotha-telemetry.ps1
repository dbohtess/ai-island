param(
  [string]$KahfPath = "\\192.168.1.229\\KAHF",
  [int]$Port = 8787,
  [int]$SampleSeconds = 2
)

$state = @{
  updatedAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  snapshot = @{
    devices = @{
      jotha = @{ online = $true }
      kahf = @{ online = $false }
    }
    transfer = @{
      source = "kahf"
      destination = "jotha"
      active = $false
      bytesPerSecond = 0
    }
  }
}

$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://127.0.0.1:$Port/")
$listener.Start()
Write-Host "AI Island telemetry: http://127.0.0.1:$Port/api/island/telemetry"

while ($listener.IsListening) {
  $state.updatedAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $state.snapshot.devices.kahf.online = Test-Path $KahfPath

  $context = $listener.GetContext()
  if ($context.Request.Url.AbsolutePath -eq "/api/island/telemetry") {
    $json = $state | ConvertTo-Json -Depth 8
    $bytes = [Text.Encoding]::UTF8.GetBytes($json)
    $context.Response.ContentType = "application/json"
    $context.Response.ContentLength64 = $bytes.Length
    $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $context.Response.StatusCode = 404
  }
  $context.Response.Close()
}
