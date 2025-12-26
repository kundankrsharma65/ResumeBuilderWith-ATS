import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { uploadResumeApi } from "../api/resume.api";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    if (
      !["application/pdf",
       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ].includes(selected.type)
    ) {
      return alert("Only PDF or DOCX allowed");
    }

    if (selected.size > 5 * 1024 * 1024) {
      return alert("File must be under 5MB");
    }

    setFile(selected);
  };

  const uploadResume = async () => {
    if (!file) return alert("Please select a resume");

    try {
      setLoading(true);
      const res = await uploadResumeApi(file);
      setResult(res.data);
    } catch (err) {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="ATS Score | ResumeIQ" />

      <Box sx={{ maxWidth: 700, mx: "auto", mt: 6 }}>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: 3,
            border: "2px dashed #ddd",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            fontWeight={800}
            color={BRAND_TEXT}
            mb={2}
          >
            Upload Your Resume
          </Typography>

          <Typography
            color={BRAND_TEXT}
            sx={{ opacity: 0.7, mb: 4 }}
          >
            Supported formats: PDF, DOCX (Max 5MB)
          </Typography>

          <input
            type="file"
            hidden
            id="resume-upload"
            onChange={handleFile}
          />

          <label htmlFor="resume-upload">
            <Button
              component="span"
              variant="outlined"
              sx={{
                borderColor: BRAND_PRIMARY,
                color: BRAND_PRIMARY,
                fontWeight: 600,
                px: 4,
                py: 1.2,
                "&:hover": {
                  bgcolor: BRAND_PRIMARY,
                  color: "#fff",
                },
              }}
            >
              Choose Resume
            </Button>
          </label>

          {file && (
            <Typography mt={2} fontWeight={600}>
              {file.name}
            </Typography>
          )}

          <Box mt={4}>
            <Button
              variant="contained"
              onClick={uploadResume}
              disabled={loading}
              sx={{
                px: 6,
                py: 1.6,
                fontWeight: 700,
                bgcolor: BRAND_PRIMARY,
                "&:hover": { bgcolor: "#E55A47" },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Check ATS Score"}
            </Button>
          </Box>
        </Paper>

        {/* RESULT */}
        {result && (
          <Paper
            elevation={0}
            sx={{
              mt: 5,
              p: 4,
              borderRadius: 3,
              border: "1px solid #eee",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              color={BRAND_TEXT}
            >
              ATS Score Result
            </Typography>

            <Typography mt={2} fontSize="1.2rem">
              ATS Score:{" "}
              <strong style={{ color: BRAND_PRIMARY }}>
                {result.score}/100
              </strong>
            </Typography>

            <Typography mt={1} color="text.secondary">
              {result.message}
            </Typography>
          </Paper>
        )}
      </Box>
    </>
  );
}
