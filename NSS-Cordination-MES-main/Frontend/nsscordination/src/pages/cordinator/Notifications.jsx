import React, { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import api from "../../services/api";

function Notifications() {
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const currentYear = new Date().getFullYear();

  // ✅ Toggle batch selection
  const handleBatchToggle = (year) => {
    setSelectedBatches((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year)
        : [...prev, year]
    );
  };

  // ✅ Send notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedBatches.length === 0 || !message.trim()) {
      setAlert({
        show: true,
        message: "Please select at least one batch and enter a message.",
        variant: "warning",
      });
      return;
    }

    try {
      const res = await api.post("/cordinator/sendnotification", {
        batches: selectedBatches,
        message,
      });

      setAlert({
        show: true,
        message: "Notification sent successfully ✅",
        variant: "success",
      });
      setMessage("");
      setSelectedBatches([]);
    } catch (err) {
      console.error(err);
      setAlert({
        show: true,
        message: "Failed to send notification ❌",
        variant: "danger",
      });
    }
  };

  return (
    <Card className="p-4 shadow-sm bg-white">
      <h5 className="text-primary fw-semibold mb-3">Send Notifications</h5>
      <p>Send important updates or activity reminders to selected batches of students.</p>
      <hr />

      {alert.show && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert({ show: false })}
        >
          {alert.message}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        {/* 🔹 Select Batches */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Select Batches (Registration Year)</Form.Label>
          <div className="d-flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((_, i) => {
              const year = currentYear - i;
              const selected = selectedBatches.includes(String(year));
              return (
                <Button
                  key={year}
                  variant={selected ? "primary" : "outline-primary"}
                  onClick={() => handleBatchToggle(String(year))}
                  className="rounded-pill"
                  size="sm"
                >
                  {year}
                </Button>
              );
            })}
          </div>
        </Form.Group>

        {/* 🔹 Message Box */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Notification Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        {/* 🔹 Submit */}
        <Button variant="success" type="submit">
          Send Notification
        </Button>
      </Form>
    </Card>
  );
}

export default Notifications;
