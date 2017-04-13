# Milk Meets Cookie [Live Link](http://milk-meets-cookie-dev.us-west-1.elasticbeanstalk.com)

![Home Page screenshot](https://github.com/cyspath/milk_meets_cookie/blob/development/misc/screenshots/home1.PNG)

## Features
* Real time online status and notification update
* Chat feature made with socket.io, mimicking facebook style chat yet with better user UI experience via chatbox focusing/notification updating
* implemented online indicator UI & used debouncing to prevent repeated emit calls such as users going online/offline for scalability

### Authenication

* Customed authenication using local username & password and passport-jwt strategies
* ReduxForm 6.5.0 combined with React-Widgets used for a smooth flow and intuitive form validations

### Home Page

* Dynamic UI for both desktop and mobile views
* A cool search box, with searchable columns indexed
* "Like" functionality
* Chatting functionality


## Tech Stack

### Front-End

* [React](https://facebook.github.io/react/) along with [Redux](https://github.com/reactjs/redux) for rendering page views state container maintenance
* [Bootstrap](http://getbootstrap.com/) - a mobile first front-end framework

### Back-End

* [Node.js](https://nodejs.org/en/) with [Express](http://expressjs.com/) for serving pages and handling internal api requests
* [Socket.io](https://socket.io/get-started/chat/) enables real-time bidirectional event-based communication (chat portion)
* [mySQL](https://www.mysql.com/) as a database
* [Sequelize](http://sequelizejs.com/) - an ORM for Node.js
* [passport-jwt](https://github.com/themikenicholson/passport-jwt) - a Passport strategy for authenticating with a JSON Web Token

### Testing

<!-- * [Mocha](https://mochajs.org/) - test framework
* [Shouldjs](https://shouldjs.github.io/) and [Supertest](https://github.com/visionmedia/supertest) for API tests -->

### Dev/Build Tools

<!-- * [Webpack](https://webpack.github.io/) and [Babel](https://babeljs.io/) for transpiling -->

## File Structure

    app/
    |
    |--bin/
    |   |--www
    |   |
    |--client/
    |   |--actions/
    |   |--components/
    |   |--modules/
    |   |--reducers/
    |   |--stylesheets/
    |   |
    |--public/
    |   |--fonts/
    |   |--images/
    |   |--index.html
    |   |
    |--server/
    |   |--controllers/
    |   |--db/
    |   |--migrations/
    |   |--models
    |   |--routes/
    |   |--services/


## Installing Dependencies

- Dependencies installation

```
$ npm install
```

## Starting the App

From the root directory:
run ```npm start``` to start the server
run ```npm run watch``` to start the webpack compiler

Navigate to ```http://localhost:3000```

## Deployment (AWS elasticbeanstalk)
Follow this [tutorial](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html) to deploy
