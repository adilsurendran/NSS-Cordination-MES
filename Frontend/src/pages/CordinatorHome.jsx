import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaClipboardCheck,
  FaCalendarAlt,
  FaCheckCircle,
  FaStar,
  FaBell,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import '../pages/cordinator.css'

function CordinatorHome() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLogout = () => {
    if (window.confirm("Logout from Coordinator Dashboard?")) {
      navigate("/");
    }
  };

  return (
    <div className="cordinator-container">
      {/* Sidebar */}
      <div className={`cord-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="cord-logo">
          <h5 className="fw-bold text-primary">NSS Coordination</h5>
        </div>
        <nav>
          <NavLink to="students" className="cord-link">
            <FaUsers className="me-2" /> View Student Performance
          </NavLink>
          <NavLink to="approvals" className="cord-link">
            <FaClipboardCheck className="me-2" /> Approve / Reject Students
          </NavLink>
          <NavLink to="events" className="cord-link">
            <FaCalendarAlt className="me-2" /> Manage Events
          </NavLink>
          <NavLink to="attendance" className="cord-link">
            <FaCheckCircle className="me-2" /> Add Attendance
          </NavLink>
          <NavLink to="grades" className="cord-link">
            <FaStar className="me-2" /> Grades & Performance
          </NavLink>
          <NavLink to="feedbacks" className="cord-link">
  <FaBell className="me-2" /> View Feedback
</NavLink>
          <NavLink to="notifications" className="cord-link">
            <FaBell className="me-2" /> Send Notifications
          </NavLink>
        </nav>
        <button className="logout-btn mt-auto" onClick={handleLogout}>
          <FaSignOutAlt className="me-2" /> Logout
        </button>
      </div>

      {/* Main content */}
      <div className="cord-main">
        <header className="cord-header shadow-sm d-flex align-items-center justify-content-between">
          <button className="menu-btn d-md-none" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h5 className="m-0 fw-semibold text-primary">Coordinator Dashboard</h5>
        </header>

        <div className="cord-content p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CordinatorHome;
