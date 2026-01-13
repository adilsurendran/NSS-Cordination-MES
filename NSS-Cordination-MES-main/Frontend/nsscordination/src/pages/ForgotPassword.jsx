import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/admin/forgot-password", {
        email,
      });
      alert("OTP sent to email");
      navigate("/reset-password");
    } catch (err) {
      alert(err.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h4 className="text-center mb-3">Forgot Password</h4>

        <form onSubmit={sendOtp}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Send OTP</button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
