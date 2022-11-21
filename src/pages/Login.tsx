import Button from '@mui/material/Button';
import { Avatar, Box, Container, CssBaseline, TextField, Typography } from '@mui/material';
import GoogleButton from 'react-google-button'
import { UseUserAuth } from '../Context/authContext';
import { useState } from 'react';

function Login() {
    const { currentUser, signUp, signWithGoogle } = UseUserAuth();
    console.log(currentUser?.email);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSignUp = () => {
        try {
            signUp(email, password)
        } catch (err: any) {
            console.log(err);
        }
    }

    const handleSignWithGoogle = () => {
        try {
            signWithGoogle()
            
        } catch (err: any) {
            console.log(err);
        }
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
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
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
                            onClick={handleSignUp}
                        >
                            Sign In
                        </Button>
                        <GoogleButton
                            onClick={handleSignWithGoogle}
                        />
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Login;