# Resume Builder with ATS & AI Scoring

A full-stack **Resume Builder platform** that allows users to upload, create, improve, and analyze resumes using **ATS (Applicant Tracking System) scoring** and **AI-based suggestions**.

This project demonstrates real-world implementation of:
- JWT authentication
- Spring Boot backend
- React frontend
- AI/ML service integration
- Secure file upload
- Full-stack API communication

---

## 🚀 Features

### 🔐 Authentication & Security
- JWT-based authentication
- Protected routes (frontend & backend)
- Stateless session handling
- Secure API access

### 📄 Resume Management
- Upload resume (PDF/DOC)
- ATS score calculation
- Resume history per user
- Improve resume using AI
- Generate new resume using AI

### 🤖 AI Capabilities
- Resume analysis
- ATS score generation
- Improvement suggestions
- AI-generated resume content

---

## 🏗️ Project Architecture

```text
ResumeBuilderWith-ATS
│
├── resumeiq/                # Spring Boot Backend
│   ├── controller/
│   ├── service/
│   ├── security/
│   ├── repository/
│   ├── entity/
│   └── config/
│
├── resumeiq-frontend/       # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── auth/
│   │   └── utils/
│
├── ai-service/              # AI / ML Service
│   ├── models/
│   ├── services/
│   └── utils/
│
└── README.md




🧑‍💻 Tech Stack
Backend

Java 17

Spring Boot

Spring Security

JWT (JSON Web Token)

Hibernate / JPA

MySQL

Maven

Frontend

React.js

React Router

Axios

Context API

Material UI / CSS

AI / ML

Python

AI/ML models for resume analysis

ATS score calculation logic

Tools & Others

Git & GitHub

REST APIs

Postman

Maven

npm

🔐 Authentication Flow

User registers / logs in

Backend generates JWT token

Token stored in browser (localStorage)

Axios interceptor attaches token to every request

Backend validates token for protected APIs

Client → Login → JWT → Protected API → Response


🔁 API Flow Example
POST /api/auth/login
Authorization: none

GET /api/resume/history
Authorization: Bearer <JWT_TOKEN>

📦 Key API Endpoints
Authentication

POST /api/auth/register

POST /api/auth/login

Resume

POST /api/resume/upload

POST /api/resume/create

POST /api/resume/{id}/improve

GET /api/resume/history

🗄️ Database Design (High Level)

User

Resume

ResumeScore

ResumeHistory

Each resume is linked to a specific authenticated user.

⚙️ How to Run the Project
Backend (Spring Boot)
cd resumeiq
mvn clean install
mvn spring-boot:run


Runs on:

http://localhost:8080

Frontend (React)
cd resumeiq-frontend
npm install
npm run dev


Runs on:

http://localhost:5173

AI Service
cd ai-service
python -m venv venv
pip install -r requirements.txt
python main.py

🔒 Environment Variables

Create .env files where required.

Example:

JWT_SECRET=your_secret_key
JWT_EXPIRATION=86400000
DB_USERNAME=root
DB_PASSWORD=yourpassword

🧪 Testing

API testing via Postman

Manual frontend testing

JWT validation testing

File upload testing

🧠 Challenges Faced

JWT authentication & authorization

Handling 401 / 403 errors

CORS & preflight requests

Multipart file upload with security

Full-stack token synchronization

📌 Project Status

Work In Progress (WIP)
Core functionality implemented.
Further improvements planned.

🔮 Future Enhancements

Refresh token support

Resume templates

PDF export

Better AI accuracy

Role-based access

Cloud deployment (AWS)

👤 Author

Kundan Kumar Sharma
B.Tech – Computer Science & Engineering

GitHub:
👉 https://github.com/kundankrsharma65

📜 License

This project is for learning and portfolio purposes.
