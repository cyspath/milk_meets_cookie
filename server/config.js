// hold Application secret and config

module.exports = {
  "development": {
    jwtSecret: 'localhostjwt',
    "username": "root",
    "password": "2666",
    "database": "snorlax",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    jwtSecret:  process.env.JWT_SECRET,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host":     process.env.DB_HOST,
    "port":     process.env.DB_PORT,
    "dialect": "mysql"
  },
  "test": {
    jwtSecret: 'localhostjwt',
    "username": "root",
    "password": "2666",
    "database": "test",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  }
};
