<h1 align="center"> 🖥️ Account Management Project 🖥️ </h1>

<p align="center">
<img src="./Images/demo.gif" alt="animated" width="1280" height="500"/>
</p>

<p align="center">💡 A Fullstack Login System With Simple Design. </p>
<p align="center">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white"/>
<img src="https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white"/>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white"/>
 </p>

# Getting Started

This is a simple fullstack project that demonstrates user registration, login, and account management functionality. The project consists of a React frontend and a Nodejs backend.

## Features

- User registration
- User login
- Displaying and updating user profile information
- Logging out
- Deleting user accounts

## Installation and Setup

### I. Backend and Database

1. In terminal, navigate to the `./backend` directory

```
cd backend
```

2. Install the dependencies using the following command:

```
npm install
```

3. Run the following command to start the Nodejs application:

```
npm start // start the application
```

The backend server will run on `http://localhost:8080`.

### II. Frontend

1. Navigate to the `./frontend` directory

```
cd frontend
```

2. Install the dependencies using the following command:

```
npm install
```

3. Start the development server using the following command:

```
npm start
```

The frontend application will run on `http://localhost:3000`.

## III. Database

1. Download SQL from website: <a href="https://www.sqlite.org/download.html">SQL download</a>
2. Download SQL studio from website: <a href="https://sqlitestudio.pl/">SQL Studio download</a>
3. Run SQL Studio and open the database `./backend/userData.db`.

## IV. Usage

1.  Open a web browser and navigate to `http://localhost:3000`.
2.  Register a new user account by clicking the "Register" link and filling out the registration form.
3.  Log in using the registered account credentials by clicking the "Login" link and filling out the login form.
4.  Log out by clicking the "Logout" button.
5.  The user's profile information is displayed in the homepage.
6.  You can update your information such as your name, username or password.
    **Note:** For users with admin privileges, they can access the dashboard page to delete other user accounts without admin permission.
    ```
    Admin account:
        username: admin
        password: 123456
    ```
