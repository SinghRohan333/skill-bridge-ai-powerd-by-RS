<div align="center">

<img src="client/src/assets/github_rohan.png" alt="Skill Bridge AI" width="80" height="80" style="border-radius: 16px;" />

# Skill Bridge AI

### Smart Resume Analyzer · Skill Gap Finder · LaTeX Template Generator

**Powered by Groq LLaMA 3.3 70B AI**

[![MIT License](https://img.shields.io/badge/License-MIT-7c3aed?style=for-the-badge)](LICENSE)
[![Made by Rohan Singh](https://img.shields.io/badge/Made%20by-Rohan%20Singh-4f46e5?style=for-the-badge)](https://github.com/SinghRohan333)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com)

<br />

> **Skill Bridge AI** is a full-stack AI-powered web application that analyzes resumes, identifies skill gaps based on target job roles, and generates professional LaTeX resume templates — all in one seamless workflow.

<br />

[🚀 Live Demo](#) · [📖 Documentation](#getting-started) · [🐛 Report Bug](https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS/issues) · [💡 Request Feature](https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS/issues)

</div>

---

## 📸 Screenshots

> Landing Page · Analysis Result · LaTeX Template

_Screenshots coming soon — deploy in progress_

---

## ✨ Features

| Feature                      | Description                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------- |
| 📄 **Smart Resume Parsing**  | Extracts skills, education and experience from PDF and DOCX files automatically |
| 🤖 **AI Skill Gap Analysis** | Compares your skills against 15+ target job roles using LLaMA 3.3 70B           |
| 📊 **Match Score**           | Percentage score showing how well your resume matches the target role           |
| 💡 **Recommendations**       | Personalized learning resources and courses to fill your skill gaps             |
| 📝 **LaTeX Generator**       | Generates professional ATS-friendly LaTeX resume templates from your data       |
| 🔗 **Overleaf Integration**  | Download .tex file and compile directly on Overleaf for free                    |
| 🔐 **Secure Auth**           | JWT-based authentication with bcrypt password hashing                           |
| 📱 **Fully Responsive**      | Works seamlessly across all devices and screen sizes                            |

---

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=flat&logo=daisyui&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat&logo=react&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6600?style=flat)

### AI & Processing

![Groq](https://img.shields.io/badge/Groq-F55036?style=flat)
![LLaMA](https://img.shields.io/badge/LLaMA_3.3_70B-0467DF?style=flat)

---

## 🏗️ Architecture

```
skill-bridge-ai/
│
├── client/                          → React Frontend (Vite)
│   └── src/
│       ├── assets/                  → Images and static files
│       ├── components/              → Reusable UI components
│       │   ├── ProtectedRoute.jsx   → Auth route protection
│       │   └── Footer.jsx           → Global footer
│       ├── pages/                   → Application pages
│       │   ├── Landing.jsx          → Public landing page
│       │   ├── Login.jsx            → Authentication
│       │   ├── Register.jsx         → User registration
│       │   ├── Dashboard.jsx        → User dashboard
│       │   ├── Upload.jsx           → Resume upload
│       │   ├── Analysis.jsx         → AI analysis results
│       │   ├── Latex.jsx            → LaTeX template viewer
│       │   └── NotFound.jsx         → 404 page
│       ├── store/
│       │   └── authStore.js         → Zustand global state
│       └── utils/
│           └── axios.js             → Axios instance
│
└── server/                          → Express Backend
    ├── controllers/                 → Route logic handlers
    ├── middleware/                  → Auth & file middleware
    ├── models/                      → Mongoose schemas
    ├── routes/                      → API route definitions
    └── services/
        └── groqService.js           → AI integration layer
```

---

## 🔌 API Reference

| Method | Endpoint                     | Description             | Auth |
| ------ | ---------------------------- | ----------------------- | ---- |
| `POST` | `/api/auth/register`         | Register new user       | ❌   |
| `POST` | `/api/auth/login`            | Login user              | ❌   |
| `GET`  | `/api/auth/me`               | Get current user        | ✅   |
| `POST` | `/api/resume/upload`         | Upload resume file      | ✅   |
| `GET`  | `/api/resume/history`        | Get resume history      | ✅   |
| `POST` | `/api/analyze/resume`        | AI analyze resume       | ✅   |
| `GET`  | `/api/analyze/:id`           | Get analysis by ID      | ✅   |
| `POST` | `/api/resume/generate-latex` | Generate LaTeX template | ✅   |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) v18 or higher
- [Git](https://git-scm.com)
- A [MongoDB Atlas](https://mongodb.com/cloud/atlas) account (free)
- A [Groq API](https://console.groq.com) key (free)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS.git
cd skill-bridge-ai
```

**2. Install server dependencies**

```bash
cd server
npm install
```

**3. Install client dependencies**

```bash
cd ../client
npm install
```

**4. Configure environment variables**

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
GROQ_API_KEY=your_groq_api_key
NODE_ENV=development
```

> ⚠️ Never commit your `.env` file. It is already included in `.gitignore`.

**5. Run the application**

Open two terminals:

```bash
# Terminal 1 — Backend (from server/)
npm run dev

# Terminal 2 — Frontend (from client/)
npm run dev
```

**6. Open in browser**

```
http://localhost:5173
```

---

## 🎯 How It Works

```
User uploads Resume (PDF/DOCX)
           ↓
   Text extracted from file
           ↓
   Sent to Groq LLaMA AI
           ↓
   AI extracts: Skills · Education · Experience
           ↓
   User selects Target Job Role
           ↓
   AI compares skills → finds gaps → gives recommendations
           ↓
   Skill Gap Report generated and saved to MongoDB
           ↓
   AI generates professional LaTeX resume template
           ↓
   User downloads .tex file → compiles on Overleaf → gets PDF
```

---

## 🌍 Supported Target Job Roles

The AI analysis supports 15 common job roles including:

`Software Engineer` · `Frontend Developer` · `Backend Developer` · `Full Stack Developer` · `Data Scientist` · `Data Analyst` · `Machine Learning Engineer` · `DevOps Engineer` · `Cloud Engineer` · `Cybersecurity Analyst` · `UI/UX Designer` · `Product Manager` · `Business Analyst` · `Mobile App Developer` · `Database Administrator`

---

## 👤 About The Author

<div align="center">

<img src="client/src/assets/github_rohan.png" width="100" height="100" style="border-radius: 50%;" />

### Rohan Singh

_Full Stack Developer · Competitive Programmer · AI/ML Enthusiast_

[![GitHub](https://img.shields.io/badge/GitHub-SinghRohan333-181717?style=for-the-badge&logo=github)](https://github.com/SinghRohan333)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rohan%20Singh-0A66C2?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/singhrohan333/)
[![CodeChef](https://img.shields.io/badge/CodeChef-2★-brown?style=for-the-badge&logo=codechef)](https://www.codechef.com/users/roguesyntax)

| Skill                      | Details                                             |
| -------------------------- | --------------------------------------------------- |
| 💻 Web Development         | Full Stack — React, Node.js, MongoDB                |
| 🏆 Competitive Programming | 2★ on CodeChef                                      |
| 🤖 AI/ML                   | Enthusiast — exploring LLMs and intelligent systems |
| 🔐 Cybersecurity           | Actively exploring security concepts                |
| ⛓️ Blockchain              | Learning decentralized technologies                 |

> _"This project was independently designed, architected, developed and deployed by me from scratch — covering the complete stack from database design and backend APIs to AI integration and frontend UI."_
>
> — **Rohan Singh**

</div>

---

## 📄 License

```
MIT License — Copyright (c) 2025 Rohan Singh
```

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for full details.

**What this means:**

- ✅ You can use, copy and modify this code
- ✅ You can distribute it
- ❌ You cannot remove the copyright notice
- ❌ You cannot claim it as your own without attribution

> ⚠️ **Attribution Required:** Any use or reference of this project must credit **Rohan Singh** as the original author as required by the MIT License.

---

## 🙏 Acknowledgements

- [Groq](https://groq.com) — For providing free and blazing fast LLaMA inference
- [MongoDB Atlas](https://mongodb.com/cloud/atlas) — Free cloud database
- [Overleaf](https://overleaf.com) — Free LaTeX compilation platform
- [DaisyUI](https://daisyui.com) — Beautiful UI components
- [Lucide Icons](https://lucide.dev) — Clean and consistent icons

---

<div align="center">

**⭐ If you found this project useful, please consider giving it a star on GitHub!**

<br />

_Built with ❤️ by [Rohan Singh](https://github.com/SinghRohan333)_

_© 2025 Rohan Singh · All Rights Reserved_

</div>
