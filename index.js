const express = require('express');
const app = express();
const Port = process.env.PORT || 5000;
require('dotenv').config();
const mysql = require('mysql2');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));


// Creating database pool
const optiven_clearance_pool = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'optiven_clearance_s',
    waitForConnections: true,
     connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,
  });
  
  // Check database connection
  optiven_clearance_pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error in connecting to the database", err.message);
    } else {
      console.log('Connected to the database');
      connection.release();
    }
  });
  

// Import optiven_clearance routes
const employees = require('./routes/optiven_clearance/employees.routes');
const users = require('./routes/optiven_clearance/users.routes');

app.use('/employees', employees(optiven_clearance_pool));
app.use('/users',users(optiven_clearance_pool));


app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
