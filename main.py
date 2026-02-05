from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import string
import random

app = FastAPI()

# CORS (optional now, but okay to keep)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

url_db = {}

class URLRequest(BaseModel):
    long_url: str


def generate_short_url():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=6))


# 🔹 FRONTEND ROUTE
@app.get("/")
def home():
    return FileResponse("static/index.html")


# 🔹 API: Shorten URL
@app.post("/shorten")
def shorten_url(request: URLRequest):

    if not request.long_url.strip():
        raise HTTPException(status_code=400, detail="URL cannot be empty")

    if not request.long_url.startswith(("http://", "https://")):
        raise HTTPException(
            status_code=400,
            detail="URL must start with http:// or https://"
        )

    short_code = generate_short_url()
    url_db[short_code] = request.long_url

    return {
        "short_url": f"http://127.0.0.1:8000/{short_code}"
    }


# 🔹 REDIRECT
@app.get("/{short_code}")
def redirect_url(short_code: str):
    if short_code not in url_db:
        raise HTTPException(status_code=404, detail="Short URL not found")

    return RedirectResponse(url_db[short_code])
