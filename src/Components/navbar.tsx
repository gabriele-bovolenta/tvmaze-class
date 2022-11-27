import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UseUserAuth } from '../Context/authContext';

export default function ButtonAppBar() {
  const { currentUser, logOut } = UseUserAuth();

  if (currentUser === undefined) {
    return (
      <></>
    )
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: 'black' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TVMaze
          </Typography>
          {!!currentUser ?
            <>
              <Button color="inherit" href="/search">Search</Button>
              <Button color="inherit" href="/favourite">favourite</Button>
              <Button color="inherit" href="/home">Home</Button>
              <Button color="inherit" href="/login" onClick={logOut}>Logout</Button>
            </>
            :
            <Button color="inherit" href="/login">Login</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}