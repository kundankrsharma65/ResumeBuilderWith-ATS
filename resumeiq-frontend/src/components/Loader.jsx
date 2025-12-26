// FILE: src/components/Loader.jsx
import { Box, CircularProgress, Typography } from "@mui/material";

export default function Loader({
  text = "Loading, please wait...",
  size = 48,
}) {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <CircularProgress size={size} />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
