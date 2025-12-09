import React, { useState, useEffect } from "react";
import api from "../../services/api";

function ComplaintManagement() {
  const [complaints, setComplaints] = useState([]);
  const [active, setActive] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/complaints");
      setComplaints(res.data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

  const openReply = (complaint) => {
    setActive(complaint);
    setText(complaint.reply || "");
  };

  const sendReply = async () => {
    try {
      const res = await api.put(`/admin/complaints/reply/${active._id}`, {
        reply: text,
      });

      alert(res.data.message);
      setActive(null);
      setText("");
      fetchComplaints(); // refresh
    } catch (err) {
      console.log(err);
      alert("Error sending reply");
    }
  };

  return (
    <div>
      <h5 className="mb-3">Student Complaints</h5>

      <div className="list-group">
        {complaints.map((c) => (
          <div key={c._id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{c.studentId?.name}</strong>
              <small className="text-muted">
                {new Date(c.createdAt).toLocaleDateString()}
              </small>
            </div>

            <p className="mb-1">{c.text}</p>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => openReply(c)}
              >
                Reply
              </button>

              {c.reply && (
                <span className="badge bg-success align-self-center">
                  Replied
                </span>
              )}
            </div>

            {c.reply && (
              <div className="mt-2">
                <small className="text-muted">Reply: {c.reply}</small>
              </div>
            )}
          </div>
        ))}
      </div>

      {active && (
        <div className="card mt-3 p-3">
          <h6>Reply to {active.studentId?.name}</h6>

          <textarea
            className="form-control mb-2"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="d-flex gap-2">
            <button className="btn btn-primary" onClick={sendReply}>
              Send Reply
            </button>

            <button className="btn btn-secondary" onClick={() => setActive(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComplaintManagement;
