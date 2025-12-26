# FILE: ai_service/ats_engine.py

import json
import spacy
from sentence_transformers import SentenceTransformer, util

# -------------------------------
# Load NLP + AI models (ONCE)
# -------------------------------
nlp = spacy.load("en_core_web_lg")
model = SentenceTransformer("all-MiniLM-L6-v2")

# -------------------------------
# Load job-role skill models
# -------------------------------
with open("role_models.json", "r", encoding="utf-8") as f:
    ROLE_MODELS = json.load(f)

# -------------------------------
# GLOBAL SKILL NORMALIZATION SET
# -------------------------------
KNOWN_SKILLS = {
    "java", "spring", "spring boot", "spring security",
    "hibernate", "jpa", "rest api", "microservices",
    "mysql", "postgresql", "mongodb",
    "docker", "kubernetes", "aws", "azure",
    "git", "github", "ci/cd",
    "react", "angular", "javascript", "html", "css",
    "python", "flask", "django",
    "linux", "redis", "kafka"
}


def extract_skills(resume_text: str) -> list:
    text = resume_text.lower()
    skills = set()

    for skill in KNOWN_SKILLS:
        if skill in text:
            skills.add(skill)

    doc = nlp(text)
    for ent in doc.ents:
        value = ent.text.strip().lower()
        if 2 <= len(value) <= 40:
            skills.add(value)

    return sorted(skills)


def detect_sections(resume_text: str) -> dict:
    text = resume_text.lower()
    return {
        "experience": text.count("experience"),
        "projects": text.count("project"),
        "skills": text.count("skill"),
        "education": text.count("education"),
        "certification": text.count("certification")
    }


def generate_improvements(role: str, missing_skills: list, resume_text: str) -> list:
    suggestions = []
    text = resume_text.lower()

    if missing_skills:
        suggestions.append(
            f"Add hands-on experience with {', '.join(missing_skills[:3])} "
            f"to better align with {role} roles."
        )

    if "deploy" not in text:
        suggestions.append(
            "Mention deployment experience using Docker, cloud platforms, or CI/CD pipelines."
        )

    if "security" not in text:
        suggestions.append(
            "Include security concepts such as JWT, authentication, and authorization."
        )

    if "performance" not in text and "optimi" not in text:
        suggestions.append(
            "Add performance optimization or scalability improvements."
        )

    if "%" not in text:
        suggestions.append(
            "Quantify achievements using metrics (e.g., improved response time by 30%)."
        )

    return suggestions


def analyze_resume(resume_text: str) -> dict:
    extracted_skills = extract_skills(resume_text)
    sections = detect_sections(resume_text)

    resume_embedding = model.encode(resume_text, normalize_embeddings=True)

    best_role = None
    best_similarity = 0.0
    missing_skills = []

    for role, data in ROLE_MODELS.items():
        role_embedding = model.encode(
            " ".join(data["skills"]),
            normalize_embeddings=True
        )

        similarity = util.cos_sim(resume_embedding, role_embedding).item()

        if similarity > best_similarity:
            best_similarity = similarity
            best_role = role
            missing_skills = list(set(data["skills"]) - set(extracted_skills))

    ats_score = (
        best_similarity * 45 +
        min(len(extracted_skills) * 2.5, 30) +
        min(sections["experience"] * 6, 15) +
        min(sections["projects"] * 4, 10)
    )

    ats_score = min(int(ats_score), 100)

    return {
        "atsScore": ats_score,
        "aiScore": int(best_similarity * 100),
        "primaryRole": best_role,
        "matchedSkills": extracted_skills[:12],
        "missingSkills": missing_skills[:12],
        "jobRoleMatches": list(ROLE_MODELS.keys())[:5],
        "improvementSuggestions": generate_improvements(
            best_role,
            missing_skills,
            resume_text
        )
    }
