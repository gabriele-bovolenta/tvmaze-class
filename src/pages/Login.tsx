import Button from "@mui/material/Button";
import { Avatar, Box, Container, TextField, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { UseUserAuth } from "../Context/authContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { currentUser, createAccount, signInWithGoogle, login } = UseUserAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/search");
    }
  }, [navigate, currentUser]);

  const handleCreateAccount = () => {
    try {
      createAccount(email, password);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    try {
      login(email, password);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
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
              variant="contained"
              style={{
                marginTop: 15,
                marginRight: "auto",
                marginBottom: 15,
                marginLeft: "auto",
                display: "flex",
                borderRadius: 35,
                backgroundColor: "#634b66",
                padding: "9px 18px",
                fontSize: "15px",
              }}
              onClick={handleCreateAccount}
            >
              Create Account
            </Button>
            <Button
              variant="contained"
              style={{
                marginTop: 15,
                marginRight: "auto",
                marginBottom: 15,
                marginLeft: "auto",
                display: "flex",
                borderRadius: 35,
                backgroundColor: "#634b66",
                padding: "9px 18px",
                fontSize: "15px",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <GoogleButton
              style={{
                marginTop: 15,
                marginRight: "auto",
                marginBottom: 15,
                marginLeft: "auto",
              }}
              onClick={signInWithGoogle}
            />
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Login;
