import { useEffect, useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import api from "../../services/api";

function StudentNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));

  const fetchNotifications = async () => {
    try {
      const res = await api.get(`/student/notifications/${student.regYear}`);
      console.log(res);
      
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log(err);
      alert("Error loading notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Card className="p-4 shadow">
      <h4 className="text-primary fw-bold mb-3">Notifications</h4>

      {notifications.length > 0 ? (
        notifications.map((n, i) => (
          <div key={i} className="border-bottom mb-3 pb-2">
            <p className="mb-1 fw-semibold">{n.message}</p>
            <small className="text-muted">
              {new Date(n.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p className="text-muted fst-italic">No notifications available</p>
      )}
    </Card>
  );
}

export default StudentNotifications;
