# FILE: ai_service/skill_matcher.py

from sentence_transformers import SentenceTransformer, util

# -------------------------------
# Load semantic model (shared)
# -------------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")


def match_job_roles(resume_text: str, role_models: dict, top_k: int = 5) -> list:
    """
    Semantic job-role matching using embeddings.

    Args:
        resume_text (str): Full resume text
        role_models (dict): Loaded role_models.json
        top_k (int): Number of top roles to return

    Returns:
        list: Ranked job roles with similarity score
    """

    resume_embedding = model.encode(
        resume_text,
        normalize_embeddings=True
    )

    results = []

    for role, data in role_models.items():
        role_text = " ".join(data.get("skills", []))
        role_embedding = model.encode(
            role_text,
            normalize_embeddings=True
        )

        similarity = util.cos_sim(
            resume_embedding,
            role_embedding
        ).item()

        results.append({
            "role": role,
            "similarity": round(similarity * 100, 2)
        })

    results.sort(
        key=lambda x: x["similarity"],
        reverse=True
    )

    return results[:top_k]
