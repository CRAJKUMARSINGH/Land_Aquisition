@echo off
echo ========================================
echo Land Acquisition Legal Suite
echo ========================================
echo.
echo Starting application...
echo.

cd landacquisition

echo Installing dependencies...
call npm install

echo.
echo Building application...
call npm run build

echo.
echo Starting server...
python server.py

pause
