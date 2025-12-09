// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Alert, Table } from "react-bootstrap";
// import api from "../../services/api";


// function StudentPerformanceCORD() {
//   const [students, setStudents] = useState([]);
//   const [show, setShow] = useState(false);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [participation, setParticipation] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

//   // ✅ Fetch all students with attendance
//   const fetchStudents = async () => {
//     try {
//       const res = await api.get("/cordinator/studentsall");
//       setStudents(res.data.students || []);
      
//     } catch (e) {
//       console.error(e);
//       setAlert({
//         show: true,
//         message: "Failed to load students.",
//         variant: "danger",
//       });
//     }
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   console.log(selectedStudent);

//     const fetchData = async () => {
//     try {
//       const res = await api.get(`/student/attendance/${student._id}`);
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Error fetching attendance");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
  

//   // ✅ Open modal for a selected student
//   const handleOpen = (student) => {
//     setSelectedStudent(student);
//     setParticipation("");
//     setRemarks("");
//     setShow(true);
//   };

//   // ✅ Handle submit (add performance)
//   const handleSubmit = async () => {
//     if (!participation) {
//       setAlert({
//         show: true,
//         message: "Please select a participation level.",
//         variant: "warning",
//       });
//       return;
//     }

//     try {
//       const res = await api.post("/cordinator/addperformance", {
//         studentId: selectedStudent._id,
//         participationLevel: participation,
//         remarks,
//       });

//       setAlert({
//         show: true,
//         message: "Performance added successfully ✅",
//         variant: "success",
//       });
//       setShow(false);
//       fetchStudents(); // Refresh list
//     } catch (e) {
//       console.error(e);
//       if (e.response?.data?.message === "Performance already added") {
//         setAlert({
//           show: true,
//           message: "Performance for this student already exists ❌",
//           variant: "danger",
//         });
//       } else {
//         setAlert({
//           show: true,
//           message: "Failed to add performance.",
//           variant: "danger",
//         });
//       }
//     }
//   };

//   return (
//     <div className="bg-white rounded p-4 shadow-sm">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5 className="text-primary fw-semibold">Student Performance</h5>
//       </div>

//       {/* 🔹 Alert Message */}
//       {alert.show && (
//         <Alert
//           variant={alert.variant}
//           dismissible
//           onClose={() => setAlert({ show: false })}
//         >
//           {alert.message}
//         </Alert>
//       )}

//       {/* 🔹 Students Table */}
//       <div className="table-responsive">
//         <Table hover bordered className="align-middle">
//           <thead className="table-light">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Admission year</th>
//               <th>DOB</th>
//               {/* <th>Attendance %</th> */}
//               <th className="text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.length > 0 ? (
//               students.map((std, i) => (
//                 <tr key={std._id}>
//                   <td>{i + 1}</td>
//                   <td>{std.name}</td>
//                   <td>{std.regYear}</td>
//                   <td>{std.dob}</td>
//                   {/* <td>{std.attendance}%</td> */}
//                   <td className="text-center">
//                     <Button
//                       variant="outline-success"
//                       size="sm"
//                       onClick={() => handleOpen(std)}
//                       disabled={std.performanceAdded}
//                     >
//                       {std.performanceAdded ? "Submitted" : "Add Performance"}
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center text-muted">
//                   No students found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>

//       {/* 🔹 Add Performance Modal */}
//       <Modal show={show} onHide={() => setShow(false)} centered backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title>Add Performance</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedStudent && (
//             <div className="mb-3 border p-3 rounded bg-light">
//               <p className="mb-1">
//                 <strong>Name:</strong> {selectedStudent.name}
//               </p>
//               <p className="mb-1">
//                 <strong>Department:</strong> {selectedStudent.department}
//               </p>
//               <p className="mb-0">
//                 <strong>Attendance:</strong> {selectedStudent.attendance}%
//               </p>
//             </div>
//           )}

//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Participation Level</Form.Label>
//               <div>
//                 {["Excellent", "Active", "Average", "Poor"].map((level) => (
//                   <Form.Check
//                     key={level}
//                     inline
//                     type="radio"
//                     name="participation"
//                     label={level}
//                     value={level}
//                     onChange={(e) => setParticipation(e.target.value)}
//                     checked={participation === level}
//                   />
//                 ))}
//               </div>
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Remarks</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 placeholder="Enter remarks..."
//                 value={remarks}
//                 onChange={(e) => setRemarks(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default StudentPerformanceCORD;


import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Table, Spinner } from "react-bootstrap";
import api from "../../services/api";

