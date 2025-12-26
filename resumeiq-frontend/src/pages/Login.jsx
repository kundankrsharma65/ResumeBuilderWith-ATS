import { TextField, Button, Box, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import { loginApi } from "../api/auth.api";
import { useAuth } from "../auth/AuthContext";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ IMPORTANT

    try {
      setLoading(true);

      const res = await loginApi({
        email: form.email,
        password: form.password,
      });

      // ✅ Backend returns { token }
      login(res.data.token);

      navigate("/", { replace: true });
    } catch (err) {
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Login | ResumeIQ" />

      <AuthLayout
        title="Welcome Back"
        subtitle="Login to continue building ATS-optimized resumes"
      >
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
            value={form.email}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: BRAND_PRIMARY },
                "&.Mui-focused fieldset": { borderColor: BRAND_PRIMARY },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: BRAND_PRIMARY,
              },
            }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
            value={form.password}
            onChange={handleChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: BRAND_PRIMARY },
                "&.Mui-focused fieldset": { borderColor: BRAND_PRIMARY },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: BRAND_PRIMARY,
              },
            }}
          />

          <Box textAlign="right" mt={1} mb={3}>
            <Link
              component="button"
              onClick={() => navigate("/forgot-password")}
              sx={{
                color: BRAND_PRIMARY,
                fontWeight: 500,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.6,
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: BRAND_PRIMARY,
              boxShadow: "0 6px 20px rgba(255,114,94,0.3)",
              "&:hover": {
                bgcolor: "#E55A47",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 25px rgba(255,114,94,0.4)",
              },
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Box textAlign="center" mt={3}>
            <Link
              component="button"
              onClick={() => navigate("/register")}
              sx={{
                color: BRAND_PRIMARY,
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Don’t have an account? Create one
            </Link>
          </Box>
        </Box>
      </AuthLayout>
    </>
  );
}
