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
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res){
   res.sendFile(__dirname + '/form.html');


});
app.get('/new', function(req, res){
   res.sendFile(__dirname + '/new.html');
});
app.post('/submit', function(req, res){
  const sql = 'SELECT * FROM students WHERE firstname =? OR lastname = ?';
  console.log("Form contents: " + req.body.firstname + req.body.lastname);
  conn.query(sql, [req.body.firstname,req.body.lastname], function (err, result) {
    if (err) throw err;
    if (result.length == 0)  { res.send("no result"); }
    else {  console.log(result);
               res.send(result);
   }  }  );
}); 
app.post('/insert', function(req, res){
  const sql = 'INSERT into students WHERE firstname =? OR lastname = ?';
  console.log("Form contents: " + req.body.firstname + req.body.lastname);
  conn.query(sql, [req.body.firstname,req.body.lastname], function (err, result) {
    if (err) throw err;
    if (result.length == 0)  { res.send("no result"); }
    else {  console.log(result);
               res.send(result);
   }  }  );
}); 







app.listen(8080);

