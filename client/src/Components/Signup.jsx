import React, { useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import axios from "axios"; // install axios using npm install axios
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const heading = {fontSize: "2.5rem", fontWeight:"600"}
  const paperStyle={padding:"2rem", margin:"100px auto", borderRadius:"1rem", boxShadow: "10px 10px 10px"}
  const row={display:"flex",marginTop:"2rem"}
  const btnStyle={marginTop: "2rem", fontSize:"1.2rem", fontWeight:"700", backgroundColor:"blue", borderRadius:"0.5rem"};
  
  const [name,setName] = useState(""); // this hook will use this current stat and it will use this function to update the current state
  // the value taken from onChange function in TextField will be pass to this const and update the value of this name
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate function of react-router-dom helps to navigate different routes inside the application


  const handleSignup=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:3001/signup", {name, email, password}) // this will send data from frontend to backend
    .then(result=>{
      if(result.status==201){
        console.log("User created successfully");
        navigate("/login");
      }
    }).catch(err=> {
      if(err.response && err.response.status===400){
        window.alert("Email already exists. Please use a different email")
      }else{
        console.log(err)
      }
    })


  }


  return (
    <>
      <Grid align="center">
        <Paper style={paperStyle}
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
          <Typography style={heading}>Signup</Typography>
          <form onSubmit={handleSignup}>
            <TextField onChange={(e)=>setName(e.target.value)} name="name" required style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} label="Enter Name" type="text"></TextField>
            <TextField onChange={(e)=>setEmail(e.target.value)} name="email" required style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} label="Enter Email" type="email"></TextField>
            <TextField onChange={(e)=>setPassword(e.target.value)} name="password" required style={row} sx={{label: { fontWeight: '700', fontSize:"1.3rem" }}} label="Enter Password" type="password"></TextField>
            <Button type="submit" variant="contained" style={btnStyle}>Signup</Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};
