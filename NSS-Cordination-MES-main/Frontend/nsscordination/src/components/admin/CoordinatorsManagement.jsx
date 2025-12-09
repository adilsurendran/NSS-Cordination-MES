

// import React, { useEffect, useState } from "react";
// import { Modal, Button, Form, Alert } from "react-bootstrap";
// import api from "../../services/api";
// // import api from "../../services/api";

// function CoordinatorsManagement() {
//   const [coordinators, setCoordinators] = useState([]);
//   const [show, setShow] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [form, setForm] = useState({ cordinatorId: "", name: "", email: "", phone: "", department: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

//   // open modal handlers
//   const openAdd = () => {
//     setEditItem(null);
//     setForm({  name: "", email: "", phone: "", department: "", password: "" });
//     setErrors({});
//     setShow(true);
//   };
//   const openEdit = (item) => {
//     setEditItem(item);
//     setForm(item);
//     setErrors({});
//     setShow(true);
//   };

//   // ✅ validate form fields
//   const validateForm = () => {
//     const newErrors = {};
//     if (!form.name.trim()) newErrors.name = "Full name is required";
//     if (!form.email.trim()) {
//       newErrors.email = "Email is required";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       newErrors.email = "Invalid email format";
//     }
//     if (!form.phone.trim()) {
//       newErrors.phone = "Phone number is required";
//     } else if (!/^\d{10}$/.test(form.phone)) {
//       newErrors.phone = "Phone must be 10 digits";
//     }
//     if (!form.department.trim()) newErrors.department = "Department is required";
//     return newErrors;
//   };

//   // ✅ handle form save
//   const handleSave = async () => {
//     const newErrors = validateForm();
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length > 0) return; // stop if errors

//     if (editItem) {
//       // update existing
//     //   setCoordinators((prev) =>
//     //     prev.map((c) => (c.id === editItem.id ? { ...editItem, ...form } : c))
//     //   );
//     // console.log(form);
//     // console.log(form._id);

    
//     try{
//         const reqres = await api.put(`/admin/editcord/${form._id}`, form)
//         console.log(reqres);
//         setAlert({ show: true, message: "Coordinator updated successfully!", variant: "success" });
//         getallcord();


        
//     }
//     catch(e){
//         console.log(e);
//                     setAlert({ show: true, message: "updating Cordinator is failed.", variant: "danger" });

//     }
    
//     } else {
//       // add new
//     //   console.log(form);
//     try{
//         const reqres = await api.post("/admin/newcordinator",form)
//         console.log(reqres);
//         setAlert({ show: true, message: "Coordinator added successfully!", variant: "success" });

//     }
//     catch(e){
//     console.log(e);
//             setAlert({ show: true, message: "Adding Cordinator is failed.", variant: "danger" });

//     }
      
      
//     //   const newItem = { id: Date.now(), ...form };
//     //   setCoordinators((prev) => [newItem, ...prev]);
//     }
//     setShow(false);
//   };

//   // delete
//   const handleDelete = (id) => {
//     // console.log(id);
    
//     if (!window.confirm("Delete this coordinator?")) return;
//     try{
//         const reqres = api.delete(`/admin/delete/${id}`)
//         console.log(reqres);
//         getallcord();
//                 setAlert({ show: true, message: "Coordinator deleted successfully!", variant: "success" });

        
//     }
//     catch(e){
//         console.log(e);
//                     setAlert({ show: true, message: "Deleting Cordinator is failed.", variant: "danger" });

//     }
//   }; 

//   const getallcord = async(req,res)=>{
//     try{
//         const reqres = await api.get('/admin/getcord')
//         console.log(reqres);
//         setCoordinators(reqres.data.coordinators)
        
//     }
//     catch(e){
//         console.log(e);
        
//     }
//   }

//   useEffect(()=>{getallcord()},[])
//   console.log(coordinators);
  

//   return (
//     <div>
//       {/* Success/Error Alerts */}
//       {alert.show && (
//         <Alert
//           variant={alert.variant}
//           onClose={() => setAlert({ show: false })}
//           dismissible
//         >
//           {alert.message}
//         </Alert>
//       )}

//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5>Coordinators</h5>
//         <div>
//           <Button variant="primary" onClick={openAdd}>
//             Add Coordinator
//           </Button>
//         </div>
//       </div>

