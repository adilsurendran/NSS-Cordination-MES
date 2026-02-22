import { useState, useEffect } from "react";
import api from "../../services/api";

function StudentComplaint() {
  const [text, setText] = useState("");
  const [complaints, setComplaints] = useState([]);

    const student = JSON.parse(localStorage.getItem("student"));


  const fetchComplaints = async () => {
    try{
    const res = await api.get(`/student/complaints/${student._id}`);
    setComplaints(res.data.complaints);
    console.log(res);
    }
    catch(e){
      console.log(e);
      
    }
    
  };

  const submit = async () => {
    try{
   const res = await api.post("/student/complaint", { text, studentId: student._id  });
    // fetchComplaints();
    setText("");
    console.log(res);
    }
    catch(e){
      console.log(e);
      
    }

  };

  useEffect(() => { fetchComplaints(); }, []);
  // console.log(text);
  

  return (
    <div>
      <h5 className="mt-3">Send Complaint</h5>

      <textarea className="form-control mt-3" rows="4"
        value={text} onChange={(e)=>setText(e.target.value)}
        placeholder="Write your complaint..." />

      <button className="btn btn-primary mt-3" onClick={submit}>Submit</button>

      <h6 className="mt-4">Your Complaints & Replies</h6>
      <ul className="list-group mt-2">
        {complaints.map(c => (
          <li className="list-group-item" key={c._id}>
            <strong>Complaint:</strong> {c.text} <br />
            <strong>Reply:</strong> {c.reply ?? "No reply yet"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentComplaint;
