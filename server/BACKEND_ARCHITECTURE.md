
# SpeakAI Backend Architecture & Requirements

## Executive Summary

Based on the frontend codebase analysis, SpeakAI is an AI-powered pronunciation training platform that requires a sophisticated backend system to support real-time speech analysis, user management, progress tracking, and content delivery. This document outlines the complete backend architecture needed to support the application.

## 1. System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   Auth Service  │
│   (Next.js)     │◄──►│   (NestJS)      │◄──►│   (JWT/OAuth)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   AI Service    │◄──►│   Core API      │◄──►│   Database      │
│   (Speech AI)   │    │   (NestJS)      │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   File Storage  │◄──►│   Background    │◄──►│   Cache/Queue   │
│   (AWS S3)      │    │   Jobs (Bull)   │    │   (Redis)       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 2. Core Backend Services

### 2.1 Authentication & Authorization Service

**Purpose**: Handle user registration, login, session management, and access control

**Required Endpoints**:
```typescript
POST /auth/register
POST /auth/login
POST /auth/logout
POST /auth/refresh
GET  /auth/me
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email
```

**Request/Response Examples**:
```typescript
// POST /auth/register
{
  email: string;
  password: string;
  nativeLanguage: string;
  learningLanguage: string;
}

// Response
{
  user: User;
  token: string;
  refreshToken: string;
}
```

**Authentication Requirements**:
- JWT tokens with refresh mechanism
- OAuth integration (Google, Apple)
- Email verification
- Password reset functionality
- Rate limiting for auth endpoints

### 2.2 User Management Service

**Purpose**: Manage user profiles, preferences, and account settings

**Required Endpoints**:
```typescript
GET    /users/profile
PUT    /users/profile
DELETE /users/account
GET    /users/preferences
PUT    /users/preferences
POST   /users/upload-avatar
```

**Database Models**:
```prisma
model User {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String
  firstName       String?
  lastName        String?
  avatar          String?
  nativeLanguage  String
  learningLanguage String
  isEmailVerified Boolean  @default(false)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  progress        Progress[]
  sessions        PracticeSession[]
  achievements    UserAchievement[]
  subscriptions   Subscription[]
}

model UserPreferences {
  id                    String  @id @default(cuid())
  userId                String  @unique
  dailyGoalMinutes      Int     @default(15)
  reminderEnabled       Boolean @default(true)
  reminderTime          String?
  difficultyPreference  String  @default("adaptive")
  audioQuality          String  @default("high")
  
  user User @relation(fields: [userId], references: [id])
}
```

### 2.3 Speech Analysis & AI Service

**Purpose**: Process audio recordings and provide pronunciation feedback

**Required Endpoints**:
```typescript
POST /speech/analyze
POST /speech/compare
GET  /speech/phonemes/:language
POST /speech/generate-audio
```

**Request/Response Examples**:
```typescript
// POST /speech/analyze
{
  audioFile: File;
  targetWord: string;
  language: string;
  phonetic: string;
}

// Response
{
  accuracy: number;
  feedback: string;
  phonemeScores: PhonemeScore[];
  suggestions: string[];
  audioUrl: string;
}

interface PhonemeScore {
  phoneme: string;
  accuracy: number;
  position: number;
}
```

**AI Integration Requirements**:
- Speech-to-text processing
- Phoneme-level analysis
- Pronunciation scoring algorithm
- Text-to-speech for examples
- Real-time audio processing
- Multiple language support

### 2.4 Lesson Management Service

**Purpose**: Manage lesson content, curriculum, and learning paths

**Required Endpoints**:
```typescript
GET    /lessons
GET    /lessons/:id
GET    /lessons/search
GET    /lessons/recommended
POST   /lessons/:id/start
PUT    /lessons/:id/progress
GET    /lessons/categories
GET    /lessons/languages
```

