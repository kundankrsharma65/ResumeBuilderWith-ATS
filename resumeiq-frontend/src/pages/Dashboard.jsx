import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Fade,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const go = (path) => {
    isAuth ? navigate(path) : navigate("/login");
  };

  return (
    <>
      {/* ================= HERO ================= */}
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `
            linear-gradient(rgba(55,71,79,0.65), rgba(55,71,79,0.65)),
            url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Fade in timeout={900}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.15,
                }}
              >
                ATS-Optimized Resumes  
                <br />
                Built to Get Shortlisted
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#f1f1f1",
                  maxWidth: 680,
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                ResumeIQ simulates real Applicant Tracking Systems used by
                recruiters to filter, score, and shortlist resumes —
                before a human ever reviews them.
              </Typography>

              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => go("/create")}
                  sx={{
                    bgcolor: BRAND_PRIMARY,
                    px: 4,
                    py: 1.6,
                    fontWeight: 700,
                    "&:hover": {
                      bgcolor: "#E55A47",
                    },
                  }}
                >
                  Create Resume with AI
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  onClick={() => go("/upload")}
                  sx={{
                    px: 4,
                    py: 1.6,
                    color: "#fff",
                    borderColor: "#fff",
                    "&:hover": {
                      bgcolor: "#fff",
                      color: BRAND_TEXT,
                    },
                  }}
                >
                  Check ATS Score
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* ================= ABOUT ================= */}
      <Section title="What is ResumeIQ?">
        <Typography color="text.secondary" maxWidth={900} mx="auto">
          ResumeIQ is an AI-powered resume intelligence platform built to help
          job seekers pass automated resume screening systems (ATS) and reach
          recruiters.
          <br /><br />
          Unlike traditional resume builders, ResumeIQ evaluates resumes the
          same way real recruitment systems do — using keyword matching,
          semantic relevance, role alignment, and experience depth.
        </Typography>
      </Section>

      {/* ================= SYSTEM DESIGN ================= */}
      <Section title="How ResumeIQ Works">
        <Grid container spacing={4}>
          {[
            ["Resume Input", "Upload an existing resume or create one using AI."],
            ["ATS Parsing", "Resume is parsed into skills, experience & sections."],
            ["AI Role Matching", "Matched against 150+ job roles using NLP."],
            ["Scoring Engine", "ATS + AI relevance scores are calculated."],
            ["Improvement Engine", "AI generates recruiter-focused suggestions."],
          ].map(([title, desc], i) => (
            <Grid item xs={12} md={6} key={i}>
              <Card
                sx={{
                  height: "100%",
                  border: "1px solid #eee",
                  boxShadow: "none",
                }}
              >
                <CardContent>
                  <Typography
                    fontWeight={700}
                    sx={{ color: BRAND_PRIMARY, mb: 1 }}
                  >
                    {title}
                  </Typography>
                  <Typography color="text.secondary">
                    {desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* ================= ATS IN RECRUITMENT ================= */}
      <Section title="How ATS Works in Recruitment">
        <Grid container spacing={3}>
          {[
            "Companies receive thousands of resumes per job",
            "ATS automatically parses and scores resumes",
            "Only high-scoring resumes reach recruiters",
            "Low ATS score = auto-rejection",
          ].map((item, i) => (
            <Grid item xs={12} md={6} key={i}>
              <Paper sx={{ p: 3, border: "1px solid #eee" }}>
                <Typography color={BRAND_TEXT}>✔ {item}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* ================= HR SHORTLISTING ================= */}
      <Section title="How HR Shortlists Candidates">
        <Grid container spacing={3}>
          {[
            "Role-specific keywords",
            "Relevant skills & experience",
            "Quantified impact",
            "ATS-friendly formatting",
            "Clear project descriptions",
          ].map((item, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: "center",
                  border: `1px solid ${BRAND_PRIMARY}`,
                }}
              >
                <Typography fontWeight={600} color={BRAND_TEXT}>
                  {item}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* ================= CTA ================= */}
      <Box sx={{ py: 10, textAlign: "center", bgcolor: "#fff" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          mb={3}
          color={BRAND_TEXT}
        >
          Beat the ATS. Get Shortlisted.
        </Typography>
        <Button
          size="large"
          variant="contained"
          onClick={() => go("/create")}
          sx={{
            bgcolor: BRAND_PRIMARY,
            px: 6,
            py: 1.8,
            fontWeight: 700,
            "&:hover": {
              bgcolor: "#E55A47",
            },
          }}
        >
          Get Started with ResumeIQ
        </Button>
      </Box>
    </>
  );
}

/* ================= SECTION WRAPPER ================= */
function Section({ title, children }) {
  return (
    <Box sx={{ py: 10, bgcolor: "#fff" }}>
      <Container>
        <Typography
          variant="h4"
          fontWeight={800}
          textAlign="center"
          mb={6}
          color={BRAND_TEXT}
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  );
}
