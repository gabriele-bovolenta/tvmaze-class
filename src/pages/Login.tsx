import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { UseUserAuth } from "../Context/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { currentUser, createAccount, signInWithGoogle } = UseUserAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser !== null) {
        navigate('/home')
    }
}, [navigate, currentUser])

  const handleCreateAccount = () => {
    try {
      createAccount(email, password);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSignInWithGoogle = () => {
    try {
      signInWithGoogle();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <GoogleButton onClick={handleSignInWithGoogle} />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
