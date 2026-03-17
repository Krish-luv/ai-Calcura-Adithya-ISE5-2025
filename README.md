## Problem Statement
Students and teachers struggle to understand *how* a math problem is solved, 
not just the answer. CalcuraAI solves handwritten or typed math problems 
step by step, like a personal tutor.

## Architecture
```
React Frontend → FastAPI Backend → Groq API → Llama Models → Step-by-step solution
```

## Tech Stack
Frontend: React, Vite, TypeScript, Fabric.js, Framer Motion, Tailwind CSS
Backend: Python, FastAPI
AI: Groq API — Llama 3.3 70B (text) + Llama 4 Scout 17B (vision/image)

## Users
School and college students, teachers, and anyone who wants 
to understand math solutions step by step.

## Challenges
- Gemini API quota exhausted too quickly for student use
- OpenAI GPT-4o required minimum $5 billing — not feasible
- Settled on Groq (free tier, no credit card, faster than OpenAI 
  due to custom LPU chip hardware)
- Converting canvas drawing to base64 image accurately for vision model
- Parsing AI response into clean structured steps and final answer
