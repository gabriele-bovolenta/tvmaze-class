import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UseUserAuth } from "../Context/authContext";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  const { logOut } = UseUserAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ backgroundColor: "black" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TVMaze
          </Typography>
          <Link to={"/search"}>
            <Button color="inherit">
              Search
            </Button>
          </Link>
          <Link to={"/favourite"}>
            <Button color="inherit">
              Favourite
            </Button>
          </Link>
          <Link to={"/home"}>
            <Button color="inherit">
              Home
            </Button>
          </Link>
          <Button color="inherit" onClick={logOut}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
