// import React from 'react'

// function AdminHome() {
//   return (
//     <div>AdminHome</div>
//   )
// }

// export default AdminHome
import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaUserShield, FaChartBar, FaCommentDots, FaExclamationCircle, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./admin.css"; // optional small styles below

function AdminHome() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: clear auth (localStorage), redirect to login
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <aside className={`sidebar bg-white border-end ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header p-3 d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-0 text-primary">NSS Coordination</h5>
            <small className="text-muted">Admin Panel</small>
          </div>
          <button className="btn btn-sm btn-outline-secondary d-lg-none" onClick={() => setCollapsed(!collapsed)}>
            <FaBars />
          </button>
        </div>

       <nav className="nav flex-column p-2">
  <NavLink to="/adminhome" end className="nav-link">Dashboard</NavLink>
  <NavLink to="/adminhome/coordinators" className="nav-link d-flex align-items-center gap-2"><FaUserShield/> Coordinators</NavLink>
  <NavLink to="/adminhome/students" className="nav-link d-flex align-items-center gap-2"><FaUsers/> Students</NavLink>
  <NavLink to="/adminhome/performance" className="nav-link d-flex align-items-center gap-2"><FaChartBar/> Performance</NavLink>
  <NavLink to="/adminhome/feedback" className="nav-link d-flex align-items-center gap-2"><FaCommentDots/> Feedback</NavLink>
  <NavLink to="/adminhome/complaints" className="nav-link d-flex align-items-center gap-2"><FaExclamationCircle/> Complaints</NavLink>
</nav>


        <div className="mt-auto p-3">
          <button className="btn btn-danger w-100" onClick={handleLogout}><FaSignOutAlt className="me-2"/> Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <div className="content flex-grow-1">
        <header className="d-flex align-items-center justify-content-between border-bottom p-3">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-secondary d-none d-lg-inline" onClick={() => setCollapsed(!collapsed)}><FaBars/></button>
            <h4 className="mb-0">Admin Dashboard</h4>
          </div>
          <div>
            <span className="me-3 text-muted">Signed in as <strong>Admin</strong></span>
          </div>
        </header>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminHome;
