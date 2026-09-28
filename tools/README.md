# JOTHA telemetry bridge

Windows-side bridge for AI Island. It exposes the telemetry JSON endpoint consumed by the browser.

## Run

```powershell
powershell -ExecutionPolicy Bypass -File .\tools\jotha-telemetry.ps1
```

Default endpoint: `http://127.0.0.1:8787/api/island/telemetry`.

The first checkpoint reports JOTHA online state and whether the KAHF SMB share is reachable. Transfer throughput sampling is the next checkpoint.
