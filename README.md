# Speak AI – Database Schema & System Architecture

---

## 1. High-Level System Architecture

### Architecture Style
- **Event-driven microservices** with a modular monolith MVP option
- **API-first** design
- **Streaming + batch processing**

### Core Components

**Client Applications**
- Web Dashboard (React / Next.js)
- Mobile Apps (React Native – later)
- Third-party integrations via API

**API Gateway**
- Authentication & authorization
- Rate limiting
- Request routing

**Core Services (NestJS)**
- Auth Service
- User & Organization Service
- Audio Ingestion Service
- Speech Processing Service
- NLP & Insights Service
- Transcript Management Service
- Billing & Usage Service

**Infrastructure Services**
- Object Storage (Audio files)
- Relational DB (PostgreSQL)
- Cache (Redis)
- Message Queue / Stream (Kafka / Redis Streams)
- Search Engine (OpenSearch / Meilisearch)

**AI/ML Layer**
- ASR (Speech-to-Text)
- Translation
- NLP (Sentiment, Topics, Summary)
- Optional: External models (Whisper, Deepgram, etc.)

---

## 2. Data Flow (Speech → Insights)

1. User uploads audio or starts live stream
2. Audio stored in Object Storage
3. Audio metadata saved in DB
4. Event emitted to queue
5. Speech service transcribes audio
6. NLP service extracts insights
7. Results stored and indexed
8. User views/searches/export data

---

## 3. Database Design (PostgreSQL)

### 3.1 Users & Organizations

**users**
- id (uuid, pk)
- email (unique)
- password_hash
- name
- role (admin, member)
- created_at
- updated_at

**organizations**
- id (uuid, pk)
- name
- plan (free, pro, enterprise)
- created_at

**organization_members**
- id (uuid, pk)
- user_id (fk → users)
- organization_id (fk → organizations)
- role (owner, admin, member)

---

### 3.2 Audio & Transcription

**audio_files**
- id (uuid, pk)
- organization_id (fk)
- uploader_id (fk → users)
- storage_url
- duration_seconds
- language_detected
- status (uploaded, processing, completed, failed)
- created_at

**transcripts**
- id (uuid, pk)
- audio_file_id (fk)
- full_text
- confidence_score
- created_at

**transcript_segments**
- id (uuid, pk)
- transcript_id (fk)
- speaker_label
- text
- start_time
- end_time

---

### 3.3 Insights & NLP

**sentiments**
- id (uuid, pk)
- transcript_id (fk)
- score (-1 to 1)
- label (positive, neutral, negative)

**topics**
- id (uuid, pk)
- transcript_id (fk)
- topic
- relevance_score

**entities**
- id (uuid, pk)
- transcript_id (fk)
- entity_type (person, location, org, date)
- value

**summaries**
- id (uuid, pk)
- transcript_id (fk)
- summary_text

---

### 3.4 Search & Metadata

**tags**
- id (uuid, pk)
- name

**transcript_tags**
- transcript_id (fk)
- tag_id (fk)

---

### 3.5 Usage & Billing

**api_keys**
- id (uuid, pk)
- organization_id (fk)
- key_hash
- permissions

**usage_records**
- id (uuid, pk)
- organization_id (fk)
- minutes_processed
- request_count
- created_at

**invoices**
- id (uuid, pk)
- organization_id (fk)
- amount
- currency
- status
- period_start
- period_end

---

## 4. Event & Messaging Design

**Events**
- audio.uploaded
- transcription.completed
- insights.generated
- billing.usage_recorded

Used to decouple AI processing from API responsiveness.

---

## 5. Security & Privacy Architecture

- JWT + API key authentication
- RBAC per organization
- Encrypted audio storage
- Field-level encryption (PII)
- Data residency support (Enterprise)

---

## 6. Scalability Strategy

- Horizontal scaling of processing services
- Separate real-time vs batch workers
- Cache frequent transcript reads
- Partition transcripts by organization

---

## 7. MVP vs Scale

**MVP**
- Modular monolith (NestJS)
- PostgreSQL + Redis
- External speech APIs

**Scale**
- Split into microservices
- Kafka-based streaming
- In-house fine-tuned models

---

## 8. Optional Tech Stack
- Backend: NestJS + Prisma
- DB: PostgreSQL
- Cache: Redis
- Search: OpenSearch
- Storage: S3-compatible
- Infra: Docker + Kubernetes

---

If you want next:
- Prisma schema
- API specification
- ER diagram (visual)
- 90-day engineering roadmap
- Deployment architecture (AWS/GCP/Azure)


---

# 9. Prisma Schema (PostgreSQL)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  memberships OrganizationMember[]
  audioFiles  AudioFile[]
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  plan      String
  createdAt DateTime @default(now())

  members   OrganizationMember[]
  audio     AudioFile[]
  apiKeys   ApiKey[]
}

model OrganizationMember {
  id             String @id @default(uuid())
  role           String
  userId         String
  organizationId String

  user         User         @relation(fields: [userId], references: [id])
  organization Organization @relation(fields: [organizationId], references: [id])
}

model AudioFile {
  id              String   @id @default(uuid())
  organizationId  String
  uploaderId      String
  storageUrl      String
  durationSeconds Int
  language        String?
  status          String
  createdAt       DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id])
  uploader     User         @relation(fields: [uploaderId], references: [id])
  transcript   Transcript?
}

model Transcript {
  id           String   @id @default(uuid())
  audioFileId  String   @unique
  fullText     String
  confidence   Float?
  createdAt    DateTime @default(now())

  audioFile AudioFile @relation(fields: [audioFileId], references: [id])
  segments  TranscriptSegment[]
  sentiment Sentiment?
  topics    Topic[]
  entities  Entity[]
  summary   Summary?
}

