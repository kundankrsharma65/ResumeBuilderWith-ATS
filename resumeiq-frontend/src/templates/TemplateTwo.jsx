import { Box, Typography, Divider } from "@mui/material";

export default function TemplateTwo({ data }) {
  return (
    <Box sx={{ fontFamily: "Arial", color: "#37474F" }}>
      <Typography variant="h3" fontWeight={700}>
        {data.name}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography mb={2}>{data.role}</Typography>

      <Typography fontWeight={600}>Projects</Typography>
      {data.projects.map((p, i) => (
        <Typography key={i}>• {p}</Typography>
      ))}
    </Box>
  );
}
