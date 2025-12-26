# FILE: ai_service/app.py

from flask import Flask, request, jsonify
from ats_engine import analyze_resume
from resume_generator import generate_resume_ai

app = Flask(__name__)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "AI service running"})


@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json(silent=True)

    if not data or not data.get("resumeText"):
        return jsonify({"error": "resumeText is required"}), 400

    return jsonify({
        "success": True,
        "data": analyze_resume(data["resumeText"])
    })


@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json(silent=True)
    required = ["name", "targetRole", "experience", "skills"]

    for field in required:
        if field not in data:
            return jsonify({"error": f"{field} is required"}), 400

    return jsonify({
        "success": True,
        "data": generate_resume_ai(
            name=data["name"],
            role=data["targetRole"],
            experience=data["experience"],
            skills=data["skills"],
            projects=data.get("projects", [])
        )
    })


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
