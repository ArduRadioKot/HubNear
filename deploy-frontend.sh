#!/bin/bash

# Frontend deployment script for dViz
# This script builds the frontend and restarts PM2

set -e

echo "=== Frontend Deployment ==="

# Navigate to frontend directory
cd /home/user1/DeVIZ/HubNear

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build frontend
echo "Building frontend..."
npm run build

# Restart frontend with PM2
echo "Restarting frontend..."
pm2 restart frontend

echo "=== Deployment complete ==="
echo "Frontend should be available at http://82.202.142.35:8000/"
