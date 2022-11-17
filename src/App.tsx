import './App.css';

import SearchPage from './pages/SearchPage';
import DetailPage from './pages/DetailPage';
import Login from './pages/Login'
import Home from './pages/home';
import { signOut } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react';
import { auth } from './Firebase/firebase-config';
import { Button } from '@mui/material';
import Favourite from './pages/Favourite';

function App() {

  const [isAuth, setIsAuth] = useState<boolean>(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        {!isAuth ? <Link to="/login">Login</Link> :
          <>
            <Link to="/search">Search</Link>
            <Link to="/favourite">Favourite</Link>
            <Button variant="contained" onClick={signUserOut}>Log Out</Button>
          </>}
      </nav>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path='/search' element={<SearchPage isAuth={isAuth} />}></Route>
        <Route path='/search/:showId' element={<DetailPage isAuth={isAuth} />}></Route>
        <Route path='/favourite' element={<Favourite />}></Route>
      </Routes>
    </Router>
  );
}

export default App;