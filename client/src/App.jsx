import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { Home } from "./Components/Home";
import { Signup } from "./Components/signup";
import axios from "axios";

export const IsLoggedInContext = createContext(); 
export const SetIsLoggedInContext = createContext();
// createContext() is function from react which will create a new context object
// contexts in react are used to pass data trhough the component tree without having to manually pass props at every level they consist of two parts
// one is isLoggedInContext
// SetIsLoggedInContext = createContext() is used to provide a function setIsLoggedIn to update the value of the isLoggedIn

function App() {
  const[isLoggedIn, setIsLoggedIn] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state.
  useEffect(()=>{
    axios.get("http://localhost:3001/user", {withCredentials:true})
    .then(response=>{
      if(response.data.user){
        setIsLoggedIn(true)
      }else{
        setIsLoggedIn(false)
      }
      setLoading(false);
    })
    .catch(()=> setIsLoggedIn(false))

    .finally(() => {
      setLoading(false); // Set loading to false after session check is complete
    });
  }, [])
  //this will initialize state variable isLoggedIn with a default value false and SetIsLoggedIn will manage whether the user is logged in as true or not,true if user is loggediin or faluse
  // this is used to make sure that logout button is only shown when user is logged in and when logged in signup button is not shown

  // Show a loading screen while checking the user's login status.
  if (loading) {
    return <div>Loading...</div>; // Or use a spinner here.
  }

  return (
    <>
    <IsLoggedInContext.Provider value = {isLoggedIn}>
      <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/login" element={isLoggedIn?<Navigate to="/home"/>:<Login/>}></Route>
          <Route path="/signup" element={isLoggedIn?<Navigate to="/home"/>:<Signup/>}></Route>
          <Route path="/home" element={isLoggedIn? <Home/> : <Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
      </SetIsLoggedInContext.Provider>
    </IsLoggedInContext.Provider>
      
    </>
  );
}

// browser router provide a router capacity to your application so that it will act as a wrapper to your whole application
export default App;