//       {/* Coordinators Table */}
//       <div className="table-responsive bg-white rounded shadow-sm p-3">
//         <table className="table table-hover mb-0">
//           <thead>
//             <tr>
//               <th>CORD ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Department</th><th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {coordinators.map((c) => (
//               <tr key={c._id}>
//                 <td>{c.cordinatorId}</td>
//                 <td>{c.name}</td>
//                 <td>{c.email}</td>
//                 <td>{c.phone}</td>
//                 <td>{c.department}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-outline-primary me-2"
//                     onClick={() => openEdit(c)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="btn btn-sm btn-outline-danger"
//                     onClick={() => handleDelete(c._id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {coordinators.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   No coordinators found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       <Modal show={show} onHide={() => setShow(false)} backdrop="static">
//         <Modal.Header closeButton>
//           <Modal.Title>{editItem ? "Edit Coordinator" : "Add Coordinator"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-2">
//               <Form.Label>Full Name</Form.Label>
//               <Form.Control
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//                 isInvalid={!!errors.name}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.name}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 isInvalid={!!errors.email}
//                 disabled={!!editItem}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.email}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Phone</Form.Label>
//               <Form.Control
//                 value={form.phone}
//                 onChange={(e) => setForm({ ...form, phone: e.target.value })}
//                 isInvalid={!!errors.phone}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.phone}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-2">
//               <Form.Label>Department</Form.Label>
//               <Form.Control
//                 value={form.department}
//                 onChange={(e) => setForm({ ...form, department: e.target.value })}
//                 isInvalid={!!errors.department}
//               />
//               <Form.Control.Feedback type="invalid">
//                 {errors.department}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group className="mb-2">
//   <Form.Label>Password</Form.Label>
//   <Form.Control
//     type="password"
//     value={form.password}
//     onChange={(e) => setForm({ ...form, password: e.target.value })}
//     isInvalid={!!errors.password}
//   />
//   <Form.Control.Feedback type="invalid">
//     {errors.password}
//   </Form.Control.Feedback>
// </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShow(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             {editItem ? "Save changes" : "Add Coordinator"}
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

// export default CoordinatorsManagement;


import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import api from "../../services/api";

function CoordinatorsManagement() {
  const [coordinators, setCoordinators] = useState([]);
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    cordinatorId: "",
    name: "",
    email: "",
    phone: "",
    department: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // 🔹 Fetch all coordinators on mount
  useEffect(() => {
    getAllCoordinators();
  }, []);

  // ✅ Get all coordinators from backend
  const getAllCoordinators = async () => {
    try {
      const res = await api.get("/admin/getcord");
      setCoordinators(res.data.coordinators || []);
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        message: "Failed to fetch coordinators.",
        variant: "danger",
      });
    }
  };

  // 🔹 Open Add Modal
  const openAdd = () => {
    setEditItem(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      password: "",
    });
    setErrors({});
    setShow(true);
  };

  // 🔹 Open Edit Modal
  const openEdit = (item) => {
    setEditItem(item);
    setForm({ ...item, password: "" }); // password not editable here
    setErrors({});
    setShow(true);
  };

  // ✅ Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!form.department.trim()) newErrors.department = "Department is required";

    // Only validate password in Add mode
    if (!editItem && !form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!editItem && form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  // ✅ Handle Save (Add or Edit)
  const handleSave = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editItem) {
        // 🔹 Update Coordinator
        const res = await api.put(`/admin/editcord/${form._id}`, form);
        setAlert({
          show: true,
          message: "Coordinator updated successfully!",
          variant: "success",
        });
      } else {
        // 🔹 Add New Coordinator
        const res = await api.post("/admin/newcordinator", form);
        setAlert({
          show: true,
          message: "Coordinator added successfully!",
          variant: "success",
        });
      }

      // Refresh list
      getAllCoordinators();
      setShow(false);
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        message: editItem
          ? "Failed to update coordinator."
          : "Failed to add coordinator.",
        variant: "danger",
      });
    }
  };

  // ✅ Delete coordinator
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coordinator?"))
      return;

    try {
      await api.delete(`/admin/delete/${id}`);
      setAlert({
        show: true,
        message: "Coordinator deleted successfully!",
        variant: "success",
      });
      getAllCoordinators();
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        message: "Failed to delete coordinator.",
        variant: "danger",
      });
    }
  };

  return (
    <div>
      {/* 🔹 Alerts */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      {/* 🔹 Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Coordinators</h5>
        <Button variant="primary" onClick={openAdd}>
          Add Coordinator
        </Button>
      </div>

      {/* 🔹 Coordinators Table */}
      <div className="table-responsive bg-white rounded shadow-sm p-3">
        <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>CORD ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coordinators.length > 0 ? (
              coordinators.map((c) => (
                <tr key={c._id}>
                  <td>{c.cordinatorId}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.department}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => openEdit(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(c._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No coordinators found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 Add/Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editItem ? "Edit Coordinator" : "Add Coordinator"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                isInvalid={!!errors.email}
                disabled={!!editItem}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Department</Form.Label>
              <Form.Control
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                isInvalid={!!errors.department}
              />
              <Form.Control.Feedback type="invalid">
                {errors.department}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password only for Add mode */}
            {!editItem && (
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editItem ? "Save Changes" : "Add Coordinator"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CoordinatorsManagement;
