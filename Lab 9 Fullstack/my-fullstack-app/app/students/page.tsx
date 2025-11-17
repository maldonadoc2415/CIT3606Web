"use client";
import { useEffect, useState } from "react";
export default function Students() {
  const [students, setStudents] = useState([]);
  const [lastname, setLastname] = useState("");
  async function fetchStudents(lastname?: string) {
     let url;
    if (lastname) 
        url = "/students/api?lastname=" + encodeURIComponent(lastname);
    else 
        url = "/students/api";

    
    const res = await fetch(url);
    const data = await res.json();
    setStudents(data);
  }
  useEffect(() => {
    fetchStudents();

  }, []);   
function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    fetchStudents(lastname);
  }

   return (
    <div>
      <div> <main className="h-screen"> 
        <h1 className="font-bold text-2xl">Students</h1> 
         <form onSubmit={handleSubmit}>
          Search by Last Name:
          <input type="text"   name="lastname"  
             className="border mr-2 bg-white" 
             onChange={(e) => setLastname(e.target.value)}  /> 
          <button type="submit" className="bg-blue-500 px-2 py-2">
             Submit       
          </button>
      </form>
    
        <ul className="list-disc pl-5">
            {students.map((s: any) => (
        <li key={s.studentid}> 
              Name: {s.firstname} {s.lastname}     
        </li>        
         ))} 
      </ul>      
     </main>     
     </div>


   </div>
  ); }

