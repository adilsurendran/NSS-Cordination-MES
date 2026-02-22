import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:8000/api/admin/reset-password", {
        email,
        otp,
        newPassword,
      });
console.log(res);

      alert("Password changed successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "380px" }}>
        <h4 className="text-center mb-3">Reset Password</h4>

        <form onSubmit={resetPassword}>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button className="btn btn-success w-100">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
