# Survey App - Full Stack Web Development Project

## Overview

A full stack web application for creating, answering and managing surveys. Developed as part of the University of Helsinki full stack web development project course.

#### Main features:

- User authentication (sign up, log in, account management)
- Create, respond to, close and delete surveys
- Different question types: multiple choice, checkbox, comment box
- View survey results summary
- Sorting surveys (latest, name, time)

## Tech stack

- **Frontend:** React, Redux, CSS
- **Backend:** Node.js, Express, REST API
- **Database:** MongoDB
- **Testing:** Robot Framework

## Documentation

- [Development log](documentation/development-log.md)
- [Testing](documentation/testing.md)
- [User guide](documentation/user-guide.md)

## How to use

To clone and run this application, you'll need to have both [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) (which comes with [npm](https://www.npmjs.com/)) installed on your computer. From your terminal:

```
# Clone this repository and go to the project directory
$ git clone https://github.com/jarkmaen/fs-survey-app.git
$ cd fs-survey-app

# Install frontend dependencies
$ cd survey-app-frontend
$ npm install

# Install backend dependencies
$ cd ../survey-app-backend
$ npm install

# Create a .env file in the backend directory with the following:
JWT_SECRET=<your_jwt_secret>
MONGODB_URI=<your_mongodb_uri>
PORT=3001

# Start the backend
$ npm start

# Open another terminal and start the frontend
$ cd survey-app-frontend
$ npm run dev
```

Once both are running, open http://localhost:5173 in your browser.

## Screenshots

| Home page                                        | Creating a survey                                            | Viewing survey results                                       |
| ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![Home page](documentation/images/home_page.png) | ![Survey creation](documentation/images/survey_creation.png) | ![Survey results](documentation/images/survey_results_1.png) |
