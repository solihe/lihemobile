$ports = @(5173, 5174)
Write-Host 'Attempting to free ports: ' -NoNewline
Write-Host $($ports -join ', ') -ForegroundColor Cyan

foreach ($port in $ports) {
    $processInfo = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
    if ($processInfo) {
        $process = Get-Process -Id $processInfo.OwningProcess -ErrorAction SilentlyContinue
        if ($process) {
            Write-Host ('Found process using port ' + $port + ': ' + $process.ProcessName + ' (PID: ' + $process.Id + ')') -ForegroundColor Yellow
            Stop-Process -Id $process.Id -Force
            Write-Host ('Killed process ' + $process.ProcessName) -ForegroundColor Green
        }
    }
}

Start-Sleep -Seconds 1

$stillInUse = $false
foreach ($port in $ports) {
    $processInfo = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | Where-Object State -eq 'Listen'
    if ($processInfo) {
        Write-Host ('WARNING: Port ' + $port + ' is still in use!') -ForegroundColor Red
        $stillInUse = $true
    }
}

if ($stillInUse) { 
    exit 1 
} else { 
    Write-Host 'All ports have been freed successfully!' -ForegroundColor Green 
} 