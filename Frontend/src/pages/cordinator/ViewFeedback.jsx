import React, { useEffect, useState } from "react";

import { Card, Table, Spinner } from "react-bootstrap";
import api from "../../services/api";

function ViewFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await api.get("/cordinator/viewfeedback");
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="shadow p-4">
      <h4 className="text-primary fw-semibold mb-3">Student Feedback</h4>

      {feedbacks.length === 0 ? (
        <div className="text-center text-muted p-4">
          <Spinner animation="border" />  
          <p className="mt-2">Loading feedback...</p>
        </div>
      ) : (
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Student</th>
              <th>Class</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((fb, i) => (
              <tr key={fb._id}>
                <td>{i + 1}</td>
                <td>{fb.studentId?.name}</td>
                <td>{fb.studentId?.className}</td>
                <td>{fb.studentId?.email}</td>
                <td>{fb.feedback}</td>
                <td>{new Date(fb.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Card>
  );
}

export default ViewFeedback;
