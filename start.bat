@echo off
echo Starting Clinical Trial Management System...

echo.
echo Starting Flask Backend...
start "Flask Backend" cmd /k "python app.py"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting React Frontend...
cd frontend
start "React Frontend" cmd /k "npm start"

echo.
echo Both services are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause