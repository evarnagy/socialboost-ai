## LATEST RELEASE
https://socialboost-ai-d44bc.web.app/

# Thesis Application – Source Code

This repository contains the source code of Erik Varnagy’s thesis application.

## 📌 Project Overview
The application was developed as part of a university thesis project.  
Its purpose is to demonstrate the design and implementation of a modern web application, including backend services, database integration, and optional AI-based functionality.

## 🛠️ Technologies Used
- Backend: Node.js / Express 
- Database & Authentication: Firebase
- AI integration: OpenAI API
- Other tools: Git, GitHub

## ⚙️ Configuration
This project uses environment variables for configuration.  
Sensitive information such as API keys is **not included** in the repository for security reasons.

Create a `.env` file based on the provided `.env.example` file and set the required values.

## Performance note
Because the backend is hosted on a free-tier platform, the first API request after a longer idle period may be slower (cold start). After the service wakes up, subsequent requests are typically much faster.


