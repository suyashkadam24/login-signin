import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const location = useLocation();
  // useLocation is used to access state info of current url
  const navigate = useNavigate();
  const [user, setUser] = useState(location.state?.user);
  const [loading, setLoading] = useState(!user);  //if user location is available only then we will extract the user info
  // ?. is optional chaining is used to safely access the user object within the state property of the location object in case the location of state or
  // location.state.user is undefined it will avoid throwing error and will just assign undefined to the user
  
  useEffect(() => {
    if (!user) {
        axios.get('http://localhost:3001/user', { withCredentials: true })
            .then(response => {
                if (response.data.user) {
                    setUser(response.data.user);
                } else {
                    navigate("/login");
                }
            })
            .catch(() => navigate("/login"))
            .finally(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
      return <center><h1>Loading...</h1></center>;
  }  
  return (
    <div style={{color:'white'}}><h1>`Welcome Home {user && user.name}`</h1></div> // first it will check user means current user exists or not then it will check user.name which from the database
  )
}
