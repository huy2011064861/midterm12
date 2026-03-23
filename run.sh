#!/bin/bash

echo "========================================"
echo "Product Management System - Quick Start"
echo "========================================"
echo ""

# Start backend
echo "Starting Backend (Node.js + Express)..."
cd backend
npm install
npm start &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend in another terminal
echo ""
echo "Starting Frontend (React + Vite)..."
cd ../frontend
npm install
npm run dev &
FRONTEND_PID=$!

echo ""
echo "========================================"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
