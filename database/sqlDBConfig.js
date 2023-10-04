const mysql = require("mysql2");

// Create DB Connection
const createSQLDBConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.NEXT_PUBLIC_SQL_DB_HOST,
    user: process.env.NEXT_PUBLIC_SQL_DB_USER,
    password: process.env.NEXT_PUBLIC_SQL_DB_PASSWORD,
    database: process.env.NEXT_PUBLIC_SQL_DB_DATABASE,
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL server: " + err.stack);
      return;
    }

    console.log("Connected to MySQL server.");
  });

  return connection;
};

// Close DB Connection
const closeSQLDBConnection = (connection) => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection: " + err.stack);
      return;
    }

    console.log("MySQL connection closed.");
  });
};

export { createSQLDBConnection, closeSQLDBConnection };
