import { useEffect, useState } from "react";
import api from "../../services/api";
import { Card, Spinner } from "react-bootstrap";

function StudentAttendance() {
  const [data, setData] = useState(null);
  const [pdata, setPdata] = useState(null); // ✅ FIX: start as null
  const [loading, setLoading] = useState(true);

  const student = JSON.parse(localStorage.getItem("student"));

  // ✅ Fetch attendance
  const fetchData = async () => {
    try {
      const res = await api.get(`/student/attendance/${student._id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching attendance");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch performance
  const fetchPerformances = async () => {
    try {
      const res = await api.get(`/student/getperformance/${student._id}`);
      if (res.data.success && res.data.performance) {
        setPdata(res.data.performance);
      } else {
        setPdata(null);
      }
    } catch (e) {
      console.log(e);
      setPdata(null);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPerformances();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Card className="p-4 shadow">
      <h4 className="text-primary fw-bold mb-3">Attendance Summary</h4>

      {data?.success ? (
        <div>
          <p className="mb-2">
            <strong>Total Sessions: </strong> {data.totalSessions}
          </p>

          <p className="mb-2">
            <strong>Attended Sessions: </strong> {data.attended}
          </p>

          <hr />

          <p className="fw-semibold">
            Attendance Percentage:{" "}
            <span className="text-success">
              {data.totalSessions > 0
                ? ((data.attended / data.totalSessions) * 100).toFixed(2)
                : 0}
              %
            </span>
          </p>

          <hr />

          {/* ✅ Show performance if available, else fallback */}
          {pdata ? (
            <>
              <p className="mb-2">
                <strong>Performance:</strong> {pdata.participationLevel}
              </p>
              <p className="mb-2">
                <strong>Remarks:</strong> {pdata.remarks}
              </p>
            </>
          ) : (
            <p className="text-muted fst-italic">
              No performance data available
            </p>
          )}
        </div>
      ) : (
        <p className="text-danger">Attendance data not available</p>
      )}
    </Card>
  );
}

export default StudentAttendance;
