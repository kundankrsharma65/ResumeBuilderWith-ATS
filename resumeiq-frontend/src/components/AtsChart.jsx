import { CircularProgress, Box, Typography } from "@mui/material";

export default function AtsChart({ score }) {
  return (
    <Box textAlign="center" mt={3}>
      <CircularProgress
        variant="determinate"
        value={score}
        size={120}
        thickness={4}
      />
      <Typography variant="h6" mt={2}>
        ATS Score: {score}%
      </Typography>
    </Box>
  );
}
