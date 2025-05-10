# 🐞 AI Code Debugger

**AI Code Debugger** is a full-stack web application that helps users debug and optimize code in real-time using an AI-powered backend. It supports Firebase Authentication, a modern React UI, and a FastAPI backend.

---

## 🔧 Features

- 💬 Chat interface to input and receive code feedback
- 🤖 AI-powered debugging using FastAPI + LLM
- 🔐 Firebase email verification
- ⚡ Real-time message display and formatting
- 🎨 Clean and modern UI built with React

---

## 🚀 Tech Stack

**Frontend**
- React (JavaScript)
- Styled Components
- Firebase Auth
- Lucide Icons

**Backend**
- FastAPI (Python)
- AI/LLM integration
- CORS, JSON APIs

---

## 🖼️ Screenshots




---

## 🔑 Authentication

- User signs in with email and 4-digit OTP (Firebase)
- Secure session handling

---

## 🧠 How It Works

1. User enters code via the chat input.
2. React frontend sends it to the FastAPI backend.
3. Backend processes the code and returns suggestions/fixes.
4. Response is formatted and shown in chat.

---

## 🛠️ Setup Instructions

### Frontend (React)
```bash
cd frontend
npm install
npm start
