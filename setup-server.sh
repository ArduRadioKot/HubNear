#!/bin/bash

# Server setup script for dViz on 82.202.142.35
# This script installs PostgreSQL, Redis, and runs migrations

set -e

echo "=== dViz Server Setup ==="
echo "Installing dependencies..."

# Update system
sudo apt update

# Install PostgreSQL with PostGIS
echo "Installing PostgreSQL with PostGIS..."
sudo apt install -y postgresql postgresql-contrib postgis

# Install Redis
echo "Installing Redis..."
sudo apt install -y redis-server

# Start services
echo "Starting services..."
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl start redis
sudo systemctl enable redis

# Setup PostgreSQL database
echo "Setting up PostgreSQL database..."
sudo -u postgres psql <<EOF
-- Create database and user
CREATE DATABASE dvizh;
CREATE USER dvizh WITH PASSWORD 'dvizh';
GRANT ALL PRIVILEGES ON DATABASE dvizh TO dvizh;

-- Connect to database and enable PostGIS
\c dvizh
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO dvizh;
GRANT ALL ON ALL TABLES IN SCHEMA public TO dvizh;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO dvizh;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO dvizh;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO dvizh;
EOF

echo "=== Setup complete ==="
echo "PostgreSQL and Redis are installed and configured."
echo "Database 'dvizh' created with user 'dvizh'."
echo ""
echo "Next steps:"
echo "1. Copy .env to /home/user1/DeVIZ/backend/.env"
echo "2. Run migrations: cd /home/user1/DeVIZ/backend && uv run alembic upgrade head"
echo "3. Restart backend: pm2 restart backend"
