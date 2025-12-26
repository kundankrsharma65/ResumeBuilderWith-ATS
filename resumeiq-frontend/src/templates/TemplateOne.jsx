import { Box, Typography } from "@mui/material";

export default function TemplateOne({ data }) {
  return (
    <Box sx={{ fontFamily: "Georgia, serif", color: "#37474F" }}>
      <Typography variant="h4" fontWeight={800}>
        {data.name}
      </Typography>

      <Typography variant="subtitle1" mb={2}>
        {data.role}
      </Typography>

      <Typography fontWeight={700}>Skills</Typography>
      <Typography mb={2}>{data.skills.join(", ")}</Typography>

      <Typography fontWeight={700}>Experience</Typography>
      <Typography>{data.experience}</Typography>
    </Box>
  );
}