**Database Models**:
```prisma
model Lesson {
  id          String   @id @default(cuid())
  title       String
  description String
  language    String
  level       Level
  duration    Int      // minutes
  thumbnail   String?
  rating      Float    @default(0)
  studentCount Int     @default(0)
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  words       LessonWord[]
  progress    LessonProgress[]
  categories  LessonCategory[]
}

model LessonWord {
  id        String @id @default(cuid())
  lessonId  String
  word      String
  phonetic  String
  difficulty String
  tips      String?
  audioUrl  String?
  order     Int
  
  lesson Lesson @relation(fields: [lessonId], references: [id])
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### 2.5 Progress Tracking Service

**Purpose**: Track user learning progress, statistics, and achievements

**Required Endpoints**:
```typescript
GET /progress/overview
GET /progress/weekly
GET /progress/languages
GET /progress/skills
GET /progress/achievements
GET /progress/streaks
POST /progress/session
```

**Database Models**:
```prisma
model PracticeSession {
  id           String   @id @default(cuid())
  userId       String
  lessonId     String?
  duration     Int      // seconds
  accuracy     Float
  wordsCount   Int
  completedAt  DateTime @default(now())
  
  user   User   @relation(fields: [userId], references: [id])
  lesson Lesson? @relation(fields: [lessonId], references: [id])
  
  // Relations
  attempts WordAttempt[]
}

model WordAttempt {
  id        String  @id @default(cuid())
  sessionId String
  word      String
  accuracy  Float
  attempts  Int
  completed Boolean @default(false)
  
  session PracticeSession @relation(fields: [sessionId], references: [id])
}

model UserAchievement {
  id           String   @id @default(cuid())
  userId       String
  achievementId String
  earnedAt     DateTime @default(now())
  
  user        User        @relation(fields: [userId], references: [id])
  achievement Achievement @relation(fields: [achievementId], references: [id])
}

model Achievement {
  id          String @id @default(cuid())
  title       String
  description String
  type        String // streak, accuracy, time, milestone
  criteria    Json   // flexible criteria storage
  icon        String?
  
  users UserAchievement[]
}
```

### 2.6 Analytics & Reporting Service

**Purpose**: Generate insights, reports, and learning analytics

**Required Endpoints**:
```typescript
GET /analytics/dashboard
GET /analytics/progress-report
GET /analytics/skill-breakdown
GET /analytics/export
POST /analytics/events
```

## 3. API Specifications by Domain

### 3.1 Authentication APIs

```typescript
// Public APIs
POST /auth/register
POST /auth/login
POST /auth/forgot-password
POST /auth/reset-password
POST /auth/verify-email

// Authenticated APIs
POST /auth/logout
POST /auth/refresh
GET  /auth/me
PUT  /auth/change-password
```

### 3.2 User Management APIs

```typescript
// Authenticated APIs
GET    /users/profile
PUT    /users/profile
DELETE /users/account
GET    /users/preferences
PUT    /users/preferences
POST   /users/upload-avatar

// Admin APIs
GET    /admin/users
GET    /admin/users/:id
PUT    /admin/users/:id/status
```

### 3.3 Lesson & Content APIs

```typescript
// Public APIs
GET /lessons/public

// Authenticated APIs
GET    /lessons
GET    /lessons/:id
GET    /lessons/search?q=&language=&level=
GET    /lessons/recommended
POST   /lessons/:id/start
PUT    /lessons/:id/progress
GET    /lessons/categories
GET    /lessons/my-progress

// Admin APIs
POST   /admin/lessons
PUT    /admin/lessons/:id
DELETE /admin/lessons/:id
POST   /admin/lessons/:id/publish
```

### 3.4 Speech Processing APIs

```typescript
// Authenticated APIs
POST /speech/analyze
POST /speech/compare
GET  /speech/phonemes/:language
POST /speech/generate-audio
GET  /speech/supported-languages
```

### 3.5 Progress & Analytics APIs

```typescript
// Authenticated APIs
GET  /progress/overview
GET  /progress/weekly
GET  /progress/monthly
GET  /progress/languages
GET  /progress/skills
GET  /progress/achievements
GET  /progress/streaks
POST /progress/session
GET  /progress/export

