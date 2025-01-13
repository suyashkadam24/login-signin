# User Authentication System with React and Node.js

This project is a full-stack application for user authentication. It allows users to register, log in, and log out securely using React on the frontend and Node.js with MongoDB on the backend.

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Setup Instructions](#setup-instructions)
4. [Environment Variables](#environment-variables)
5. [Folder Structure](#folder-structure)    
6. [API Endpoints](#api-endpoints)
7. [Screenshots](#screenshots)
8. [License](#license)

---

## Features

- **User Signup**: Register new users securely with hashed passwords.
- **User Login**: Authenticate users using bcrypt and sessions.
- **Session Management**: Sessions are stored in MongoDB for persistence.
- **User Logout**: Clear user sessions and cookies.
- **Protected Routes**: Restrict access to certain pages based on authentication status.

---

## Tech Stack

### Frontend:
- **React**: For building the user interface.
- **Material UI**: For styling components.
- **Axios**: For making HTTP requests.

### Backend:
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: Database for storing user credentials and sessions.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **bcrypt**: For hashing passwords.
- **express-session**: For session management.
- **connect-mongo**: To store sessions in MongoDB.

---

## Setup Instructions

### Prerequisites:
1. Install [Node.js](https://nodejs.org/).
2. Install [MongoDB](https://www.mongodb.com/).

### Steps to Run the Application:

1. **Clone the repository**:
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install dependencies**:
- Navigate to the frontend directory and install dependencies:
    cd client
    npm install
- Navigate to the backend directory and install dependencies:
    cd server
    npm install

3. **Set up environment variables**:

- Create a .env file in the backend directory and add the following variables:
    PORT=3001
    MONGO_URI=your-mongodb-connection-string
    FRONTEND_URL=http://localhost:5173
    SESSION_SECRET=your-session-secret

4. **Run the backend server**:
    cd server
    npm start

5. **Run the frontend**:

- Open a new terminal and navigate to the frontend directory:
    cd client
    npm start

6. **Access the application**-

- Open your browser and visit http://localhost:5173.

## API Endpoints
### POST /signup
- Description: Registers a new user.
- Request Body:
    {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword"
    }

- Response:
- 201: User created successfully.
- 400: Email already exists.




