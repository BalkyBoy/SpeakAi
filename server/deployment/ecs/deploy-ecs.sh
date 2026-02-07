#!/bin/bash
# Deploy Speak AI to ECS Fargate with Application Load Balancer
# Run this after pushing image to ECR

set -e

# Configuration
AWS_REGION="us-east-1"
CLUSTER_NAME="speak-ai-cluster"
SERVICE_NAME="speak-ai-service"
TASK_FAMILY="speak-ai-task"
VPC_ID="vpc-xxxxx"  # Replace with your VPC ID
SUBNET_1="subnet-xxxxx"  # Replace with your subnet IDs
SUBNET_2="subnet-xxxxx"
SECURITY_GROUP="sg-xxxxx"  # Replace with your security group

echo "🚀 Deploying Speak AI to ECS Fargate..."

# Create ECS cluster
echo "📦 Creating ECS cluster..."
aws ecs create-cluster --cluster-name $CLUSTER_NAME --region $AWS_REGION 2>/dev/null || echo "Cluster already exists"

# Create CloudWatch log group
echo "📋 Creating CloudWatch log group..."
aws logs create-log-group --log-group-name /ecs/speak-ai --region $AWS_REGION 2>/dev/null || echo "Log group already exists"

# Register task definition
echo "📝 Registering task definition..."
aws ecs register-task-definition --cli-input-json file://task-definition.json --region $AWS_REGION

# Create or update service
echo "🔄 Creating/updating ECS service..."
aws ecs describe-services --cluster $CLUSTER_NAME --services $SERVICE_NAME --region $AWS_REGION 2>/dev/null | grep -q "ACTIVE" && {
    echo "Updating existing service..."
    aws ecs update-service \
        --cluster $CLUSTER_NAME \
        --service $SERVICE_NAME \
        --task-definition $TASK_FAMILY \
        --desired-count 2 \
        --region $AWS_REGION
} || {
    echo "Creating new service..."
    aws ecs create-service \
        --cluster $CLUSTER_NAME \
        --service-name $SERVICE_NAME \
        --task-definition $TASK_FAMILY \
        --desired-count 2 \
        --launch-type FARGATE \
        --network-configuration "awsvpcConfiguration={subnets=[$SUBNET_1,$SUBNET_2],securityGroups=[$SECURITY_GROUP],assignPublicIp=ENABLED}" \
        --region $AWS_REGION
}

# Wait for service to stabilize
echo "⏳ Waiting for service to stabilize..."
aws ecs wait services-stable --cluster $CLUSTER_NAME --services $SERVICE_NAME --region $AWS_REGION

echo "✅ Deployment complete!"
echo "🌐 Check your service status:"
echo "   aws ecs describe-services --cluster $CLUSTER_NAME --services $SERVICE_NAME --region $AWS_REGION"
