# FILE: ai_service/resume_generator.py

from ats_engine import analyze_resume


def generate_resume_ai(name, role, experience, skills, projects):
    summary = (
        f"{role} with {experience} years of experience specializing in "
        f"{', '.join(skills[:5])}. Proven ability to build scalable, "
        "high-performance applications."
    )

    skill_section = "\n".join(f"- {s}" for s in skills)

    project_section = "\n".join(
        f"- {p}" for p in projects
    ) if projects else "- No projects provided"

    resume_text = f"""
{name}

PROFESSIONAL SUMMARY
{summary}

SKILLS
{skill_section}

PROJECTS
{project_section}
""".strip()

    analysis = analyze_resume(resume_text)

    return {
        "resumeText": resume_text,
        "atsScore": analysis["atsScore"],
        "aiScore": analysis["aiScore"],
        "suggestions": analysis["improvementSuggestions"]
    }
