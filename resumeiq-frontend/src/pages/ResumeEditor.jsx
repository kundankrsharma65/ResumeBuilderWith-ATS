import { Box, Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { templates } from "../templates";
import DownloadPdfButton from "../components/DownloadPdfButton";

export default function ResumeEditor() {
  const { templateId } = useParams();

  const template = templates.find((t) => t.id === templateId);
  const TemplateComponent = template.component;

  const [data, setData] = useState({
    name: "Your Name",
    role: "Your Role",
    skills: ["Java", "Spring Boot"],
    experience: "Your experience here",
    projects: ["Project 1", "Project 2"],
  });

  return (
    <Grid container spacing={4}>
      {/* Editor */}
      <Grid item xs={12} md={5}>
        <TextField
          fullWidth
          label="Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <TextField
          fullWidth
          label="Role"
          sx={{ mt: 2 }}
          value={data.role}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        />

        <DownloadPdfButton />
      </Grid>

      {/* Preview */}
      <Grid item xs={12} md={7}>
        <Box id="resume-preview">
          <TemplateComponent data={data} />
        </Box>
      </Grid>
    </Grid>
  );
}
