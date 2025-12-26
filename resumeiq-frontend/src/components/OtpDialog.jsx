import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

const BRAND_PRIMARY = "#FF725E";

export default function OtpDialog({
  open,
  onClose,
  onVerify,
  showPasswordFields = false,
  onPasswordChange,
}) {
  const [otp, setOtp] = useState("");
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const submit = () => {
    if (showPasswordFields) {
      onPasswordChange(passwords);
    }
    onVerify(otp);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={700}>Verify OTP</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="OTP"
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {showPasswordFields && (
          <>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              margin="normal"
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
            />
            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              margin="normal"
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  confirmPassword: e.target.value,
                })
              }
            />
          </>
        )}

        <Box mt={3}>
          <Button
            fullWidth
            variant="contained"
            onClick={submit}
            sx={{
              py: 1.4,
              fontWeight: 700,
              bgcolor: BRAND_PRIMARY,
              "&:hover": { bgcolor: "#E55A47" },
            }}
          >
            Verify & Continue
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
