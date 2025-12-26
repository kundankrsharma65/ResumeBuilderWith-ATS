import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { createResumeApi } from "../api/resume.api";
import ResumePreview from "../components/ResumePreview";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function CreateResume() {
  const [form, setForm] = useState({
    name: "",
    targetRole: "",
    experience: "",
    skills: "",
    projects: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateResume = async () => {
    try {
      setLoading(true);

      const payload = {
        name: form.name,
        targetRole: form.targetRole,
        experience: form.experience,
        skills: form.skills.split(",").map((s) => s.trim()),
        projects: form.projects
          ? form.projects.split("\n").map((p) => p.trim())
          : [],
      };

      const res = await createResumeApi(payload);
      setResult(res.data);
    } catch (err) {
      alert("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Create Resume | ResumeIQ" />

      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color={BRAND_TEXT}
          mb={4}
        >
          Create Resume with AI
        </Typography>

        <Grid container spacing={4}>
          {/* FORM */}
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 4, borderRadius: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Target Job Role"
                name="targetRole"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Years of Experience"
                name="experience"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Skills (comma separated)"
                name="skills"
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                label="Projects (one per line)"
                name="projects"
                margin="normal"
                multiline
                rows={4}
                onChange={handleChange}
              />

              <Button
                fullWidth
                variant="contained"
                onClick={generateResume}
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  fontWeight: 700,
                  bgcolor: BRAND_PRIMARY,
                  "&:hover": { bgcolor: "#E55A47" },
                }}
              >
                {loading ? "Generating..." : "Generate Resume"}
              </Button>
            </Paper>
          </Grid>

          {/* RESULT */}
          <Grid item xs={12} md={7}>
            {result && (
              <>
                <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
                  <Typography fontWeight={700}>
                    ATS Score:{" "}
                    <span style={{ color: BRAND_PRIMARY }}>
                      {result.atsScore}/100
                    </span>
                  </Typography>

                  <Typography>
                    AI Score:{" "}
                    <strong>{result.aiScore}/100</strong>
                  </Typography>

                  <Box mt={2}>
                    {result.suggestions.map((s, i) => (
                      <Chip
                        key={i}
                        label={s}
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                </Paper>

                <ResumePreview text={result.resumeText} />
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
