import { useState } from "react";
import api from "../../services/api";

function StudentFeedback() {
  const [text, setText] = useState("");

  const student = JSON.parse(localStorage.getItem("student"));

  const submit = async () => {
    try {
      const res = await api.post(
        "/student/feedback/",
        { 
          text,
          studentId: student._id 
        }
      );
      
      alert(res.data.message);
      setText("");
    } catch (err) {
      console.log(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="mt-3">
      <h5>Submit Feedback</h5>

      <textarea 
        className="form-control mt-3" 
        rows="4"
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback..."
      />

      <button className="btn btn-primary mt-3" onClick={submit}>
        Submit
      </button>
    </div>
  );
}

export default StudentFeedback;
