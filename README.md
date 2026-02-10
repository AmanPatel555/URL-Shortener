# FastAPI URL Shortener 🔗

A simple and clean **URL Shortener** built using **FastAPI** with a minimal frontend using **HTML, CSS, and JavaScript**.  
The project demonstrates full-stack integration, error handling, and frontend–backend communication.

---

## 🚀 Features

- 🔗 Shorten long URLs
- 🔁 Redirect short URL to original URL
- 📋 Copy short URL to clipboard
- ⏳ Loading spinner during API calls
- ❌ Proper backend error handling
- 📜 URL history
- 💾 Persistent history using `localStorage`
- 🎨 Clean and responsive UI
- 📦 Frontend served via FastAPI static files

---

## 🛠️ Tech Stack

**Backend**
- FastAPI
- Python
- Uvicorn

**Frontend**
- HTML
- CSS
- JavaScript

📂 Project Structure
url-shortener/
│
├── main.py            # FastAPI backend
├── index.html         # Frontend UI
├── static/            # CSS or JS files (if any)
├── requirements.txt   # Project dependencies
└── README.md          # Documentation

## Steps to run the URL Shortener
pip install -r requirements.txt
uvicorn main:app --reload
http://127.0.0.1:8000/





