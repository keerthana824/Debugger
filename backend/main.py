from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from google.generativeai import configure, GenerativeModel
import os
from dotenv import load_dotenv

# Load .env
load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")
if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY is missing.")
configure(api_key=API_KEY)

# ✅ Correct model name here
model = GenerativeModel("models/gemini-1.5-pro-latest")


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DebugRequest(BaseModel):
    code: str

@app.get("/")
def home():
    return {"status": "API is working!"}

@app.post("/debug")
async def debug_code(request: DebugRequest):
    try:
        response = model.generate_content(f"Debug this Python code:\n{request.code}")
        return {"reply": response.text}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
