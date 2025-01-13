import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import {AppBar, Typography, Toolbar, Button} from "@mui/material";
import Logout from './Logout';
import { IsLoggedInContext } from '../App';


const Navbar = () => {
  const isLoggedIn = useContext(IsLoggedInContext);
  const button={marginRight:'20px', fontSize:'1.2rem', fontWeight:'700', padding:'0.3rem 1.4rem'}

  return (
    <>
      <AppBar sx={{bgcolor: '#333'}}>
        <Toolbar>
          <Typography variant='h4' sx={{flexGrow:1}}>Placment Project</Typography>
          {isLoggedIn?<Logout/>:(
            <>
              <Button style={button} color='error' variant='contained' to="/login" component={Link}>Login</Button>
              <Button style={button} color='success' variant='contained' to="/signup" component={Link}>Signup</Button>
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar