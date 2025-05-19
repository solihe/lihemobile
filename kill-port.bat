@echo off
echo Attempting to free ports 5173 and 5174...

REM Kill processes on port 5173
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5173.*LISTENING"') do (
    echo Found process using port 5173 (PID: %%a)
    taskkill /F /PID %%a
    if errorlevel 1 (
        echo Failed to kill process %%a
    ) else (
        echo Successfully killed process %%a
    )
)

REM Kill processes on port 5174
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":5174.*LISTENING"') do (
    echo Found process using port 5174 (PID: %%a)
    taskkill /F /PID %%a
    if errorlevel 1 (
        echo Failed to kill process %%a
    ) else (
        echo Successfully killed process %%a
    )
)

REM Wait a moment for processes to fully terminate
timeout /t 2 /nobreak > nul

REM Verify ports are free
echo Verifying ports are free...
netstat -aon | findstr ":5173.*LISTENING" > nul
if not errorlevel 1 (
    echo WARNING: Port 5173 is still in use!
    echo Please close any applications using port 5173 manually.
    pause
    exit /b 1
)

netstat -aon | findstr ":5174.*LISTENING" > nul
if not errorlevel 1 (
    echo WARNING: Port 5174 is still in use!
    echo Please close any applications using port 5174 manually.
    pause
    exit /b 1
)

echo All ports have been freed successfully!
timeout /t 2 