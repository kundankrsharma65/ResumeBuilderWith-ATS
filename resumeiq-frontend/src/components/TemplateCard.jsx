import { Paper, Typography, Button } from "@mui/material";

export default function TemplateCard({ name, onSelect }) {
  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Typography fontWeight={700} mb={2}>
        {name}
      </Typography>
      <Button variant="contained" onClick={onSelect}>
        Use Template
      </Button>
    </Paper>
  );
}
