# Deployment Scripts

Automated deployment scripts for Speak AI backend.

## Quick Start

```bash
cd deployment
chmod +x quick-deploy.sh
./quick-deploy.sh
```

## Deployment Options

### 1. EC2 + RDS (Recommended for MVP)
**Cost:** ~$45/month  
**Complexity:** Low  
**Scalability:** Manual

**Files:**
- `ec2/setup.sh` - Initial EC2 configuration
- `ec2/deploy.sh` - Application deployment

**Use when:**
- Starting out or MVP
- Predictable traffic
- Budget-conscious

### 2. ECS Fargate (Recommended for Production)
**Cost:** ~$60/month  
**Complexity:** Medium  
**Scalability:** Automatic

**Files:**
- `ecs/push-to-ecr.sh` - Push Docker image to ECR
- `ecs/task-definition.json` - ECS task configuration
- `ecs/deploy-ecs.sh` - Deploy to ECS Fargate

**Use when:**
- Production workload
- Need auto-scaling
- Want managed infrastructure

## Prerequisites

### All Deployments
- AWS Account
- AWS CLI installed and configured
- Docker installed (for building images)

### EC2 Deployment
- SSH key pair
- Basic Linux knowledge

### ECS Deployment
- VPC with 2+ subnets
- Understanding of ECS concepts

## Environment Variables

Required for all deployments:

```bash
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret
PORT=5000
RESEND_API_KEY=re_xxxxx
FROM_EMAIL=SpeakAI <noreply@speak-ai.xyz>
NODE_ENV=production
```

## Step-by-Step Guides

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## Scripts Overview

| Script | Purpose | Run From |
|--------|---------|----------|
| `ec2/setup.sh` | Initial EC2 setup | EC2 instance |
| `ec2/deploy.sh` | Deploy app to EC2 | EC2 instance |
| `ecs/push-to-ecr.sh` | Push image to ECR | Local machine |
| `ecs/deploy-ecs.sh` | Deploy to ECS | Local machine |
| `quick-deploy.sh` | Interactive helper | Local machine |

## Security Checklist

- [ ] Use AWS Secrets Manager for sensitive data
- [ ] Configure security groups properly
- [ ] Enable SSL/TLS (use Certbot or ACM)
- [ ] Use IAM roles, not access keys
- [ ] Enable CloudWatch logging
- [ ] Set up VPC with private subnets for database
- [ ] Enable RDS encryption
- [ ] Use strong passwords (min 16 chars)
- [ ] Enable MFA on AWS account
- [ ] Regular security updates

## Monitoring

### EC2
```bash
# Application logs
docker-compose logs -f

# System metrics
htop
df -h
```

### ECS
```bash
# CloudWatch logs
aws logs tail /ecs/speak-ai --follow

# Service status
aws ecs describe-services --cluster speak-ai-cluster --services speak-ai-service
```

## Troubleshooting

### Container won't start
1. Check logs: `docker logs <container-id>`
2. Verify environment variables
3. Test database connection
4. Check security groups

### Can't connect to database
1. Verify security group allows traffic
2. Check RDS is publicly accessible (if needed)
3. Test with psql: `psql -h endpoint -U user -d db`

### High costs
1. Use Reserved Instances
2. Enable auto-scaling to scale down
3. Use smaller instance types for dev/staging
4. Set up billing alerts

## CI/CD Integration

Example GitHub Actions workflow in `DEPLOYMENT_GUIDE.md`.

## Support

- AWS Documentation: https://docs.aws.amazon.com
- Docker Documentation: https://docs.docker.com
- Prisma Documentation: https://www.prisma.io/docs

## License

MIT
