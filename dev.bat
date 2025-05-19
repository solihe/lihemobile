@echo off
echo Starting development server...

powershell -NoProfile -ExecutionPolicy Bypass -File kill-port.ps1
if errorlevel 1 (
    echo Failed to free required ports. Please close any applications using these ports manually.
    pause
    exit /b 1
)

echo Starting Vite development server...
npm run dev 