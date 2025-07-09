![Architecture Diagram](https://github.com/user-attachments/assets/72c48265-bac6-4f4d-95c8-c9a75788dfbe)# CRM Campaign Management System

## 📋 Project Summary

A CRM web application designed to manage marketing campaigns by segmenting users, suggesting AI-powered messages, and simulating campaign delivery. Built with a modern stack including Google OAuth, OpenAI API, Redis, and a custom backend.

---

## 🛠️ Local Setup Instructions

### 🔧 Prerequisites

- Node.js >= 18.x
- Java 17+ (Spring Boot backend)
- Maven
- MySQL or MongoDB
- Redis (optional, for message queuing)
- OpenAI API Key
- Google OAuth credentials

### 📦 Backend Setup (`crm-backend/`)

1. Navigate to the backend directory:
   ```bash
   cd crm-backend
   spring.datasource.url=jdbc:mysql://localhost:3306/crm
   spring.datasource.username=root
   spring.datasource.password=your_password
   openai.api.key=YOUR_OPENAI_KEY
   mvn clean install
   mvn spring-boot:run
   cd crm-frontend
   npm install
   NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
   NEXT_PUBLIC_API_URL=http://localhost:8080
   npm run dev
2. AI Tools Used
   Feature	Tool/Service	Description
Message Suggestions	OpenAI GPT	Suggests personalized campaign messages
Campaign Summaries	OpenAI GPT	Summarizes campaign performance
Rule Parsing	OpenAI GPT (Bonus)	Converts UI-built rules into filter queries
3. Architecture Diagram
   ![Architecture Diagram](https://github.com/user-attachments/assets/0fec9d98-fcdd-4152-a2e2-877cea660564)
   4. Tech Stack
      -Frontend	React, Next.js, react-querybuilder
      -Authentication	Google OAuth 2.0
      -Backend	Java Spring Boot, REST APIs
      -DB Layer	JPA + MySQL or MongoDB
      -Messaging	Redis, RabbitMQ (planned)
      -AI Services	OpenAI Chat Completion API
  5. Frontend
     pages/
  ├─ LoginPage.jsx
  ├─ HomePage.jsx
  ├─ CreateSegment.jsx
  |- EditProfle.jsx
  ├─ SegmentPreview.jsx
  ├─ CampaignForm.jsx
  ├─ CampaignHistory.jsx
  └─ CampaignDetails.jsx
services/
utils/
  7. Backend
     src/main/java/com/xeno/crm/
  ├─ controller/
  ├─ service/
  |- app.js/
  |- Server.js
  ├─ model/
  ├─ repository/
  └─ CrmApplication.java
resources/
  ├─ application.properties
  └─ data.sql

