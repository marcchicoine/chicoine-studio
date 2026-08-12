@echo off
echo Starting local preview server for chicoine.studio...
echo.
echo Once it says "Serving ... on http://localhost:8080/", open that link in your browser.
echo Close this window to stop the server.
echo.
start "" "http://localhost:8080/"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0_serve.ps1"
pause
