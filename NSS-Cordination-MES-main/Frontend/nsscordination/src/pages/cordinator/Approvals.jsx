import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Alert, Row, Col, Image } from "react-bootstrap";
import api from "../../services/api";

function ApproveStudents() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ✅ Fetch All Students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/cordinator/allpending");
      setStudents(res.data.students || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Open Modal With Details
  const viewDetails = (student) => {
    setSelected(student);
    setShowModal(true);
  };

  // ✅ Approve Student
  const handleApprove = async (student) => {
    if (!student?.commonKey?._id) {
      return alert("Invalid student data!");
    }

    try {
      await api.put(`/cordinator/approve/${student.commonKey._id}`);
      setAlert({
        show: true,
        message: "Student approved successfully!",
        variant: "success",
      });
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Approval failed!",
        variant: "danger",
      });
    }
  };

  // ✅ Reject Student
  const handleReject = async (student) => {
    if (!student?.commonKey?._id) {
      return alert("Invalid student data!");
    }

    try {
      await api.put(`/cordinator/reject/${student.commonKey._id}`);
      setAlert({
        show: true,
        message: "Student rejected!",
        variant: "danger",
      });
      setShowModal(false);
      fetchStudents();
    } catch (error) {
      console.log(error);
      setAlert({
        show: true,
        message: "Rejection failed!",
        variant: "danger",
      });
    }
  };

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary fw-semibold">Approve / Reject Students</h5>
      </div>

      {/* ✅ Alerts */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert({ show: false })}
        >
          {alert.message}
        </Alert>
      )}

      {/* ✅ Students Table */}
      <div className="table-responsive">
        <Table hover bordered>
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Class</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.className}</td>
                  <td>{s.phone}</td>
                  <td>{s.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.commonKey?.status === true
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {s.commonKey?.status === true
                        ? "Verified"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="text-center">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => viewDetails(s)}
                    >
                      View
                    </Button>

                    <Button
                      size="sm"
                      variant="success"
                      className="me-2"
                      onClick={() => handleApprove(s)}
                    >
                      Allow
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleReject(s)}
                    >
                      Deny
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted p-3">
                  No pending student registrations
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* ✅ Student Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <Row>
                <Col md={4} className="text-center">
                  <Image
                    src={
                      selected?.photo
                        ? `http://localhost:8000/uploads/${selected.photo}`
                        : "/default-user.png"
                    }
                    rounded
                    fluid
                    className="border"
                  />
                </Col>

                <Col md={8}>
                  <h5>{selected.name}</h5>
                  <p><strong>Class:</strong> {selected.className}</p>
                  <p><strong>DOB:</strong> {selected.dob}</p>
                  <p><strong>Gender:</strong> {selected.sex}</p>
                  <p><strong>Caste:</strong> {selected.caste}</p>
                  <p><strong>Aadhar:</strong> {selected.aadhar}</p>
                  <p><strong>Blood:</strong> {selected.blood}</p>
                  <p><strong>Phone:</strong> {selected.phone}</p>
                  <p><strong>Email:</strong> {selected.email}</p>
                  <p><strong>Reg Year:</strong> {selected.regYear}</p>
                  <p><strong>Address:</strong> {selected.address}</p>
                  <p><strong>Talents:</strong> {selected.talents || "-"}</p>
                  <p><strong>Interests:</strong> {selected.interests || "-"}</p>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={() => selected && handleApprove(selected)}>
            Allow
          </Button>
          <Button variant="danger" onClick={() => selected && handleReject(selected)}>
            Deny
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ApproveStudents;
