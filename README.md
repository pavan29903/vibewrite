# vibewrite

PromptGen is a MERN-stack based application that helps users generate **efficient prompts** for AI app builder platforms like **Bolt**, **Lovable**, **cursor** or **ChatGPT** based on their app idea, UI preferences, and structure.

## Features

- User enters an app idea (e.g., portfolio website, event planner).
- Select UI preferences like:
  - UI Type (minimal, modern, playful, etc.)
  - Theme (dark, light, both)
  - Prompt Length
- Add dynamic **pages** (e.g., About, Projects) with custom subheadings.
- Submits input to a backend powered by **Google Gemini API**.
- Returns multiple optimized prompts the user can plug into AI builders.

## Tech Stack

### Frontend
- **React + TypeScript**
- **Tailwind CSS + shadcn/ui**
- Axios for API calls

### Backend
- **Node.js + Express + TypeScript**
- **Google Gemini API (@google/generative-ai)**
- CORS, dotenv, body-parser

---

## Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/pavan29903/vibewrite.git
cd vibewrite
```

### 2. Install Dependencies

#### backend

```bash
cd backend
npm install
```
#### frontend

```bash
cd backend
npm install
```

### 3. Environment Setup
Create a .env file inside backend/ with your Gemini API Key:

```bash
GEMINI_API_KEY=your_google_generative_ai_key
```

### Running the app

Start backend

```bash 
cd backend
npm run dev
```

Start frontend

```bash 
cd frontend
npm run dev
```