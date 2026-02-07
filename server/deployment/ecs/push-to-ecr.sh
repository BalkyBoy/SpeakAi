#!/bin/bash
# Push Docker image to Amazon ECR
# Run this from your local machine or CI/CD pipeline

set -e

# Configuration
AWS_REGION="us-east-1"  # Change to your region
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_REPOSITORY="speak-ai"
IMAGE_TAG="${1:-latest}"

echo "🚀 Pushing Speak AI to Amazon ECR..."
echo "Region: $AWS_REGION"
echo "Account: $AWS_ACCOUNT_ID"
echo "Repository: $ECR_REPOSITORY"
echo "Tag: $IMAGE_TAG"

# Create ECR repository if it doesn't exist
echo "📦 Creating ECR repository..."
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION 2>/dev/null || \
    aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION

# Login to ECR
echo "🔐 Logging in to ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Build image
echo "🏗️  Building Docker image..."
docker build -t $ECR_REPOSITORY:$IMAGE_TAG -f docker/DockerFile .

# Tag image
echo "🏷️  Tagging image..."
docker tag $ECR_REPOSITORY:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
docker tag $ECR_REPOSITORY:$IMAGE_TAG $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

# Push image
echo "⬆️  Pushing image to ECR..."
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG
docker push $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:latest

echo "✅ Image pushed successfully!"
echo "Image URI: $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY:$IMAGE_TAG"
