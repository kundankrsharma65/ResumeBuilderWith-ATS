import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import OtpDialog from "../components/OtpDialog";
import {
  forgotPasswordApi,
  resetPasswordApi,
} from "../api/auth.api";
import Seo from "../seo/Seo";

const BRAND_PRIMARY = "#FF725E";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const sendOtp = async () => {
    if (!email) return alert("Email required");

    await forgotPasswordApi(email);
    setShowOtp(true);
  };

  const handleResetPassword = async (otp) => {
    await resetPasswordApi({
      email,
      otp,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword,
    });

    alert("Password reset successful");
    navigate("/login");
  };

  return (
    <>
      <Seo title="Forgot Password | ResumeIQ" />

      <AuthLayout
        title="Reset Password"
        subtitle="Recover access to your ResumeIQ account"
      >
        <TextField
          fullWidth
          label="Registered Email"
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          onClick={sendOtp}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: 700,
            bgcolor: BRAND_PRIMARY,
            "&:hover": { bgcolor: "#E55A47" },
          }}
        >
          Send OTP
        </Button>

        {/* OTP + New Password Popup */}
        <OtpDialog
          open={showOtp}
          onClose={() => setShowOtp(false)}
          onVerify={handleResetPassword}
          showPasswordFields
          onPasswordChange={setPasswordForm}
        />
      </AuthLayout>
    </>
  );
}
