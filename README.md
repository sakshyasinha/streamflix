🎬 Streamflix
Streamflix is a full-stack movie recommendation web application combining a modern React frontend with a Python-based backend powered by a machine learning recommendation system.

🚀 Features
🔧 Frontend (React)
React 18 – Fast, modern UI

Vite – Blazing-fast dev server and builds

Redux Toolkit – Simplified state management

React Router v6 – Declarative routing

Tailwind CSS – Utility-first styling

Framer Motion – Smooth UI animations

Recharts / D3.js – Visual analytics & charts

React Hook Form – Form validation and handling

Jest + RTL – Testing support out of the box

🧠 Backend (Python + ML)
Flask – Lightweight backend API

Pandas & Scikit-learn – Data handling and ML

Content-based Filtering – Recommends similar movies

REST API – Returns recommendations in JSON format

📋 Prerequisites
Node.js (v14+)

Python 3.8+

pip (Python package manager)

npm or yarn

🛠️ Installation
1. Clone the Repository
git clone https://github.com/your-username/streamflix.git
cd streamflix
2. Setup Frontend
cd frontend
npm install
npm run dev
3. Setup Backend (Python Environment)
cd backend
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py

📁 Project Structure

streamflix/
├── frontend/              # React frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── backend/               # Python Flask backend
│   ├── app.py             # Flask app
│   ├── recommender.py     # ML-based recommender logic
│   ├── fake_ratings.csv   # Dummy dataset
│   └── requirements.txt
🔗 API Example
POST /recommend

Request Body:

{
  "movie_id": 101
}
Response:

{
  "recommended_movie_ids": [104, 102, 103]
}
🎨 Styling & UI
Fully responsive UI

Tailwind CSS with:

Aspect ratio

Forms & typography plugins

Container queries

Animation utilities

📦 Deployment
Frontend

npm run build
Backend
Consider using services like Render, Railway, or Heroku for deploying the Flask API.

🧠 Future Improvements
Switch to collaborative filtering

Use a real dataset (e.g., MovieLens)

Add user login and preferences

Dockerize the full stack

Add watchlist / favorite features

👨‍💻 Author
Sakshya Sinha – GitHub

