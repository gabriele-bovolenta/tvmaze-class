// Import React
import { useEffect, useState } from "react";

// Import context Auth
import { UseUserAuth } from "../../Context/authContext";

// Import react-router-dom
import { useNavigate } from "react-router-dom";

// Import MUI
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";

// Import Google button
import GoogleButton from "react-google-button";

import './Login.scss'

const Login = () => {
  // Auth context function
  const { currentUser, createAccount, signInWithGoogle, login } = UseUserAuth();

  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // useNavigate
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) {
      navigate("/search");
    }
  }, [navigate, currentUser]);

  const handleCreateAccount = () => {
    try {
      createAccount(email, password);
      navigate("/search")
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleLogin = () => {
    try {
      login(email, password);
      navigate("/search")
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
    <CssBaseline />
    <div className="login">
    <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={1}>
          <Container component="main" maxWidth="xs" className="login-page">
            <Box
              sx={{
                marginTop: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#181d31" }}></Avatar>
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
                    backgroundColor: "#678983",
                    padding: "9px 18px",
                    fontSize: "15px",
                    width: "140px",
                  }}
                  onClick={handleCreateAccount}
                >
                  Sign In
                </Button>
                <Button
                  variant="contained"
                  className="custom-button"
                  style={{
                    marginTop: 15,
                    marginRight: "auto",
                    marginBottom: 15,
                    marginLeft: "auto",
                    display: "flex",
                    borderRadius: 35,
                    backgroundColor: "#678983",
                    padding: "9px 18px",
                    fontSize: "15px",
                    width: "140px",
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <hr
                  style={{
                    marginTop: 30,
                    marginRight: "auto",
                    marginBottom: 30,
                    marginLeft: "auto",
                    backgroundColor: "#181d31",
                  }}
                />

                <GoogleButton
                  style={{
                    marginTop: 15,
                    marginRight: "auto",
                    marginBottom: 15,
                    marginLeft: "auto",
                    backgroundColor: "#181d31",
                  }}
                  onClick={signInWithGoogle}
                />
              </Box>
            </Box>
          </Container>
        </Grid>
      </Grid>

    </div>
      
    </>
  );
};

export default Login;
