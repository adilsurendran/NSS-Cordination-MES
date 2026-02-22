import React, { useState } from "react";
import api from "../../services/api";
import { useEffect } from "react";

function StudentList() {
  const [students,setStudents] = useState([]);
  const [query, setQuery] = useState("");

  const filtered = students.filter(s => s.name.toLowerCase().includes(query.toLowerCase()));

  const getstudents = async()=>{
    try{
      const res = await api.get('/admin/students')
      console.log(res);
      setStudents(res.data.students)
      
    }
    catch(e){
      console.log(e);
      
    }
  }

  useEffect(()=>{getstudents()},[])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Student List</h5>
        <input className="form-control w-25" placeholder="Search by name or roll" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr><th>Name</th><th>Phone</th><th>Department</th><th>Email</th><th>DOB</th><th>Blood</th></tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.phone}</td>
                <td>{s.className}</td>
                <td>{s.email}</td>
                <td>{s.dob}</td>
                <td>{s.blood}</td>
                {/* <td>
                  <button className="btn btn-sm btn-outline-primary me-2">View</button>
                  <button className="btn btn-sm btn-outline-secondary">Edit</button>
                </td> */}
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan="4" className="text-center">No students found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;
