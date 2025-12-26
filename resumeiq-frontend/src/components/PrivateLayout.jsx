// FILE: src/components/PrivateLayout.jsx
import Navbar from "./Navbar";
import { Container, Box } from "@mui/material";

export default function PrivateLayout({ children }) {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)", // AppBar height
          backgroundColor: "#f4f6f8",
          pt: 4,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </>
  );
}
