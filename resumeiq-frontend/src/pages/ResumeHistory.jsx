import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getResumeHistoryApi, improveResumeApi } from "../api/resume.api";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function ResumeHistory() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [improvingId, setImprovingId] = useState(null);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await getResumeHistoryApi();
      setResumes(res.data);
    } catch {
      alert("Failed to load resume history");
    } finally {
      setLoading(false);
    }
  };

  const improveResume = async (id) => {
    try {
      setImprovingId(id);
      await improveResumeApi(id);
      await loadHistory(); // refresh
    } catch {
      alert("Failed to improve resume");
    } finally {
      setImprovingId(null);
    }
  };

  return (
    <>
      <Seo title="Resume History | ResumeIQ" />

      <Box sx={{ maxWidth: 1200, mx: "auto", mt: 6 }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color={BRAND_TEXT}
          mb={4}
        >
          Resume History
        </Typography>

        {loading ? (
          <Box textAlign="center" mt={6}>
            <CircularProgress />
          </Box>
        ) : resumes.length === 0 ? (
          <Typography color="text.secondary">
            No resumes found. Upload or create one to get started.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {resumes.map((resume) => (
              <Grid item xs={12} md={6} key={resume.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    border: "1px solid #eee",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  <Typography fontWeight={700} mb={1}>
                    {resume.fileName}
                  </Typography>

                  <Typography color="text.secondary" mb={2}>
                    Best Role: {resume.primaryRole}
                  </Typography>

                  <Box mb={2}>
                    <Chip
                      label={`ATS: ${resume.atsScore}`}
                      sx={{
                        mr: 1,
                        bgcolor: BRAND_PRIMARY,
                        color: "#fff",
                        fontWeight: 600,
                      }}
                    />

                    <Chip
                      label={`AI: ${resume.aiScore}`}
                      variant="outlined"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    onClick={() => improveResume(resume.id)}
                    disabled={improvingId === resume.id}
                    sx={{
                      fontWeight: 700,
                      bgcolor: BRAND_PRIMARY,
                      "&:hover": { bgcolor: "#E55A47" },
                    }}
                  >
                    {improvingId === resume.id
                      ? "Improving..."
                      : "Improve with AI"}
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}
