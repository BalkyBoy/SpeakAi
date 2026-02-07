#!/bin/bash
# EC2 Deployment Script for Speak AI
# Run this on your EC2 instance after initial setup

set -e

echo "🚀 Starting Speak AI Deployment on EC2..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose
echo "🔧 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo apt install docker-compose -y
fi

# Install Git
echo "📥 Installing Git..."
sudo apt install git -y

# Clone or pull repository
echo "📂 Setting up application..."
if [ -d "speak-ai-backend" ]; then
    cd speak-ai-backend
    git pull
else
    # Replace with your actual repository URL
    git clone https://github.com/yourusername/speak-ai-backend.git
    cd speak-ai-backend/server
fi

# Create .env file
echo "⚙️  Setting up environment variables..."
cat > .env << EOF
DATABASE_URL=${DATABASE_URL}
JWT_SECRET=${JWT_SECRET}
JWT_REFRESH_SECRET=${JWT_REFRESH_SECRET}
PORT=5000
RESEND_API_KEY=${RESEND_API_KEY}
FROM_EMAIL=SpeakAI <noreply@speak-ai.xyz>
NODE_ENV=production
EOF

# Build Docker image
echo "🏗️  Building Docker image..."
docker build -t speak-ai -f docker/DockerFile .

# Stop existing container
echo "🛑 Stopping existing containers..."
docker-compose -f docker/docker-compose.prod.yml down || true

# Start application
echo "▶️  Starting application..."
docker-compose -f docker/docker-compose.prod.yml up -d

# Run database migrations
echo "🗄️  Running database migrations..."
docker-compose -f docker/docker-compose.prod.yml exec -T app sh -c "cd /app && npx prisma migrate deploy"

# Show logs
echo "📋 Application logs:"
docker-compose -f docker/docker-compose.prod.yml logs --tail=50

echo "✅ Deployment complete!"
echo "🌐 Application running on http://$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4):5000"