model TranscriptSegment {
  id           String  @id @default(uuid())
  transcriptId String
  speaker      String
  text         String
  startTime    Float
  endTime      Float

  transcript Transcript @relation(fields: [transcriptId], references: [id])
}

model Sentiment {
  id           String @id @default(uuid())
  transcriptId String @unique
  score        Float
  label        String

  transcript Transcript @relation(fields: [transcriptId], references: [id])
}

model Topic {
  id           String @id @default(uuid())
  transcriptId String
  value        String
  relevance    Float

  transcript Transcript @relation(fields: [transcriptId], references: [id])
}

model Entity {
  id           String @id @default(uuid())
  transcriptId String
  type         String
  value        String

  transcript Transcript @relation(fields: [transcriptId], references: [id])
}

model Summary {
  id           String @id @default(uuid())
  transcriptId String @unique
  text         String

  transcript Transcript @relation(fields: [transcriptId], references: [id])
}

model ApiKey {
  id             String @id @default(uuid())
  organizationId String
  keyHash        String
  permissions    String

  organization Organization @relation(fields: [organizationId], references: [id])
}
```

---

# 10. API Specification (REST)

## Authentication
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

## Organizations
- `POST /organizations`
- `GET /organizations/:id`
- `POST /organizations/:id/invite`

## Audio & Transcription
- `POST /audio/upload`
- `POST /audio/stream/start`
- `GET /audio/:id/status`

## Transcripts
- `GET /transcripts/:id`
- `GET /transcripts/:id/segments`
- `GET /transcripts/search?q=`
- `POST /transcripts/:id/export`

## Insights
- `GET /transcripts/:id/sentiment`
- `GET /transcripts/:id/topics`
- `GET /transcripts/:id/entities`
- `GET /transcripts/:id/summary`

## API Keys & Usage
- `POST /api-keys`
- `GET /usage`

---

# 11. ER Diagram (Visual – Mermaid)

```mermaid
erDiagram
  USER ||--o{ ORGANIZATION_MEMBER : belongs_to
  ORGANIZATION ||--o{ ORGANIZATION_MEMBER : has

  ORGANIZATION ||--o{ AUDIO_FILE : owns
  USER ||--o{ AUDIO_FILE : uploads

  AUDIO_FILE ||--|| TRANSCRIPT : produces
  TRANSCRIPT ||--o{ TRANSCRIPT_SEGMENT : contains
  TRANSCRIPT ||--|| SENTIMENT : has
  TRANSCRIPT ||--o{ TOPIC : includes
  TRANSCRIPT ||--o{ ENTITY : extracts
  TRANSCRIPT ||--|| SUMMARY : summarized_by

  ORGANIZATION ||--o{ API_KEY : controls
```

---

This schema and API are **production-aligned**, NestJS-friendly, and scalable from MVP to enterprise.


---

# README – Speak AI

## Overview
**Speak AI** is a voice intelligence platform that converts speech into structured, searchable, and actionable insights. It provides real-time and batch speech-to-text, language analysis, and conversation intelligence for enterprises, developers, governments, and researchers.

Speak AI is built with a **NestJS + Prisma + PostgreSQL** backend, designed to scale from MVP to enterprise-grade deployments.

---

## Core Features
- 🎙️ Real-time & batch speech-to-text
- 🌍 Multilingual transcription & translation
- 🧠 NLP insights (sentiment, topics, entities, summaries)
- 🔍 Searchable transcripts
- 🔐 Enterprise-grade security & data privacy
- 🔌 Developer-first REST & streaming APIs

---

## Tech Stack

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Cache / Queue:** Redis
- **Search (optional):** OpenSearch / Meilisearch

### AI / ML
- Speech-to-Text (internal or external providers)
- NLP pipelines (sentiment, topic modeling, NER)
- Streaming audio processing

### Infrastructure
- Object Storage (S3-compatible)
- Docker
- Cloud-ready (AWS, GCP, Railway)

---

## System Architecture (High-Level)
1. Client uploads or streams audio
2. Audio stored in object storage
3. Metadata saved in PostgreSQL
4. Event emitted to queue
5. Speech service transcribes audio
6. NLP service generates insights
7. Results stored, indexed, and served via API

---

## Project Structure
```
speak-ai-backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── auth/
│   ├── users/
│   ├── organizations/
│   ├── audio/
│   ├── transcripts/
│   ├── insights/
│   ├── api-keys/
│   ├── common/
│   └── main.ts
├── .env.example
├── package.json
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- PostgreSQL
- Redis (optional for async jobs)

### Installation
```bash
pnpm install
```

### Environment Variables
Create a `.env` file:
```
DATABASE_URL=postgresql://user:password@localhost:5432/speak_ai
JWT_SECRET=your_secret
```

### Database Setup
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### Run the App
```bash
pnpm run start:dev
```

Server runs at:
```
http://localhost:3000
```

---

## API Overview

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Audio & Transcription
- `POST /audio/upload`
- `POST /audio/stream/start`
- `GET /audio/:id/status`

### Transcripts & Insights
- `GET /transcripts/:id`
- `GET /transcripts/:id/sentiment`
- `GET /transcripts/:id/summary`

---

## Security & Privacy
- JWT & API key authentication
- Role-based access control
- Encrypted audio storage
- GDPR-ready data lifecycle
- On-premise / private cloud support

---

## Roadmap
- WebSocket real-time transcription
- Emotion detection
- African language & accent optimization
- Custom model training
- Offline & edge speech processing

---

## Contributing
Contributions are welcome.
1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

---

## License
MIT License

---

## Contact
For partnerships or enterprise deployments, contact the Speak AI team.

