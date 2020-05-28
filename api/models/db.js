const mysql = require("mysql");
const dbConfig = require("../../config/sql.config");

let connection = null;

/**
 * The function to run in case of a connection error to DB
 *
 * @param {Error} err - An error object captured from mysql module
 * @param {dbConfig} config - Database configuration object to be used in mysql.connect() function
 * @param {number} retryMs - The amount of time to wait before connection retry
 */
function onError(err, config, retryMs) {
  console.log(
    new Date().toLocaleTimeString(),
    `mysql-error: retrying in ${retryMs}ms,`,
    "error message:",
    err.message
  );

  setTimeout(() => {
    console.log(new Date().toLocaleTimeString(), "mysql retrying connection");
    getConnection(config, retryMs);
  }, retryMs);
}

/**
 * Get a connection to db and handle connection error
 *
 * @param {Error} err - An error object captured from mysql module
 * @param {dbConfig} config - Database configuration object to be used in mysql.connect() function
 * @param {number} retryMs - The amount of time to wait before connection retry
 */
function onConnect(err, config, retryMs) {
  if (err) {
    onError(err, config, retryMs);
    return;
  }

  console.log("mysql connection was established");
}

/**
 * Try to connect to the DB and set events handlers
 *
 * @param {dbConfig} config - Database configuration object to be used in mysql.connect() function
 * @param {number} retryMs - The amount of time to wait before connection retry
 */
function getConnection(config, retryMs = 10000) {
  connection = mysql.createConnection(config);

  connection.connect((err) => {
    onConnect(err, config, retryMs);
  });

  connection.on("error", (err) => {
    onError(err, config, retryMs);
  });
}

// initialize connection to DB
getConnection(dbConfig, 2000);

module.exports = connection;
