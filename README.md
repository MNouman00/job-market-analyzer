# 🧠 AI-Powered Job Market Analyzer

A production-ready, full-stack AI application that predicts job categories from raw text using Machine Learning, and generates skill summaries using LLMs. 

## 🚀 Features
* **Machine Learning:** Predicts the job category (e.g., IT Jobs, Healthcare, Sales) with **84.46% accuracy** using a TF-IDF Vectorizer and Logistic Regression.
* **LLM Integration:** Uses LangChain and Groq (Llama-3) to generate clean, 3-bullet-point skill summaries from the job description.
* **Data Visualization:** Interactive dashboard built with Recharts showing market trends, salary distributions, and top hiring categories.
* **Modern UI:** Clean, responsive dark-mode UI built with React and Tailwind CSS.
* **Production Ready:** Includes Redis caching (optional) and is structured for Docker deployment.

## 🛠️ Tech Stack
* **Frontend:** React, Tailwind CSS, Vite, Recharts
* **Backend:** Python, FastAPI, Uvicorn, Pydantic
* **Machine Learning:** Scikit-Learn, Pandas, NumPy, Joblib
* **AI / LLM:** LangChain, Groq API
* **DevOps/DB:** Redis, Docker (upcoming)

## 📸 Screenshot
*(Upload the screenshot of your dashboard to GitHub, replace the link below with your image path)*
![Dashboard Preview](./screenshot.png)

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/MNouman00/job-market-analyzer.git
cd job-market-analyzer
