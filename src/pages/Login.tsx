import Button from '@mui/material/Button';
import { auth, provider } from '../Firebase/firebase-config'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, Grid, TextField, Typography } from '@mui/material';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);
                alert('Success')
                navigate('/');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);
            });
    }

    const signWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            navigate('/');
        })
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={signUp} noValidate sx={{ mt: 1 }}>
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
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={signWithGoogle}
                        >
                            Sign In With Google
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login;