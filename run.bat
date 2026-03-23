@echo off
echo ========================================
echo Product Management System - Quick Start
echo ========================================
echo.
echo This will open two terminals for backend and frontend
echo.
echo Starting Backend (Node.js + Express)...
start cmd /k "cd backend && cls && echo Backend starting... && npm install && npm start"
echo.
echo Waiting 3 seconds before starting frontend...
timeout /t 3 /nobreak
echo.
echo Starting Frontend (React + Vite)...
start cmd /k "cd frontend && cls && echo Frontend starting... && npm install && npm run dev"
echo.
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo ========================================