// Admin APIs
GET /admin/analytics/users
GET /admin/analytics/lessons
GET /admin/analytics/engagement
```

## 4. Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String
  firstName       String?
  lastName        String?
  avatar          String?
  nativeLanguage  String
  learningLanguage String
  isEmailVerified Boolean  @default(false)
  isActive        Boolean  @default(true)
  lastLoginAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // Relations
  preferences     UserPreferences?
  progress        Progress[]
  sessions        PracticeSession[]
  achievements    UserAchievement[]
  subscriptions   Subscription[]
  
  @@map("users")
}

model UserPreferences {
  id                    String  @id @default(cuid())
  userId                String  @unique
  dailyGoalMinutes      Int     @default(15)
  reminderEnabled       Boolean @default(true)
  reminderTime          String?
  difficultyPreference  String  @default("adaptive")
  audioQuality          String  @default("high")
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("user_preferences")
}

model Lesson {
  id          String   @id @default(cuid())
  title       String
  description String
  language    String
  level       Level
  duration    Int      // minutes
  thumbnail   String?
  rating      Float    @default(0)
  studentCount Int     @default(0)
  isPublished Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  // Relations
  words       LessonWord[]
  progress    LessonProgress[]
  categories  LessonCategory[]
  sessions    PracticeSession[]
  
  @@map("lessons")
}

model LessonWord {
  id        String @id @default(cuid())
  lessonId  String
  word      String
  phonetic  String
  difficulty String
  tips      String?
  audioUrl  String?
  order     Int
  
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  @@map("lesson_words")
}

model LessonProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  progress    Float    @default(0) // 0-100
  completed   Boolean  @default(false)
  lastAccuracy Float?
  startedAt   DateTime @default(now())
  completedAt DateTime?
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  @@unique([userId, lessonId])
  @@map("lesson_progress")
}

model PracticeSession {
  id           String   @id @default(cuid())
  userId       String
  lessonId     String?
  duration     Int      // seconds
  accuracy     Float
  wordsCount   Int
  completedAt  DateTime @default(now())
  
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
  lesson Lesson? @relation(fields: [lessonId], references: [id])
  
  // Relations
  attempts WordAttempt[]
  
  @@map("practice_sessions")
}

model WordAttempt {
  id        String  @id @default(cuid())
  sessionId String
  word      String
  accuracy  Float
  attempts  Int
  completed Boolean @default(false)
  audioUrl  String?
  
  session PracticeSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  
  @@map("word_attempts")
}

model Achievement {
  id          String @id @default(cuid())
  title       String
  description String
  type        String // streak, accuracy, time, milestone
  criteria    Json   // flexible criteria storage
  icon        String?
  
  users UserAchievement[]
  
  @@map("achievements")
}

model UserAchievement {
  id           String   @id @default(cuid())
  userId       String
  achievementId String
  earnedAt     DateTime @default(now())
  
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  achievement Achievement @relation(fields: [achievementId], references: [id])
  
  @@unique([userId, achievementId])
  @@map("user_achievements")
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  plan      String   // free, premium, pro
  status    String   // active, cancelled, expired
  startDate DateTime @default(now())
  endDate   DateTime?
  
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("subscriptions")
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

## 5. Background Jobs & Event-Driven Architecture

### 5.1 Background Jobs (Bull Queue)

```typescript
// Audio Processing Jobs
interface AudioProcessingJob {
  audioFileUrl: string;
  userId: string;
  sessionId: string;
  targetWord: string;
  language: string;
}

// Progress Calculation Jobs
interface ProgressCalculationJob {
  userId: string;
  sessionId: string;
}

// Achievement Check Jobs
interface AchievementCheckJob {
  userId: string;
  eventType: string;
  eventData: any;
}

// Email Notification Jobs
interface EmailNotificationJob {
  userId: string;
  type: 'welcome' | 'achievement' | 'reminder' | 'progress_report';
  data: any;
}
```

### 5.2 Event-Driven Flows

```typescript
// User Registration Flow
UserRegistered → SendWelcomeEmail → CreateInitialProgress → AssignFirstAchievement

// Practice Session Flow
SessionStarted → ProcessAudio → CalculateAccuracy → UpdateProgress → CheckAchievements → SendNotifications

