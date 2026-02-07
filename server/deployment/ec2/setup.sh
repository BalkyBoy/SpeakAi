#!/bin/bash
# Initial EC2 Setup Script
# Run this ONCE when you first launch your EC2 instance

set -e

echo "🔧 Initial EC2 Setup for Speak AI..."

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install nginx -y

# Configure Nginx as reverse proxy
echo "⚙️  Configuring Nginx..."
sudo tee /etc/nginx/sites-available/speak-ai > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;

    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Enable site
sudo ln -sf /etc/nginx/sites-available/speak-ai /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Install certbot for SSL (optional)
echo "🔒 Installing Certbot for SSL..."
sudo apt install certbot python3-certbot-nginx -y

echo "✅ Initial setup complete!"
echo ""
echo "Next steps:"
echo "1. Set your environment variables:"
echo "   export DATABASE_URL='your-rds-url'"
echo "   export JWT_SECRET='your-secret'"
echo "   export JWT_REFRESH_SECRET='your-refresh-secret'"
echo "   export RESEND_API_KEY='your-api-key'"
echo ""
echo "2. Run the deployment script:"
echo "   bash deploy.sh"
echo ""
echo "3. (Optional) Setup SSL with your domain:"
echo "   sudo certbot --nginx -d yourdomain.com"
