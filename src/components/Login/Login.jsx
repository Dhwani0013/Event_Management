import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Modal from "@mui/material/Modal"; // Import modal component
import { useAuth } from "../../authentication";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../Firebase";
import logo from "../../Assets/images/logo.jpg";

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [openForgotPasswordModal, setOpenForgotPasswordModal] =
    React.useState(false); // State for modal

  const handleOpenForgotPasswordModal = () => {
    setOpenForgotPasswordModal(true);
  };

  const handleCloseForgotPasswordModal = () => {
    sendPasswordResetEmail(
      document.getElementById("forgot-password-email").value
    );
    setOpenForgotPasswordModal(false);
  };

  const sendPasswordResetEmail = async (email) => {
    try {
      await auth.sendPasswordResetEmail(email);
      console.log("Password reset email sent to", email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error.message);
      alert("Error sending password reset email. Please try again later.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      await login(
        data.get("email"),
        data.get("password"),
        data.get("remember") == "remember" ? true : false
      );
      navigate("/");
    } catch (error) {
      setError("Incorrect email or password. Please try again.");
      console.error("Error logging in:", error.message);
    }
  };

  const handleSnackbarClose = () => {
    setError("");
  };

  const storedAuth = localStorage.getItem("isAuthenticated");

  if (storedAuth === "true") {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?party)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography
              variant="body2"
              color="white"
              align="center"
              sx={{ fontStyle: "italic", fontWeight: 900, marginTop: 30 }}
            >
              Event Crafters
            </Typography>
            <Typography
              variant="body2"
              color="white"
              align="center"
              sx={{
                fontStyle: "italic",
                marginTop: 2,
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              EventCrafters is the game-changer in event management, providing
              organizers with a powerful toolkit to effortlessly plan, market,
              and oversee events while exceeding attendee expectations. With
              intuitive technology and robust marketing features, EventCrafters
              ensures maximum visibility and seamless coordination. What truly
              sets it apart is its dedication to attendee satisfaction, using
              advanced analytics to tailor experiences to perfection. With
              EventCrafters, organizers can create unforgettable events that
              leave a lasting impression on every attendee.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  sx={{
                    m: 1,
                    bgcolor: "secondary.main",
                    width: 100,
                    height: 100,
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={logo}
                    alt="Lock"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h5" gutterBottom>
                  Event Crafters
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                Professional Event Organizer
                </Typography>
              </Grid>
            </Grid>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      size="small"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </Button>
                  ),
                }}
              />
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              <FormControlLabel
                control={
                  <Checkbox
                    id="remember"
                    name="remember"
                    value="remember"
                    color="primary"
                    checked
                  />
                }
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleOpenForgotPasswordModal}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  © {new Date().getFullYear()} Event Crafters
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={openForgotPasswordModal}
        onClose={handleCloseForgotPasswordModal}
        aria-labelledby="forgot-password-modal-title"
        aria-describedby="forgot-password-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="forgot-password-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Forgot Password
          </Typography>
          <Typography
            id="forgot-password-modal-description"
            sx={{ mt: 2 }}
            align="center"
          >
            To reset your password, please enter your email address below.
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="forgot-password-email"
            label="Email Address"
            name="forgot-password-email"
            autoComplete="email"
            autoFocus
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleCloseForgotPasswordModal}
          >
            Send Reset Email
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
