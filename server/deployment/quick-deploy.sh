#!/bin/bash
# Quick deployment script - Choose your deployment method

echo "🚀 Speak AI Deployment Helper"
echo ""
echo "Choose deployment method:"
echo "1) EC2 + RDS (Simple, cost-effective)"
echo "2) ECS Fargate (Scalable, managed)"
echo "3) Local Docker test"
echo ""
read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        echo ""
        echo "📋 EC2 + RDS Deployment Steps:"
        echo ""
        echo "1. Create RDS database:"
        echo "   aws rds create-db-instance --db-instance-identifier speak-ai-db --db-instance-class db.t3.micro --engine postgres --master-username postgres --master-user-password YourPassword123! --allocated-storage 20"
        echo ""
        echo "2. Launch EC2 instance (Ubuntu 22.04, t3.medium)"
        echo ""
        echo "3. SSH into EC2 and run:"
        echo "   bash <(curl -s https://raw.githubusercontent.com/yourusername/speak-ai/main/server/deployment/ec2/setup.sh)"
        echo ""
        echo "4. Set environment variables and deploy:"
        echo "   export DATABASE_URL='your-rds-url'"
        echo "   bash <(curl -s https://raw.githubusercontent.com/yourusername/speak-ai/main/server/deployment/ec2/deploy.sh)"
        echo ""
        ;;
    2)
        echo ""
        echo "📋 ECS Fargate Deployment Steps:"
        echo ""
        echo "1. Store secrets in AWS Secrets Manager"
        echo "2. Create IAM roles (ecsTaskExecutionRole)"
        echo "3. Push image to ECR:"
        echo "   cd deployment/ecs && ./push-to-ecr.sh"
        echo "4. Update task-definition.json with your account ID"
        echo "5. Deploy to ECS:"
        echo "   ./deploy-ecs.sh"
        echo ""
        echo "See DEPLOYMENT_GUIDE.md for detailed instructions"
        echo ""
        ;;
    3)
        echo ""
        echo "🐳 Testing locally with Docker..."
        cd ../..
        
        # Check if .env exists
        if [ ! -f ".env" ]; then
            echo "❌ .env file not found!"
            echo "Create .env file with required variables"
            exit 1
        fi
        
        # Build image
        echo "Building Docker image..."
        docker build -t speak-ai -f docker/DockerFile .
        
        # Run container
        echo "Starting container..."
        docker run -p 5000:5000 --env-file .env speak-ai
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac
