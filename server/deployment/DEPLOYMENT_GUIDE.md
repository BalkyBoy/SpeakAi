# Speak AI Deployment Guide

## Table of Contents
1. [EC2 + RDS Deployment](#ec2--rds-deployment)
2. [ECS Fargate Deployment](#ecs-fargate-deployment)
3. [Environment Setup](#environment-setup)

---

## EC2 + RDS Deployment

### Prerequisites
- AWS Account with EC2 and RDS access
- SSH key pair for EC2
- AWS CLI installed locally

### Step 1: Create RDS Database

```bash
# Create RDS PostgreSQL instance
aws rds create-db-instance \
    --db-instance-identifier speak-ai-db \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username postgres \
    --master-user-password YourStrongPassword123! \
    --allocated-storage 20 \
    --vpc-security-group-ids sg-xxxxx \
    --publicly-accessible \
    --region us-east-1

# Wait for database to be available (5-10 minutes)
aws rds wait db-instance-available --db-instance-identifier speak-ai-db
```

### Step 2: Launch EC2 Instance

```bash
# Launch Ubuntu EC2 instance
aws ec2 run-instances \
    --image-id ami-0c55b159cbfafe1f0 \
    --instance-type t3.medium \
    --key-name your-key-pair \
    --security-group-ids sg-xxxxx \
    --subnet-id subnet-xxxxx \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=speak-ai-server}]'
```

### Step 3: Connect and Setup

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Copy setup script
scp -i your-key.pem deployment/ec2/setup.sh ubuntu@your-ec2-ip:~/

# Run setup
chmod +x setup.sh
./setup.sh
```

### Step 4: Deploy Application

```bash
# Set environment variables
export DATABASE_URL="postgresql://postgres:YourPassword@your-rds-endpoint:5432/speak"
export JWT_SECRET="your-jwt-secret"
export JWT_REFRESH_SECRET="your-refresh-secret"
export RESEND_API_KEY="your-resend-key"

# Copy and run deployment script
scp -i your-key.pem deployment/ec2/deploy.sh ubuntu@your-ec2-ip:~/
chmod +x deploy.sh
./deploy.sh
```

### Step 5: Setup SSL (Optional)

```bash
# After pointing your domain to EC2 IP
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## ECS Fargate Deployment

### Prerequisites
- AWS CLI configured
- Docker installed locally
- VPC with at least 2 subnets in different AZs

### Step 1: Setup AWS Secrets Manager

```bash
# Store secrets in AWS Secrets Manager
aws secretsmanager create-secret \
    --name speak-ai/database-url \
    --secret-string "postgresql://postgres:password@your-rds-endpoint:5432/speak" \
    --region us-east-1

aws secretsmanager create-secret \
    --name speak-ai/jwt-secret \
    --secret-string "your-jwt-secret" \
    --region us-east-1

aws secretsmanager create-secret \
    --name speak-ai/jwt-refresh-secret \
    --secret-string "your-refresh-secret" \
    --region us-east-1

aws secretsmanager create-secret \
    --name speak-ai/resend-api-key \
    --secret-string "your-resend-key" \
    --region us-east-1
```

### Step 2: Create IAM Roles

```bash
# Create ECS Task Execution Role
aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [{
        "Effect": "Allow",
        "Principal": {"Service": "ecs-tasks.amazonaws.com"},
        "Action": "sts:AssumeRole"
      }]
    }'

# Attach policies
aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/SecretsManagerReadWrite
```

### Step 3: Push Image to ECR

```bash
# From your local machine in the server directory
cd deployment/ecs
chmod +x push-to-ecr.sh
./push-to-ecr.sh
```

### Step 4: Update Task Definition

Edit `deployment/ecs/task-definition.json`:
- Replace `YOUR_ACCOUNT_ID` with your AWS account ID
- Update region if not using us-east-1
- Update secret ARNs with your actual ARNs

### Step 5: Deploy to ECS

```bash
# Update deploy-ecs.sh with your VPC/subnet/security group IDs
chmod +x deploy-ecs.sh
./deploy-ecs.sh
```

### Step 6: Create Application Load Balancer

```bash
# Create ALB
aws elbv2 create-load-balancer \
    --name speak-ai-alb \
    --subnets subnet-xxxxx subnet-xxxxx \
    --security-groups sg-xxxxx \
    --scheme internet-facing \
    --type application

# Create target group
aws elbv2 create-target-group \
    --name speak-ai-targets \
    --protocol HTTP \
    --port 5000 \
    --vpc-id vpc-xxxxx \
    --target-type ip \
    --health-check-path /api/v1

# Create listener
aws elbv2 create-listener \
    --load-balancer-arn arn:aws:elasticloadbalancing:... \
    --protocol HTTP \
    --port 80 \
    --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...
```

---

## Environment Setup

### Required Environment Variables

```bash
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-secret-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key
PORT=5000
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=SpeakAI <noreply@speak-ai.xyz>
NODE_ENV=production
```

### Security Group Rules

**EC2 Security Group:**
- Port 22 (SSH) - Your IP only
- Port 80 (HTTP) - 0.0.0.0/0
- Port 443 (HTTPS) - 0.0.0.0/0
- Port 5000 (App) - Optional, if not using Nginx

**RDS Security Group:**
- Port 5432 (PostgreSQL) - EC2 security group or ECS security group

**ECS Security Group:**
- Port 5000 - ALB security group only

**ALB Security Group:**
- Port 80 - 0.0.0.0/0
- Port 443 - 0.0.0.0/0

---

## Monitoring & Logs

### EC2 Logs
```bash
# View application logs
docker-compose -f docker/docker-compose.prod.yml logs -f

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### ECS Logs
```bash
# View CloudWatch logs
aws logs tail /ecs/speak-ai --follow --region us-east-1
```

---

## Scaling

### EC2 Scaling
- Use Auto Scaling Groups
- Place behind Application Load Balancer
- Use Amazon ElastiCache for Redis

### ECS Scaling
```bash
# Update desired count
aws ecs update-service \
    --cluster speak-ai-cluster \
    --service speak-ai-service \
    --desired-count 4
```

---

## Cost Optimization

**EC2 Approach:**
- t3.medium: ~$30/month
- RDS db.t3.micro: ~$15/month
- Total: ~$45/month

**ECS Fargate Approach:**
- 2 tasks (0.5 vCPU, 1GB): ~$25/month
- RDS db.t3.micro: ~$15/month
- ALB: ~$20/month
- Total: ~$60/month

**Recommendations:**
- Use Reserved Instances for 40% savings
- Use RDS Reserved Instances
- Enable auto-scaling to scale down during low traffic
- Use AWS Savings Plans

---

## Troubleshooting

### Database Connection Issues
```bash
# Test database connection
psql -h your-rds-endpoint -U postgres -d speak

# Check security groups allow traffic
```

### Container Won't Start
```bash
# Check logs
docker logs container-id

# Check environment variables
docker exec container-id env
```

### High Memory Usage
```bash
# Increase ECS task memory
# Or upgrade EC2 instance type
```

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Push to ECR
        run: |
          cd server/deployment/ecs
          ./push-to-ecr.sh
      
      - name: Deploy to ECS
        run: |
          cd server/deployment/ecs
          ./deploy-ecs.sh
```

---

## Support

For issues or questions:
- Check CloudWatch logs
- Review security group rules
- Verify environment variables
- Check RDS connectivity
