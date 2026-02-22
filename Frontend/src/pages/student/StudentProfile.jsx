import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Spinner } from "react-bootstrap";

function StudentProfile() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("student"));
    setData(student);
  }, []);

  if (!data) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="shadow p-4">
      <h4 className="text-primary fw-semibold mb-3">My Profile</h4>

      <Row>
        <Col md={4} className="text-center">
          <Image
                src={
                data.photo
                    ? `http://localhost:8000/uploads/${data.photo}`
                    : "/default-user.png"
                }
            rounded
            fluid
            className="border"
          />
        </Col>

        <Col md={8}>
          <h5 className="fw-bold">{data.name}</h5>
          <p><strong>Class:</strong> {data.className}</p>
          <p><strong>Date of Birth:</strong> {data.dob}</p>
          <p><strong>Gender:</strong> {data.sex}</p>
          <p><strong>Caste:</strong> {data.caste}</p>
          <p><strong>Aadhar:</strong> {data.aadhar}</p>
          <p><strong>Blood Group:</strong> {data.blood}</p>
          <p><strong>Reg Year:</strong> {data.regYear}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Height:</strong> {data.height} cm</p>
          <p><strong>Weight:</strong> {data.weight} kg</p>
          <p><strong>Address:</strong> {data.address}</p>
          <p><strong>Talents:</strong> {data.talents || "-"}</p>
          <p><strong>Interests:</strong> {data.interests || "-"}</p>
        </Col>
      </Row>
    </Card>
  );
}

export default StudentProfile;
