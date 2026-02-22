import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Button, Form, Table, Spinner, Badge } from "react-bootstrap";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";

function Attendance() {
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);

  // ----------------------------------------
  // LOAD ALL EVENTS
  // ----------------------------------------
  const fetchEvents = async () => {
    const res = await api.get("/cordinator/eventsall");
    setEvents(res.data.events);
  };

  // ----------------------------------------
  // LOAD ALL VERIFIED STUDENTS
  // ----------------------------------------
  const fetchStudents = async () => {
    const res = await api.get("/cordinator/studentsall");
    setStudents(res.data.students);
  };

  useEffect(() => {
    fetchEvents();
    fetchStudents();
  }, []);

  // ----------------------------------------
  // LOAD EXISTING ATTENDANCE FOR EVENT
  // ----------------------------------------
  useEffect(() => {
    if (!selectedEvent) return;

    const loadAttendance = async () => {
      setLoadingAttendance(true);
      const res = await api.get(`/cordinator/attendance/${selectedEvent}`);

      const present = {};
      res.data.presentStudents.forEach((id) => {
        present[id] = true;
      });

      setAttendance(present);
      setLoadingAttendance(false);
    };

    loadAttendance();
  }, [selectedEvent]);

  // ----------------------------------------
  // TOGGLE PRESENT/ABSENT
  // ----------------------------------------
  const toggleAttendance = (stdId) => {
    setAttendance((prev) => ({
      ...prev,
      [stdId]: !prev[stdId],
    }));
  };

  // ----------------------------------------
  // SUBMIT ATTENDANCE
  // ----------------------------------------
  const submitAttendance = async () => {
    if (!selectedEvent) return alert("Select an event first!");

    const presentStudents = Object.keys(attendance).filter(
      (id) => attendance[id] === true
    );

    try {
      setLoading(true);

      await api.post("/cordinator/attendance/update", {
        eventId: selectedEvent,
        presentStudents,
      });

      alert("Attendance Updated Successfully!");
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Error updating attendance");
      setLoading(false);
    }
  };

  

  return (
    <Card className="p-4 shadow-lg border-0 rounded-4">
      <h3 className="fw-bold text-primary mb-4">📋 Attendance Management</h3>

      {/* EVENT SELECT */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-semibold fs-5">Select Event</Form.Label>
        <Form.Select
          className="py-2"
          value={selectedEvent}
          onChange={(e) => setSelectedEvent(e.target.value)}
        >
          <option value="">Choose an Event</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.name} — {ev.date} ({ev.place})
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* STUDENT LIST */}
      <div className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold">Students List</h5>

          {selectedEvent && (
            <Badge bg="info" className="px-3 py-2 fs-6">
              {loadingAttendance
                ? "Loading attendance..."
                : `${Object.keys(attendance).filter((id) => attendance[id])
                    .length} Present`}
            </Badge>
          )}
        </div>

        {students.length === 0 ? (
          <p className="text-muted">No students found.</p>
        ) : (
          <div className="table-responsive">
            <Table bordered hover className="align-middle">
              <thead className="table-primary">
                <tr>
                  <th className="text-center">#</th>
                  <th>Student</th>
                  <th>Class</th>
                  <th>Email</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s, i) => {
                  const isPresent = attendance[s._id] || false;

                  return (
                    <tr key={s._id}>
                      <td className="text-center">{i + 1}</td>
                      <td>
                        <div className="fw-semibold">{s.name}</div>
                        <div className="text-muted small">{s._id}</div>
                      </td>
                      <td>{s.className}</td>
                      <td>{s.email}</td>

                      <td className="text-center">
                        <Button
                          variant={isPresent ? "success" : "outline-secondary"}
                          className="rounded-circle p-2"
                          onClick={() => toggleAttendance(s._id)}
                          style={{ width: "46px", height: "46px" }}
                        >
                          {isPresent ? (
                            <CheckCircleFill size={20} />
                          ) : (
                            <XCircleFill size={20} />
                          )}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <Button
        className="mt-4 py-2 fs-5 fw-semibold w-100"
        disabled={loading || loadingAttendance}
        onClick={submitAttendance}
        variant="primary"
      >
        {loading ? (
          <Spinner animation="border" size="sm" />
        ) : (
          "Save Attendance"
        )}
      </Button>
    </Card>
  );
}

export default Attendance;
