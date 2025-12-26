import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useCallback } from "react";

const BRAND_PRIMARY = "#FF725E";
const BRAND_TEXT = "#37474F";

const navButtonSx = {
  color: BRAND_TEXT,
  fontWeight: 600,
  px: 2.5,
  py: 1,
  borderRadius: 2,
  transition: "all 0.25s ease",
  "&:hover": {
    backgroundColor: BRAND_PRIMARY,
    color: "#fff",
    transform: "translateY(-1px)",
  },
};

export default function Navbar() {
  const { isAuth, logout, loading } = useAuth();
  const navigate = useNavigate();

  const goProtected = useCallback(
    (path) => {
      if (loading) return;
      isAuth ? navigate(path) : navigate("/login");
    },
    [isAuth, loading, navigate]
  );

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: BRAND_TEXT,
        borderBottom: "1px solid #eee",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: 72, px: 2 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              cursor: "pointer",
              color: BRAND_TEXT,
              userSelect: "none",
            }}
            onClick={() => navigate("/")}
          >
            Resume<span style={{ color: BRAND_PRIMARY }}>IQ</span>
          </Typography>

          {/* Center Navigation */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              mx: "auto",
            }}
          >
            <Button sx={navButtonSx} onClick={() => navigate("/")}>
              Dashboard
            </Button>
            <Button sx={navButtonSx} onClick={() => goProtected("/create")}>
              Create Resume
            </Button>
            <Button sx={navButtonSx} onClick={() => goProtected("/upload")}>
              ATS Score
            </Button>
            <Button sx={navButtonSx} onClick={() => goProtected("/history")}>
              Resume History
            </Button>
          </Box>

          {/* Auth Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAuth ? (
              <Button
                variant="outlined"
                onClick={handleLogout}
                sx={{
                  fontWeight: 600,
                  px: 3.5,
                  color: BRAND_PRIMARY,
                  borderColor: BRAND_PRIMARY,
                  borderWidth: 2,
                  "&:hover": {
                    bgcolor: BRAND_PRIMARY,
                    color: "#fff",
                    borderColor: BRAND_PRIMARY,
                    boxShadow: "0 4px 14px rgba(255,114,94,0.35)",
                  },
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: 600,
                    px: 3,
                    color: BRAND_TEXT,
                    borderColor: BRAND_TEXT,
                    "&:hover": {
                      bgcolor: BRAND_TEXT,
                      color: "#fff",
                    },
                  }}
                >
                  Login
                </Button>

                <Divider orientation="vertical" flexItem />

                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  sx={{
                    bgcolor: BRAND_PRIMARY,
                    px: 3.5,
                    fontWeight: 600,
                    boxShadow: "0 6px 18px rgba(255,114,94,0.35)",
                    "&:hover": {
                      bgcolor: "#E55A47",
                      boxShadow: "0 8px 22px rgba(255,114,94,0.45)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
