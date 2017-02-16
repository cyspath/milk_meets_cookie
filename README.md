# 情有可缘

used:
axios ajax call
sparkline
redux-promise

to be used?
Forms: http://demo.tutorialzine.com/2015/07/7-clean-and-responsive-forms/
redux thunk: https://github.com/gaearon/redux-thunk  use function instead of norma obj when returning from an redux action for async
db framework:https://blog.ragingflame.co.za/2014/7/21/using-nodejs-with-mysql
architecture http://docs.sequelizejs.com/en/1.7.0/articles/express/

fa icons: http://fontawesome.io/icons/

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


Voice-activated music player, which provides variety of useful information for every song that plays.

## Tech Stack

### Front-End

* [React](https://facebook.github.io/react/) along with [Redux](https://github.com/reactjs/redux) for rendering page views state container maintenance
* [D3.js](https://d3js.org/) - library for visualizing data
* [Bootstrap](http://getbootstrap.com/) - a mobile first front-end framework

### Back-End

* [Node.js](https://nodejs.org/en/) with [Express](http://expressjs.com/) for serving pages and handling api requests
* [mySQL](https://www.mysql.com/) as a database
* [Sequelize](http://sequelizejs.com/) - an ORM for Node.js
* [Annyang](https://talater.com/) - SpeechRecognition library

### Testing

* [Mocha](https://mochajs.org/) - test framework
* [Shouldjs](https://shouldjs.github.io/) and [Supertest](https://github.com/visionmedia/supertest) for API tests

### Dev/Build Tools

* [Webpack](https://webpack.github.io/) and [Babel](https://babeljs.io/) for transpiling

## File Structure

    hackify/
    |
    |--db/
    |   |--schema
    |   |
    |--public/
    |   |--assets/
    |   |--styles/
    |   |
    |--spec/
    |   |--client/
    |   |--server/
    |   |
    |--server/
    |   |--helpers
    |   |
    |--src/
    |   |--components/
    |   |--modules/
    |   |--redux/
    |   |--visualization/

## Installing Dependencies

- Mocha for testing

```
$ npm install mocha -g
```

- Webpack for building

```
$ npm install webpack -g
```

- Dependencies installation

```
$ npm install
```

## Starting the App

From the root directory, run ```npm start``` to start the server
Navigate to ```http://localhost:8080```

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for guidelines.

## License

MIT
