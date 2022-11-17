import Button from '@mui/material/Button';
import { auth, provider } from '../Firebase/firebase-config'
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';

function Login({ setIsAuth }: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    let navigate = useNavigate();

    const signUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            console.log(user);
            alert('Success')

            localStorage.setItem("isAuth", 'true');
            setIsAuth(true);
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
            localStorage.setItem("isAuth", 'true');
            setIsAuth(true);
            navigate('/');
        })
    }

    return (
        <div className="loginPage">
            <div>
                <div>
                    <input type={"email"} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                    <input type={"password"} placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                    <Button variant="contained" onClick={signUp}>Sign Up</Button>   
                </div>

            </div>
            <p>Sign In with Google to continue</p>
            <Button variant="contained" onClick={signWithGoogle}>Sign with Google</Button>
        </div>
    )
}

export default Login;