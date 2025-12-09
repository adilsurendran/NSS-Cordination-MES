import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";

function StudentPerformance() {
  const [performance,setPerformance] = useState([]);

  const getperformance = async()=>{
    try{
      const res = await api.get('/admin/performance')
      console.log(res);
      setPerformance(res.data.performance) 
    }
    catch(e){
      console.log(e);
    }
  }

  useEffect(()=>{getperformance()},[])
  // console.log(performance);
  
  return (
    <div>
      <h5 className="mb-3">Student Performance</h5>

      {/* <div className="row mb-3">
        {performance.map(p => (
          <div className="col-md-4 mb-3" key={p.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h6 className="card-title">{p.name}</h6>
                <p className="mb-1">Events participated: <strong>{p.events}</strong></p>
                <p className="mb-0">Performance score: <strong>{p.points}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table mb-0">
          <thead><tr><th>#</th><th>Name</th><th>Class</th><th>Participation Level</th><th>Remarks</th><th>Attendence</th></tr></thead>
          <tbody>
            {performance.map((p, idx) => (
              <tr key={p._id}><td>{idx+1}</td><td>{p.studentId.name}</td><td>{p.studentId.className}</td><td>{p.participationLevel}</td><td>{p.remarks}</td><td>{p.attendance}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentPerformance;

