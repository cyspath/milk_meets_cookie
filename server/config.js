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
    "username": process.env.RDS_USERNAME,
    "password": process.env.RDS_PASSWORD,
    "database": process.env.RDS_DB_NAME,
    "host":     process.env.RDS_HOSTNAME,
    "port":     process.env.RDS_PORT,
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
