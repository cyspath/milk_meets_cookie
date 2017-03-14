# Milk Meets Cookie

used:
axios ajax call
redux-promise

http://beatscodeandlife.ghost.io/react-socket-io-part-i-real-time-chat-application/
https://github.com/antoinfive/react-chat/blob/master/tools/server.js
https://github.com/SophieDeBenedetto/react-redux-starter-kit/blob/master/package.json

to be used?
chat/socket/redux/express http://beatscodeandlife.ghost.io/react-socket-io-part-i-real-time-chat-application/

Forms: http://demo.tutorialzine.com/2015/07/7-clean-and-responsive-forms/
redux thunk: https://github.com/gaearon/redux-thunk  use function instead of norma obj when returning from an redux action for async
architecture http://docs.sequelizejs.com/en/1.7.0/articles/express/

fa icons: http://fontawesome.io/icons/

GOOD READS TO LEARN:
- jwt https://blog.jscrambler.com/implementing-jwt-using-passport/

run mongodb on windos"
"C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
run schema sql script `mysql -u root < db/schema.sql`

prefetching:

One thing ORMs are usually good at is minimizing queries. Sequelize offers a prefetching feature, allowing to group two queries in a single one using a JOIN. For instance, if you want to retrieve a Task together with the related User, write the query as follows:

Task.find({ where: { id: id } }, include: ['User'])
  .error(function(err) {
    // error callback
  })
  .success(function(task) {
    task.getUser(); // does not trigger a new query
  });

## Features

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
