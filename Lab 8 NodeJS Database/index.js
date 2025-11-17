import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
const app = express();
import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const conn = mysql.createConnection({
  host: "mysql1-p2.ezhostingserver.com",
  database: "citdemo",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
conn.connect((err) => {           // can move this into app.get and send
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  const sql = 'SELECT * FROM students';
  conn.query(sql, function (err, result) {
    if (err) throw err;

    console.log(result);
  });

  console.log("Connected!");
});
const sql = 'SELECT * FROM users';
conn.query(sql, function (err, result) {
  if (err) throw err;

  console.log(result);
});
const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT NOT NULL AUTO_INCREMENT,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    );
  `;
conn.query(createTableSql, (err, result) => {
  if (err) {
    console.error("ERROR CREATING TABLE:", err);
    return;
  }
  console.log("Table 'users' is ready.");
});

app.use(express.urlencoded({ extended: true }));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/form.html');


});


app.get('/new', function (req, res) {
  res.sendFile(__dirname + '/new.html');
});
app.get('/forgot', function (req, res) {
  res.sendFile(__dirname + '/forgot.html');
});
app.post('/submit', function (req, res) {
  const sql = 'SELECT * FROM students WHERE firstname =? OR lastname = ?';
  console.log("Form contents: " + req.body.firstname + req.body.lastname);
  conn.query(sql, [req.body.firstname, req.body.lastname], function (err, result) {
    if (err) throw err;
    if (result.length == 0) { res.send("no result"); }
    else {
      console.log(result);
      res.send(result);
    }
  });
});


app.post('/insert', function (req, res) {
  const sql = 'INSERT into users (username, email) VALUES (?, ?)';
  console.log("Form contents: " + req.body.username + req.body.email);

  conn.query(sql, [req.body.username, req.body.email], function (err, result) {
    if (err) {
      console.error("Error inserting data:", err);
      res.send("Error inserting data.");
      return;
    }
    console.log(result);
    res.send("User added successfully!");
  });
});


app.post('/get-password', function (req, res) {

  const sql = 'SELECT password FROM users WHERE email = ?';

  console.log("Looking up password for: " + req.body.email);

  conn.query(sql, [req.body.email], function (err, result) {
    if (err) {
      console.error("Error looking up password:", err);
      res.send("An error occurred.");
      return;
    }


    if (result.length == 0) {
      res.send("No account found with that email.");
    }
    else {

      console.log(result);
      res.send("Your password is: " + result[0].password);
    }
  });
});

app.listen(8080);