// Daily Progress Flow
DailyProgressCalculation → GenerateInsights → SendProgressReport → UpdateStreaks
```

## 6. External Services & Integrations

### 6.1 AI/ML Services
- **Speech Recognition**: Google Cloud Speech-to-Text or Azure Speech Services
- **Pronunciation Analysis**: Custom ML model or IBM Watson Speech to Text
- **Text-to-Speech**: Google Cloud TTS or Amazon Polly
- **Language Processing**: Natural Language APIs

### 6.2 Infrastructure Services
- **File Storage**: AWS S3 or Google Cloud Storage
- **CDN**: CloudFlare or AWS CloudFront
- **Email Service**: SendGrid or AWS SES
- **Push Notifications**: Firebase Cloud Messaging
- **Analytics**: Google Analytics, Mixpanel
- **Error Tracking**: Sentry
- **Logging**: Winston + ELK Stack

### 6.3 Payment Processing
- **Subscription Management**: Stripe
- **Payment Processing**: Stripe, PayPal
- **Invoice Generation**: Stripe Billing

## 7. Security Requirements

### 7.1 Authentication & Authorization
- JWT tokens with short expiration (15 minutes)
- Refresh tokens with longer expiration (7 days)
- Role-based access control (RBAC)
- OAuth 2.0 integration
- Multi-factor authentication (optional)

### 7.2 Data Protection
- Encryption at rest (database)
- Encryption in transit (HTTPS/TLS)
- Audio file encryption
- PII data anonymization
- GDPR compliance

### 7.3 API Security
- Rate limiting (Redis-based)
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- API key management

## 8. Performance & Scalability

### 8.1 Caching Strategy
```typescript
// Redis Caching Layers
- User sessions: 15 minutes TTL
- Lesson content: 1 hour TTL
- Progress data: 5 minutes TTL
- Audio files: 24 hours TTL
- API responses: 1 minute TTL
```

### 8.2 Database Optimization
- Indexing strategy for frequent queries
- Connection pooling
- Read replicas for analytics
- Partitioning for large tables
- Query optimization

### 8.3 Scalability Considerations
- Horizontal scaling with load balancers
- Microservices architecture
- Container orchestration (Docker + Kubernetes)
- Auto-scaling based on metrics
- CDN for static assets

## 9. Monitoring & Observability

### 9.1 Application Monitoring
- Health check endpoints
- Performance metrics (response times, throughput)
- Error rates and alerting
- User behavior analytics
- Business metrics tracking

### 9.2 Infrastructure Monitoring
- Server resource utilization
- Database performance
- Queue processing metrics
- External service dependencies
- Network latency monitoring

## 10. Development & Deployment

### 10.1 Development Environment
```typescript
// Environment Variables
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
SPEECH_API_KEY=...
STRIPE_SECRET_KEY=...
```

### 10.2 CI/CD Pipeline
- Automated testing (unit, integration, e2e)
- Code quality checks (ESLint, Prettier)
- Security scanning
- Database migrations
- Blue-green deployments
- Rollback capabilities

## 11. API Rate Limits & Quotas

```typescript
// Rate Limiting Configuration
const rateLimits = {
  auth: '5 requests per minute',
  speech: '10 requests per minute',
  lessons: '100 requests per minute',
  progress: '50 requests per minute',
  general: '1000 requests per hour'
};
```

## 12. Error Handling & Logging

### 12.1 Error Response Format
```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
}
```

### 12.2 Logging Strategy
- Structured logging (JSON format)
- Log levels: ERROR, WARN, INFO, DEBUG
- Request/response logging
- Performance logging
- Security event logging

## 13. Testing Strategy

### 13.1 Testing Pyramid
- **Unit Tests**: 70% coverage
- **Integration Tests**: API endpoints, database operations
- **E2E Tests**: Critical user flows
- **Performance Tests**: Load testing, stress testing
- **Security Tests**: Penetration testing, vulnerability scanning

## 14. Assumptions & Open Questions

### 14.1 Assumptions
- Users will primarily access via web browser
- Audio files will be under 10MB
- Peak concurrent users: 10,000
- Data retention: 7 years
- Multi-language support required from day 1

### 14.2 Open Questions
1. What AI/ML service will be used for speech analysis?
2. What are the specific pronunciation accuracy algorithms?
3. How will offline functionality be handled?
4. What are the specific compliance requirements (COPPA, GDPR)?
5. What is the expected user growth trajectory?
6. How will content moderation be handled?
7. What analytics and reporting requirements exist?

## 15. Implementation Phases

### Phase 1: Core MVP (Weeks 1-8)
- User authentication and management
- Basic lesson content management
- Simple speech recording and playback
- Progress tracking foundation
- Basic dashboard

### Phase 2: AI Integration (Weeks 9-16)
- Speech analysis integration
- Pronunciation scoring
- Feedback generation
- Achievement system
- Enhanced progress tracking

### Phase 3: Advanced Features (Weeks 17-24)
- Real-time pronunciation feedback
- Advanced analytics
- Social features
- Mobile optimization
- Performance optimization

### Phase 4: Scale & Polish (Weeks 25-32)
- Load testing and optimization
- Advanced security features
- Admin dashboard
- API documentation
- Production deployment

This architecture provides a comprehensive foundation for building the SpeakAI backend system, supporting all the features evident in the frontend codebase while ensuring scalability, security, and maintainability.