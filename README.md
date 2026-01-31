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

