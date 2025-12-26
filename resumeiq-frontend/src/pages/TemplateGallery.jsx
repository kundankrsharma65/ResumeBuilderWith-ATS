import { Grid, Typography } from "@mui/material";
import TemplateCard from "../components/TemplateCard";
import { templates } from "../templates";
import { useNavigate } from "react-router-dom";

export default function TemplateGallery() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" fontWeight={800} mb={4}>
        Choose Resume Template
      </Typography>

      <Grid container spacing={3}>
        {templates.map((t) => (
          <Grid item xs={12} md={4} key={t.id}>
            <TemplateCard
              name={t.name}
              onSelect={() => navigate(`/editor/${t.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
