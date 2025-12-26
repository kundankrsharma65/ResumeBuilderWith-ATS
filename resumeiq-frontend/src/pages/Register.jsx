import { TextField, Button, Box, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import OtpDialog from "../components/OtpDialog";
import { registerApi, verifyOtpApi } from "../api/auth.api";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";

export default function Register() {
  const navigate = useNavigate();

  const [showOtp, setShowOtp] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    await registerApi(form);

    setEmailForOtp(form.email);
    setShowOtp(true); // ✅ OPEN OTP POPUP
  };

  const handleVerifyOtp = async (otp) => {
    await verifyOtpApi({
      email: emailForOtp,
      otp,
    });

    navigate("/login");
  };

  return (
    <>
      <Seo title="Register | ResumeIQ" />

      <AuthLayout
        title="Create Account"
        subtitle="Start building ATS-optimized resumes"
      >
        <Box component="form" onSubmit={handleRegister}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            required
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            margin="normal"
            required
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            margin="normal"
            required
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            margin="normal"
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              fontWeight: 700,
              bgcolor: BRAND_PRIMARY,
              "&:hover": { bgcolor: "#E55A47" },
            }}
          >
            Register
          </Button>

          <Box textAlign="center" mt={3}>
            <Link
              component="button"
              onClick={() => navigate("/login")}
              sx={{
                color: BRAND_PRIMARY,
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Box>

        {/* OTP MODAL */}
        <OtpDialog
          open={showOtp}
          onClose={() => setShowOtp(false)}
          onVerify={handleVerifyOtp}
        />
      </AuthLayout>
    </>
  );
}
