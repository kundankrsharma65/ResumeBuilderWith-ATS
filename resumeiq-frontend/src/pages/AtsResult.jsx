import { Container, Typography, Paper, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import Seo from "../seo/Seo";

export default function AtsResult() {
  const location = useLocation();
  const result = location.state; // optional data from upload

  return (
    <>
      <Seo title="ATS Result | ResumeIQ" />

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            ATS Analysis Result
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Your resume was analyzed using ATS + AI logic.
          </Typography>

          {result ? (
            <Box>
              <Typography>ATS Score: {result.atsScore}</Typography>
              <Typography>AI Score: {result.aiScore}</Typography>
            </Box>
          ) : (
            <Typography color="error">
              No result data found. Please upload a resume again.
            </Typography>
          )}
        </Paper>
      </Container>
    </>
  );
}
