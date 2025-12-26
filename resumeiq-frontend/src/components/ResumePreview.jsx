import { Paper, Typography, Box, Divider } from "@mui/material";

const BRAND_TEXT = "#37474F";

export default function ResumePreview({ text }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: "1px solid #eee",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={800}
        color={BRAND_TEXT}
        mb={2}
      >
        Resume Preview
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box
        sx={{
          whiteSpace: "pre-line",
          fontFamily: "Georgia, serif",
          lineHeight: 1.7,
          color: BRAND_TEXT,
        }}
      >
        {text}
      </Box>
    </Paper>
  );
}