function StudentPerformanceCORD() {
  const [students, setStudents] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [participation, setParticipation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [attendance, setAttendance] = useState(null);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // ✅ Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/cordinator/studentsall");
      setStudents(res.data.students || []);
    } catch (e) {
      console.error(e);
      setAlert({
        show: true,
        message: "Failed to load students.",
        variant: "danger",
      });
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ✅ Open modal and fetch attendance for selected student
  // const handleOpen = async (student) => {
  //   setSelectedStudent(student);
  //   setParticipation("");
  //   setRemarks("");
  //   setAttendance(null);
  //   setLoadingAttendance(true);
  //   setShow(true);

  //   try {
  //     const res = await api.get(`/student/attendance/${student._id}`);
  //     // Assume your backend sends something like { attendance: 92 }
  //     setAttendance(res.data.attendance || 0);
  //   } catch (err) {
  //     console.error(err);
  //     setAttendance(null);
  //     setAlert({
  //       show: true,
  //       message: "Failed to load attendance for this student.",
  //       variant: "danger",
  //     });
  //   } finally {
  //     setLoadingAttendance(false);
  //   }
  // };

  const handleOpen = async (student) => {
  setSelectedStudent(student);
  setParticipation("");
  setRemarks("");
  setAttendance(null);
  setLoadingAttendance(true);
  setShow(true);

  try {
    const res = await api.get(`/student/attendance/${student._id}`);

    // ✅ Backend returns:
    // { success: true, totalSessions: 10, attended: 9 }

    const { attended, totalSessions } = res.data;

    // ✅ Frontend calculation
    let percentage = 0;
    if (totalSessions > 0) {
      percentage = ((attended / totalSessions) * 100).toFixed(2);
    }

    setAttendance(percentage);
  } catch (err) {
    console.error(err);
    setAttendance(null);
    setAlert({
      show: true,
      message: "Failed to load attendance for this student.",
      variant: "danger",
    });
  } finally {
    setLoadingAttendance(false);
  }
};


  // ✅ Handle submit
  const handleSubmit = async () => {
    if (!participation) {
      setAlert({
        show: true,
        message: "Please select a participation level.",
        variant: "warning",
      });
      return;
    } 
console.log(selectedStudent._id,
         participation,
        remarks,
         attendance);


    try {
      const res = await api.post("/cordinator/addperformance", {
        studentId: selectedStudent._id,
        participationLevel: participation,
        remarks,
        attendance: attendance || 0, // optional, if you want to store it too
      });

      setAlert({
        show: true,
        message: "Performance added successfully ✅",
        variant: "success",
      });
      setShow(false);
      fetchStudents();
    } catch (e) {
      console.error(e);
      if (e.response?.data?.message === "Performance already added") {
        setAlert({
          show: true,
          message: "Performance for this student already exists ❌",
          variant: "danger",
        });
      } else {
        setAlert({
          show: true,
          message: "Failed to add performance.",
          variant: "danger",
        });
      }
    }
  };

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary fw-semibold">Student Performance</h5>
      </div>

      {/* 🔹 Alert */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert({ show: false })}
        >
          {alert.message}
        </Alert>
      )}

      {/* 🔹 Students Table */}
      <div className="table-responsive">
        <Table hover bordered className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Admission Year</th>
              <th>DOB</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((std, i) => (
                <tr key={std._id}>
                  <td>{i + 1}</td>
                  <td>{std.name}</td>
                  <td>{std.regYear}</td>
                  <td>{std.dob}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleOpen(std)}
                      disabled={std.performanceAdded}
                    >
                      {std.performanceAdded ? "Submitted" : "Add Performance"}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-muted">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* 🔹 Add Performance Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add Performance</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selectedStudent && (
            <div className="mb-3 border p-3 rounded bg-light">
              <p className="mb-1">
                <strong>Name:</strong> {selectedStudent.name}
              </p>
              <p className="mb-1">
                <strong>Admission year:</strong> {selectedStudent.regYear}
              </p>
              <p className="mb-1">
                <strong>DOB:</strong> {selectedStudent.dob}
              </p>

              {/* ✅ Attendance fetched dynamically */}
              {/* <p className="mb-0">
                <strong>Attendance:</strong>{" "}
                {loadingAttendance ? (
                  <Spinner animation="border" size="sm" />
                ) : attendance !== null ? (
                  `${attendance}%`
                ) : (
                  "Not available"
                )}
              </p> */}

              <div className="mb-0 mt-2">
  <strong className="text-white bg-dark p-2 rounded-3">Attendance</strong>{" "}
  {loadingAttendance ? (
    <Spinner animation="border" size="sm" />
  ) : attendance !== null ? (
    <b>: ${attendance}%</b>
  ) : (
    "Not available"
  )}
</div>

            </div>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Participation Level</Form.Label>
              <div>
                {["Excellent", "Active", "Average", "Poor"].map((level) => (
                  <Form.Check
                    key={level}
                    inline
                    type="radio"
                    name="participation"
                    label={level}
                    value={level}
                    onChange={(e) => setParticipation(e.target.value)}
                    checked={participation === level}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter remarks..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StudentPerformanceCORD;
