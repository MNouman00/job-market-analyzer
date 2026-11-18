from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import redis
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Job Market Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD ML MODEL ---
model = joblib.load(os.path.join("models", "job_classifier_model.pkl"))
vectorizer = joblib.load(os.path.join("models", "tfidf_vectorizer.pkl"))

# --- LOAD LLM ---
# Replace the OpenAI setup with this:
llm = ChatGroq(
    model="openai/gpt-oss-120b",  # <-- NEW, SUPPORTED
    temperature=0.7,
    api_key=os.getenv("GROQ_API_KEY")
)

# --- CONNECT REDIS (Optional, but highly recommended) ---
# If you don't have Redis installed locally, this will just fail gracefully and continue.
try:
    cache = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
    cache.ping()
    print("Redis connected!")
except:
    cache = None
    print("Redis not found. Proceeding without caching.")

class JobPosting(BaseModel):
    title: str
    description: str

@app.post("/predict")
def predict_job_category(job: JobPosting):
    # Check Cache
    cache_key = f"predict:{job.title}:{job.description[:50]}"
    if cache:
        cached_result = cache.get(cache_key)
        if cached_result:
            return {"predicted_category": cached_result, "cached": True}

    # If not in cache, run ML
    text_data = job.title + " " + job.description
    vectorized_text = vectorizer.transform([text_data])
    prediction = model.predict(vectorized_text)[0]
    
    # Save to Cache (expires in 1 hour)
    if cache:
        cache.setex(cache_key, 3600, prediction)
        
    return {"predicted_category": prediction, "cached": False}

@app.post("/analyze")
def analyze_job_with_llm(job: JobPosting):
    prompt = PromptTemplate.from_template(
        "You are a professional tech recruiter writing for a client.\n"
        "Read this job posting:\n"
        "Title: {title}\n"
        "Description: {description}\n\n"
        "Write a short, clear summary of the top 3 skills required for this job.\n"
        "Rules:\n"
        "- Use simple, direct sentences (no corporate jargon).\n"
        "- Start each skill with a dash (-).\n"
        "- Do NOT use markdown bold (**) or any asterisks.\n"
        "- Keep each bullet point under 20 words."
    )
    formatted_prompt = prompt.format(title=job.title, description=job.description)
    response = llm.invoke(formatted_prompt)
    return {"summary": response.content}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Job Market Analyzer API"}