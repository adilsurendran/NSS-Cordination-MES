import { Link, Outlet } from "react-router-dom";

function StudentHome() {
  const student = JSON.parse(localStorage.getItem("student"));
  // console.log(student);
  
  return (
    <div className="container mt-4">
      <h3 className="text-primary fw-bold">Student Dashboard</h3>

      <div className="list-group mt-4">
        <Link className="list-group-item list-group-item-action" to="events">
          📅 Upcoming & Past Events
        </Link>

        <Link className="list-group-item list-group-item-action" to="attendance">
          ✅ Attendance & Performance Feedback
        </Link>

        <Link className="list-group-item list-group-item-action" to="notifications">
          Notifiactions
        </Link>

        <Link className="list-group-item list-group-item-action" to="feedback">
          📝 Submit Feedback
        </Link>

        <Link className="list-group-item list-group-item-action" to="complaint">
          ⚠️ Send Complaint & View Reply
        </Link>

        <Link className="list-group-item list-group-item-action" to="profile">
  👤 My Profile
</Link>

      </div>

      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default StudentHome;
