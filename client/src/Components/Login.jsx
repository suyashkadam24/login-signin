import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";

const Login = () => {
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const heading = { fontSize: "2.5rem", fontWeight: "600" };
  const paperStyle = {
    padding: "2rem",
    margin: "100px auto",
    borderRadius: "1rem",
    boxShadow: "10px 10px 10px",
  };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontWeight: "700",
    backgroundColor: "blue",
    borderRadius: "0.5rem",
  };

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // to prevent default behaviour of the form submission
    axios
      .post(
        "http://localhost:3001/login",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data === "Success") {
          // navigate("/home"); // if login is success then navigate to the home page
          axios
            .get("http://localhost:3001/user", { withCredentials: true })
            .then((response) => {
              if (response.data.user) {
                setIsLoggedIn(true);
                navigate("/home", { state: { user: response.data.user } });
              }
            });
          // withCredentials:true will help the cors to bypass the cookies and session between the client and the server, the server must be configured
          // to accept and process these credentials and so must be the client
        } else {
          alert("login failed: User does not exists");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid align="center">
        <Paper
          style={paperStyle}
          sx={{
            width: {
              xs: "80vw",
              sm: "50vw",
              md: "40vw",
              lg: "30vw",
              xl: "20vw",
            },
            height: "60vh",
          }}
        >
          <Typography style={heading}>Login</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              style={row}
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              label="Enter Email"
              type="email"
            ></TextField>
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              style={row}
              sx={{ label: { fontWeight: "700", fontSize: "1.3rem" } }}
              label="Enter Password"
              type="password"
            ></TextField>
            <Button type="submit" variant="contained" style={btnStyle}>
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
