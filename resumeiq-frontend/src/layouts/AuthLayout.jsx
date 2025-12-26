import { Grid, Box, Typography, Container } from "@mui/material";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <Grid container>
        {/* LEFT SIDE (Branding) */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: `linear-gradient(135deg, ${BRAND_PRIMARY}, #ff9a8b)`,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            px: 6,
          }}
        >
          <Box maxWidth={420}>
            <Typography variant="h3" fontWeight={800} mb={2}>
              ResumeIQ
            </Typography>
            <Typography fontSize="1.2rem" lineHeight={1.6}>
              Build ATS-optimized resumes, get higher shortlisting chances,
              and stand out in recruiter screenings.
            </Typography>
          </Box>
        </Grid>

        {/* RIGHT SIDE (FORM) */}
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container maxWidth="sm">
            <Typography
              variant="h4"
              fontWeight={800}
              color={BRAND_TEXT}
              mb={1}
            >
              {title}
            </Typography>
            <Typography
              color={BRAND_TEXT}
              sx={{ opacity: 0.7, mb: 4 }}
            >
              {subtitle}
            </Typography>

            {children}
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
}
