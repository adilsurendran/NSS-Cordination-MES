// import { useState } from "react";
// import api from "../../services/api";

// function StudentRegister() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     dept: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await api.post("/student/register", form);
//       alert(res.data.message);
//     } catch (e) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h4>Student Registration</h4>
//       <form onSubmit={handleSubmit} className="mt-3">

//         <input className="form-control mb-2" placeholder="Full Name"
//           onChange={(e)=>setForm({...form, name:e.target.value})}/>

//         <input className="form-control mb-2" placeholder="Email"
//           onChange={(e)=>setForm({...form, email:e.target.value})}/>

//         <input className="form-control mb-2" placeholder="Phone Number"
//           onChange={(e)=>setForm({...form, phone:e.target.value})}/>

//         <input className="form-control mb-2" placeholder="Department"
//           onChange={(e)=>setForm({...form, dept:e.target.value})}/>

//         <input className="form-control mb-2" type="password" placeholder="Password"
//           onChange={(e)=>setForm({...form, password:e.target.value})}/>

//         <button className="btn btn-primary w-100">Register</button>
//       </form>
//     </div>
//   );
// }

// export default StudentRegister; 

import { useState } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    className: "",
    dob: "",
    sex: "",
    caste: "",
    aadhar: "",
    height: "",
    weight: "",
    address: "",
    phone: "",
    email: "",
    password: "",
    blood: "",
    talents: "",
    interests: "",
    regYear: "", 
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  // ✅ VALIDATION FUNCTION
  const validate = () => {
    const err = {};

    if (!form.name.trim()) err.name = "Name is required";
    if (!form.className.trim()) err.className = "Class is required";
    if (!form.dob.trim()) err.dob = "Date of birth is required";
    if (!form.sex.trim()) err.sex = "Please select gender";
    if (!form.caste.trim()) err.caste = "Please select caste";
    if (!form.regYear.trim()) err.regYear = "Registration year is required";

    if (!form.aadhar.trim()) err.aadhar = "Aadhar number required";
    else if (!/^\d{12}$/.test(form.aadhar)) err.aadhar = "Aadhar must be 12 digits";

    if (!form.height.trim()) err.height = "Height is required";
    if (!form.weight.trim()) err.weight = "Weight is required";
    if (!form.address.trim()) err.address = "Address is required";

    if (!form.phone.trim()) err.phone = "Phone required";
    else if (!/^\d{10}$/.test(form.phone)) err.phone = "Phone must be 10 digits";

    if (!form.email.trim()) err.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      err.email = "Invalid email";

    if (!form.password.trim()) err.password = "Password required";
    else if (form.password.length < 6)
      err.password = "Password must be at least 6 characters";

    if (!form.blood.trim()) err.blood = "Blood group required";

    if (!form.talents.trim()) err.talents = "Talents required";
    if (!form.interests.trim()) err.interests = "Interests required";

    if (!form.photo) err.photo = "Photo required";

    return err;
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const val = validate();
//     setErrors(val);
//     if (Object.keys(val).length > 0) return;

//     const formData = new FormData();
//     Object.keys(form).forEach((key) => formData.append(key, form[key]));

//     try {
//       const res = await api.post("/student/register", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert(res.data.message);
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };
const handleSubmit = async (e) => {
  e.preventDefault();

  const val = validate();
  setErrors(val);
  if (Object.keys(val).length > 0) return;

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("className", form.className);
  formData.append("dob", form.dob);
  formData.append("sex", form.sex);
  formData.append("caste", form.caste);
  formData.append("aadhar", form.aadhar);
  formData.append("height", form.height);
  formData.append("weight", form.weight);
  formData.append("address", form.address);
  formData.append("phone", form.phone);
  formData.append("email", form.email);
  formData.append("password", form.password);
  formData.append("blood", form.blood);
  formData.append("talents", form.talents);
  formData.append("interests", form.interests);
  formData.append("regYear", form.regYear);

  console.log(form);
  

  // ✅ Photo must be appended separately
  if (form.photo) {
    formData.append("photo", form.photo);
  }

  try {
    const res = await api.post("/student/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(res.data.message || "Registration success! Once the cordinator approves you can login");
    console.log(res);
    navigate('/')
    
  } catch (err) {
    console.log(err);
    alert( err.response.data.message ||"Registration failed");
  }
};


  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-primary mb-3">Student Registration</h3>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row">
          {/* NAME */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input
              className={`form-control ${errors.name && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <div className="invalid-feedback">{errors.name}</div>
          </div>

          {/* CLASS */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Class</label>
            <input
              className={`form-control ${errors.className && "is-invalid"}`}
              onChange={(e) =>
                setForm({ ...form, className: e.target.value })
              }
            />
            <div className="invalid-feedback">{errors.className}</div>
          </div>

          {/* DOB */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className={`form-control ${errors.dob && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            <div className="invalid-feedback">{errors.dob}</div>
          </div>

          {/* SEX */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Sex</label>
            <div className="d-flex gap-4">
              <div>
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  onChange={(e) => setForm({ ...form, sex: e.target.value })}
                />{" "}
                Male
              </div>
              <div>
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  onChange={(e) => setForm({ ...form, sex: e.target.value })}
                />{" "}
                Female
              </div>
            </div>
            {errors.sex && (
              <small className="text-danger">{errors.sex}</small>
            )}
          </div>

          {/* CASTE */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Caste</label>
            <select
              className={`form-control ${errors.caste && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, caste: e.target.value })}
            >
              <option value="">Choose...</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
              <option value="GEN">General</option>
            </select>
            <div className="invalid-feedback">{errors.caste}</div>
          </div>

          {/* AADHAR */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Aadhar Number</label>
            <input
              className={`form-control ${errors.aadhar && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, aadhar: e.target.value })}
            />
            <div className="invalid-feedback">{errors.aadhar}</div>
          </div>

          {/* HEIGHT */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Height (cm)</label>
            <input
              className={`form-control ${errors.height && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, height: e.target.value })}
            />
            <div className="invalid-feedback">{errors.height}</div>
          </div>

          {/* WEIGHT */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Weight (kg)</label>
            <input
              className={`form-control ${errors.weight && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
            />
            <div className="invalid-feedback">{errors.weight}</div>
          </div>

          {/* ADDRESS */}
          <div className="col-12 mb-3">
            <label className="form-label">Address</label>
            <textarea
              className={`form-control ${errors.address && "is-invalid"}`}
              rows="3"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            ></textarea>
            <div className="invalid-feedback">{errors.address}</div>
          </div>

          {/* PHONE */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              className={`form-control ${errors.phone && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>

          {/* EMAIL */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              className={`form-control ${errors.email && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          {/* PASSWORD */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          {/* BLOOD GROUP */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Blood Group</label>
            <input
              className={`form-control ${errors.blood && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, blood: e.target.value })}
            />
            <div className="invalid-feedback">{errors.blood}</div>
          </div>

          {/* TALENTS */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Talents</label>
            <input
              className={`form-control ${errors.talents && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, talents: e.target.value })}
            />
            <div className="invalid-feedback">{errors.talents}</div>
          </div>

          {/* INTERESTS */}
          <div className="col-md-6 mb-3">
            <label className="form-label">Interests</label>
            <input
              className={`form-control ${errors.interests && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, interests: e.target.value })}
            />
            <div className="invalid-feedback">{errors.interests}</div>
          </div>

          {/* REGISTRATION YEAR */}
<div className="col-md-6 mb-3">
  <label className="form-label">Registration Year</label>
  <select
    className={`form-control ${errors.regYear && "is-invalid"}`}
    onChange={(e) => setForm({ ...form, regYear: e.target.value })}
  >
    <option value="">Select year</option>
    {Array.from({ length: 10 }).map((_, i) => {
      const year = new Date().getFullYear() - i;
      return <option key={year} value={year}>{year}</option>;
    })}
  </select>

  <div className="invalid-feedback">{errors.regYear}</div>
</div>


          {/* PHOTO */}
          <div className="col-md-12 mb-3">
            <label className="form-label">Upload Photo</label>
            <input
              type="file"
              className={`form-control ${errors.photo && "is-invalid"}`}
              onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
            />
            <div className="invalid-feedback">{errors.photo}</div>
          </div>
        </div>

        <button className="btn btn-primary w-100 mt-3">Register</button>
      </form>
    </div>
  );
}

export default StudentRegister;

