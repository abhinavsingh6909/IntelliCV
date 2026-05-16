# IntelliCV — AI Resume Analyzer 🚀

IntelliCV is a full-stack, AI-powered platform designed to analyze resumes against specific Job Descriptions (JDs), providing realistic ATS matching scores, extracting missing keywords, and generating actionable improvement suggestions to help candidates land their dream jobs.

## ✨ Features

- **User Authentication:** Secure JWT-based registration and login system with bcrypt password hashing.
- **Dynamic AI Analysis:** Powered by Gemini AI. Upload your resume (PDF) to get general feedback, or provide a Job Description to get strict, highly accurate ATS parsing and matching.
- **Smart PDF Extraction:** Automatically parses text from PDF resumes using `pdf-parse`.
- **Advanced Security:** Implemented global rate limiting, AI-specific rate limiting, `helmet` security headers, and strict `express-validator` input validation.
- **Stunning UI:** Built with React, Vite, Tailwind CSS, and Framer Motion for a modern, animated, and responsive user experience.

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM
- Lucide Icons

**Backend:**
- Node.js & Express.js
- MongoDB (Mongoose)
- Google Generative AI (Gemini 2.5 Flash)
- JSON Web Tokens (JWT)
- Multer (Memory Storage)
- Security: Helmet, Express Rate Limit, Express Validator

## 🚀 Getting Started Locally

### Prerequisites
- Node.js installed on your machine
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API Key

### 1. Clone the repository
```bash
git clone https://github.com/your-username/intellicv.git
cd intellicv
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder and add:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
Visit `http://localhost:5173` in your browser!

## 🌍 Deployment
This application is fully configured for production deployment.
- **Frontend** can be deployed on [Vercel](https://vercel.com/) (Ensure you set the `VITE_API_URL` environment variable).
- **Backend** is optimized for [Render](https://render.com/) or Railway to bypass Serverless function timeouts during heavy AI processing.

## 📝 License
This project is open-source and available under the MIT License.
