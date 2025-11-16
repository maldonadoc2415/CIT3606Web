
const express = require('express'); 
const app = express();
app.get('/', function(req, res){
   res.send(
    "<input type='text' value='Hello World from NodeJS and MySQL Database!' /><button"
  
    + " onclick='alert(document.querySelector(\"input\").value)'>Click Me!</button>"
    );
});
app.listen(8080);

const mysql = require('mysql');
require('dotenv').config();               
const conn = mysql.createConnection({
  host: "mysql1-p2.ezhostingserver.com",
  database: "citdemo",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
conn.connect((err) => {           // can move this into app.get and send
  if (err) throw err;
  console.log("Connected!");
});
