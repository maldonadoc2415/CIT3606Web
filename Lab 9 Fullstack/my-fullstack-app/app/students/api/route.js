import mysql from "mysql2/promise";
export const dynamic = 'force-dynamic';

export async function GET(req) {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const lastname = searchParams.get("lastname");
  let students;
  if (lastname) 
      students = await getStudentByName(lastname); 
  else  
      students = await getStudents();
  return Response.json(students);


  console.log("students: " + JSON.stringify(students));
  return Response.json(students);
};


async function getStudents() {
  const connection = await mysql.createConnection({
    host: "mysql1-p2.ezhostingserver.com",
    database: "citdemo",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  const sql = "SELECT * FROM Students";
  const [rows] = await connection.execute(sql);
  await connection.end();
  return rows;
};


async function getStudentByName(lastname) {
  const connection = await mysql.createConnection({
    host: "mysql1-p2.ezhostingserver.com",
    database: "citdemo",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  let sql = "SELECT * FROM Students WHERE lastname = ?";
  let params = [lastname];
  const [rows] = await connection.execute(sql, params);
  await connection.end();
  return rows;
};
