Welcome to our Recipe Book App, where culinary delights await you at every swipe! Whether you're a seasoned chef or just starting your culinary journey, our app is your passport to a world of flavors, aromas, and tantalizing tastes. Dive into a treasure trove of recipes meticulously curated to inspire your inner chef and tantalize your taste buds. From mouthwatering mains to delectable desserts, we've got something for every craving and occasion. Get ready to embark on a culinary adventure like no other, where every recipe is a story waiting to be told and every dish a masterpiece waiting to be created. Join us as we journey through the art of cooking and savor the magic of flavors that bring people together. Welcome to your new kitchen companion – let's start cooking!

![dietapp schema](./images/Screenshot%202024-03-22%20at%209.19.01 AM.png)

HOW TO RUN 
------------------------------------
```bash
  npm run build 
  psql < data.sql
  npm run start
```

# React Project Setup Guide

This guide outlines the steps to set up a React project for building a recipe book application.

## Project Setup

1. Navigate to your desktop.
2. Right-click and create a new folder named `project`.
3. Open Visual Studio Code.
4. Open the integrated terminal in Visual Studio Code.
5. Run `npx create-react-app recipe-book` in the terminal to initialize a new React project.
6. Change directory into the newly created `recipe-book` folder.
7. Start the development server with `npm start`.
8. To stop the development server, use `CTRL+C` in the terminal.

## Initial Configuration

1. Navigate to the `src` folder within your project.
2. Delete the following files: `App.css`, `app.test.js`, `logo.svg`, `reportWebVitals.js`, and `setupTests.js`.
3. Open `index.js` and replace its content with the provided code snippet.

```jsx 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);
```
4. Open `App.js` and replace its content with the provided code snippet.
```jsx
const App = () => {
  return (
    <div className="App">
      <p>test</p>
    </div>
  );
}

export default App;
```
## Client-Server Structure

1. Create two folders named `client` and `server` within the `project` folder.
2. Move the following items into the `client` folder: `node_modules`, `public`, `src`, `.gitignore`, `package-lock.json`, `package.json`, and `README.md`.
3. Open the terminal in Visual Studio Code and navigate to the `server` folder.
4. Initialize a new Node.js project with `npm init`.
5. Navigate back to the root `project` folder.
6. Open `package.json` in the `project` folder and replace its content with the provided code snippet.

## Server Setup

1. Install required packages by running `npm i if-env` in the terminal from the `project` folder.
2. Navigate to the `server` folder and create a new file named `server.js`.
3. Open `package.json` in the `server` folder and update its content with the provided code snippet.
```jsx
{
  "name": "server",
  "version": "1.0.0",
  "description": "'server side'",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js",
    "deploy": "node server.js",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.1",
    "jsonwebtoken": "^9.0.2",
    "nodemon": "^3.1.0",
    "pg": "^8.11.3",
    "uuid": "^9.0.1"
  }
}
```

## Client Setup

1. Navigate to the `client` folder and open `package.json`.
2. Replace its content with the provided code snippet.
```jsx
{
  "name": "recipe-book",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "dotenv": "^16.4.5",
    "react": "^18.2.0",
    "react-cookie": "^7.1.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
3. Open the terminal and navigate to the `client` folder.
4. Type `npm i react-cookie dotenv` and press Enter to install the required packages.
5. Start the client application with `npm start`.

## Components Folder

1. Within the `client/src` folder, create a new folder named `components`.

## Installing Additional Packages

1. Navigate to the `server` folder.
2. From the root `project` folder, navigate to `recipe-book/server`.
3. Install necessary packages using `npm i express cors bcrypt jsonwebtoken uuid dotenv nodemon pg`.

## DONE SETUP

## COMMANDS FOR NPM

- npm start

  - Starts the development server.

- npm run build

  - Bundles the app into static files for production.

- npm test

  - Starts the test runner.

- npm run eject

  - Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

- We suggest that you begin by typing:
  - cd recipe-book
  - npm start

NPM COMMANDS
------------------------------------
* npm start:
  - Starts the development server.

* npm run build:
  - Bundles the app into static files for production.

* npm test:
  - Starts the test runner.

* npm run eject:
  - Removes this tool and copies build dependencies, configuration files
  - and scripts into the app directory. If you do this, you can’t go back!

* We suggest that you begin by typing:
  - cd dietmate
  - npm start

* troubleshoot database
  - SELECT * FROM pg_roles WHERE rolname = 'admin';
  - SELECT datname, rolname, datdba FROM pg_database;
  - GRANT SELECT ON TABLE diet TO admin;
  - GRANT SELECT ON TABLE recipes TO admin;
  - GRANT SELECT ON TABLE users TO admin;


HOW API WORKS
------------------------------------
The recipe ID is stored in the database when a user adds a recipe. When the user calls for a recipe, it is passed into the API variable to display relevant information to the user freeing up space int the database.

WHERE THIS SITE IS DEPLOYED
------------------------------------
This is not deployed, heroku charges for database and site hosting

WHAT THIS APP DOES
------------------------------------
Add recipes, select a dietary type, and save them for later viewing to access relevant information. These features was use to make it easy for the user simple and effective navigation

TECHNOLOGY STACK USED
------------------------------------
* postgres
* express
* css
* node# stage-two
# stage-two
