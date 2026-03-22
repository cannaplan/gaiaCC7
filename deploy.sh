#!/bin/bash
set -e

APP_DIR="/var/www/gaiaCC7"
REPO="https://github.com/YOURUSERNAME/gaiaCC7.git"
COMPOSE="docker-compose.yml"

echo "🚀 Deploying gaiaCC7..."

# Update system & Docker
sudo apt update -qq
sudo apt install docker.io docker-compose -y
sudo systemctl start docker
sudo usermod -aG docker $USER

# Clone/update repo
if [ -d "$APP_DIR" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone $REPO $APP_DIR
  cd "$APP_DIR"
fi

# Build & start
docker compose down || true
docker compose build --no-cache
docker compose up -d

# Cleanup
docker system prune -f

echo "✅ Deploy complete! Visit http://$(curl -s ifconfig.me):80"
