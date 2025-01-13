const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const UserModel = require("./model/User");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // use npm install express-session connect-mongo


dotenv.config();
const app = express();
app.use(express.json()); // this will setup the middleware for express application to pass incoming json payload

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true // credentials:true are used in clint cookies and other credentials the server must be configured to accept and process this credentials properly
})); // cors is a middleware it will enable the routes in our application allowing any domain to make requests to our server
// so the frontend will communicate with the backend and vice versa using the cors

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
}) // this will process the port number that is defined in .env file

app.use(session({
  secret:process.env.SESSION_SECRET, // SESSION_SECRET is a secret key which is used to sign session id cookie
  resave:false, // resave:false option controls whether the session is saved back to the session store even if it was never modified. so what we will do is we will create our session and 
  // store it in mongodb database so we will store our session in our mongodb store and setting it to false this will improve performance by preventing unnecessary session updates
  saveUninitialized:true, // saveUninitialized:true option will control whether uninitialized sessions are saved to the store or not, setting it true helps to ensure that session is stored when it is created
  // even if it hasn't been modified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // how long session should be stored
    httpOnly: true, // Cookie is not accessible via JavaScript
      secure: false, // Set `true` if using HTTPS
      sameSite: "lax", // Prevent CSRF; can be 'strict', 'lax', or 'none'
   }  
})) // it is a middleware which is essential for managing user sessions in our express js application it will allow us to store session data securely by
// configuring options like secret receive save and initialize store nad cookie. we can fine tune how sessions are handled we can see as we go on

// req is request and res is response
app.post("/signup",async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log(name+" "+email+" "+password)
    const existingUser = await UserModel.findOne({email}); // here await is use so it will wait for UserModel to find particular document in mongodb with this particular email
    console.log(existingUser)
    if(existingUser){
      return res.status(400).json.json({error: "Email already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10); // bcrpyt will convert our plain text password into hash code, here 10 is salt number which represent the complexity of hashing algo
    const newUser = new UserModel({name, email, password: hashedPassword});
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // 201 means user created successfully
  }
  catch (error) {
    res.status(500).json({error: error.message});
  }
});
// asyn will wait for a particular function to finish


app.post("/login",async (req, res) => {
  try{
    const {email, password} = req.body;
  const user = await UserModel.findOne({email});
  if(user){
    const passwordMatch = await bcrypt.compare(password, user.password); // password is current password and user.password is the database password
    if(passwordMatch){
      req.session.user = {id:user._id, name:user.name, email:user.email}; // a session will be created inside the user to send user details to the frontend
      res.json("Success");
      console.log(email)
    }
    else{
      res.status(401).json("Password does not match!");
    }
  }else{
    res.status(401).json("No Records found");
  }
  }catch(error){
    res.status(500).json({error:error.message})
  }
  
});


app.get('/user', (req, res) =>{
  if(req.session.user){
    console.log(req.session.user); // Log the session data
    res.json({ user: req.session.user });
  } else{
    console.log("No user session"); // Log if session is not found
    res.status(401).json("Not authenticated");
  }
});


app.post("/logout",(req, res)=>{
  if(req.session){
    req.session.destroy((err)=>{
      if(err){
        res.status(500).json({error:"Failed to logout"});
      }
      else{
        res.clearCookie("connect.sid", {
          path: "/", // Make sure to specify the correct path
          httpOnly: true, // Cookie is only accessible via HTTP
          secure: false, // Set `true` if using HTTPS in production
        }); // Clear the session cookie from the client
        res.status(200).json("Logout successfully");
      }
    })
  }else{
    res.status(400).json({error:"No session found"});
  }
})


