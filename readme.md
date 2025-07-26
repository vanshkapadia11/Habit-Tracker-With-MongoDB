## For Creating The Backend Struc!!

    mkdir backend
    cd backend
    npm init -y
    npm install express mongoose dotenv bcryptjs jsonwebtoken cors nodemon socket.io

    # Backend folders
    New-Item -ItemType Directory config
    New-Item -ItemType Directory controllers
    New-Item -ItemType Directory models
    New-Item -ItemType Directory routes
    New-Item -ItemType Directory middleware
    New-Item -ItemType Directory utils

    # Backend files
    New-Item server.js
    New-Item .env
    New-Item config\db.js
    New-Item models\User.js
    New-Item controllers\userController.js
    New-Item routes\userRoutes.js
    New-Item middleware\authMiddleware.js
    New-Item utils\generateToken.js

    # Add .gitignore
    New-Item .gitignore
    Add-Content .gitignore "node_modules"
    Add-Content .gitignore ".env"

## For Creating The Frontend!!

    cd ..
    npm create vite@latest frontend
    # Choose React and JavaScript
    cd frontend
    npm install
    npm install axios react-router-dom

    cd src
    New-Item -ItemType Directory components
    New-Item -ItemType Directory pages
    New-Item -ItemType Directory context
    New-Item -ItemType Directory utils

    # Example files
    New-Item components\Navbar.jsx
    New-Item pages\Home.jsx
    New-Item pages\Login.jsx
    New-Item pages\Register.jsx
    New-Item context\AuthContext.jsx
    New-Item utils\api.js

## For Running Both The Server At Same Time!! --- Have To Do This In Root Folder!!

    npm init -y
    npm install concurrently
