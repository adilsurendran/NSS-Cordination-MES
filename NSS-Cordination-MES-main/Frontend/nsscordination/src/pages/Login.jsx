import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/login", {
        username,
        password,
      });
      console.log(res); 

      

      if (res.data.success) {

        if (res.data.role === "admin") {
          navigate("/adminhome");
        } else if(res.data.role === "cordinator") {
          navigate("/cordinatorhome");
        }
        else if (res.data.role === "student" && res.data.status == true){
          localStorage.setItem("student", JSON.stringify(res.data.fulldetails));
           navigate("/studenthome");
        }
        else{
          alert("Your account not verifiend by cordinator!!")
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
        console.log(err);
        
      alert(err.response.data.message || "Server error");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "380px", borderRadius: "12px" }}
      >
        <h3 className="text-center text-primary mb-3">NSS Coordination</h3>
<form onSubmit={handleSubmit}>
  {/* username */}
  <div className="mb-3">
    <label className="form-label fw-semibold">Username</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
    />
  </div>

  {/* password */}
  <div className="mb-3">
    <label className="form-label fw-semibold">Password</label>
    <input
      type="password"
      className="form-control"
      placeholder="Enter password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <button type="submit" className="btn btn-primary w-100 fw-semibold">
    Login
  </button>
</form>

{/* 🔹 Forgot password link */}
<div className="text-center mt-3">
  <Link to="/forgot-password" className="text-decoration-none">
    Forgot Password?
  </Link>
</div>

        <Link to = "/studentregister">
          <p className="text-center pt-3">New? Register Now</p>
        </Link>
      </div>
    </div>
  );
}

export default Login;
