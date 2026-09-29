@echo off
cd /d "%~dp0"

rem 如果预览服务已在运行，直接打开浏览器
netstat -ano | findstr ":8000 " | findstr LISTENING >nul
if %errorlevel%==0 (
  start "" http://localhost:8000
  exit /b
)

rem 否则启动服务并打开浏览器
start "" http://localhost:8000
node server.js
pause
