

import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Alert,
  Table,
  Row,
  Col,
  Image,
  Spinner,
} from "react-bootstrap";
import api from "../../services/api";

function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [show, setShow] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: "", date: "", time: "", place: "" });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // 📸 Photos modal state
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [photoEvent, setPhotoEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [uploading, setUploading] = useState(false);

  // 🔹 Validate Form
  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Event name is required";
    if (!form.date) newErrors.date = "Event date is required";
    if (!form.time) newErrors.time = "Event time is required";
    if (!form.place.trim()) newErrors.place = "Event place is required";
    return newErrors;
  };

  // 🔹 Open Add Modal
  const openAdd = () => {
    setEditItem(null);
    setForm({ name: "", date: "", time: "", place: "" });
    setErrors({});
    setShow(true);
  };

  // 🔹 Open Edit Modal
  const openEdit = (event) => {
    setEditItem(event);
    setForm(event);
    setErrors({});
    setShow(true);
  };

  // 🔹 Save (Add / Update)
  const handleSave = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      if (editItem) {
        // Update event
        const reqres = await api.put(`/cordinator/editevent/${form._id}`, form);
        console.log(reqres);
        fetchEvents();
        setAlert({
          show: true,
          message: "Event updated successfully!",
          variant: "success",
        });
      } else {
        // Add event
        const reqres = await api.post("/cordinator/addevent", form);
        console.log(reqres);
        fetchEvents();
        setAlert({
          show: true,
          message: "Event added successfully!",
          variant: "success",
        });
      }
      setShow(false);
    } catch (error) {
      console.error(error);
      setAlert({
        show: true,
        message: error?.response?.data?.message || "Error saving event.",
        variant: "danger",
      });
    }
  };

  // 🔹 Delete Event
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const reqres = await api.delete(`/cordinator/delete/${id}`);
      console.log(reqres);
      setAlert({
        show: true,
        message: "Event deleted successfully!",
        variant: "danger",
      });
      fetchEvents();
    } catch (e) {
      console.log(e);
      setAlert({
        show: true,
        message: "Error deleting event.",
        variant: "danger",
      });
    }
  };

  // 🔹 Fetch all events
  const fetchEvents = async () => {
    try {
      const reqres = await api.get("/cordinator/allevent");
      console.log(reqres);
      setEvents(reqres.data.events || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // ===========================
  // 📸 EVENT PHOTOS MANAGEMENT
  // ===========================

  // 🔹 Open photos modal for an event
  const openPhotos = async (event) => {
    setPhotoEvent(event);
    setShowPhotosModal(true);
    setPhotos([]);
    setUploadFiles([]);

    try {
      setLoadingPhotos(true);
      const res = await api.get(`/cordinator/events/${event._id}/photos`);
      console.log(res);
      
      setPhotos(res.data.photos || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingPhotos(false);
    }
  };

  // 🔹 File input change
  const handleFileChange = (e) => {
    setUploadFiles(Array.from(e.target.files));
  };

  // 🔹 Upload photos
  const handleUploadPhotos = async () => {
    if (!photoEvent || uploadFiles.length === 0) {
      return alert("Select images to upload");
    }

    const formData = new FormData();
    uploadFiles.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      setUploading(true);
      const res = await api.post(
        `/cordinator/events/${photoEvent._id}/photos`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setPhotos(res.data.photos || []);
      setUploadFiles([]);
      setAlert({
        show: true,
        message: "Photos uploaded successfully!",
        variant: "success",
      });
    } catch (e) {
      console.log(e);
      alert("Error uploading photos");
    } finally {
      setUploading(false);
    }
  };

  // 🔹 Delete single photo
  const handleDeletePhoto = async (photoId) => {
    if (!photoEvent) return;
    if (!window.confirm("Delete this photo?")) return;

    try {
      const res = await api.delete(
        `/cordinator/events/${photoEvent._id}/photos/${photoId}`
      );
      setPhotos(res.data.photos || []);
    } catch (e) {
      console.log(e);
      alert("Error deleting photo");
    }
  };

  return (
    <div className="bg-white rounded p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary fw-semibold">Manage NSS Events</h5>
        <Button variant="primary" onClick={openAdd}>
          + Add Event
        </Button>
      </div>

      {/* 🔹 Alert Messages */}
      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
        >
          {alert.message}
        </Alert>
      )}

      {/* 🔹 Events Table */}
      <div className="table-responsive">
        <Table hover bordered className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Place</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td>{event.name}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.place}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => openEdit(event)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => handleDelete(event._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => openPhotos(event)}
                    >
                      Photos
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* 🔹 Add/Edit Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{editItem ? "Edit Event" : "Add Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                isInvalid={!!errors.name}
                placeholder="Enter event name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                isInvalid={!!errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                isInvalid={!!errors.time}
              />
              <Form.Control.Feedback type="invalid">
                {errors.time}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Place</Form.Label>
              <Form.Control
                type="text"
                value={form.place}
                onChange={(e) => setForm({ ...form, place: e.target.value })}
                isInvalid={!!errors.place}
                placeholder="Enter event location"
              />
              <Form.Control.Feedback type="invalid">
                {errors.place}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {editItem ? "Save Changes" : "Add Event"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 📸 Photos Modal */}
      <Modal
        show={showPhotosModal}
        onHide={() => setShowPhotosModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Event Photos {photoEvent ? `- ${photoEvent.name}` : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Upload section */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Photos (before/after event)</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </Form.Group>
          <Button
            variant="success"
            className="mb-4"
            disabled={uploading || uploadFiles.length === 0}
            onClick={handleUploadPhotos}
          >
            {uploading ? (
              <>
                <Spinner animation="border" size="sm" /> Uploading...
              </>
            ) : (
              "Upload Selected Photos"
            )}
          </Button>

          {/* Gallery */}
          {loadingPhotos ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : photos.length === 0 ? (
            <p className="text-muted">No photos uploaded yet for this event.</p>
          ) : (
            <Row xs={2} md={4} className="g-3">
              {photos.map((photo) => (
                <Col key={photo._id}>
                  <div className="border rounded p-2 text-center position-relative">
                    <Image
                      src={`http://localhost:8000${photo.url}`}
                      thumbnail
                      style={{ height: "120px", objectFit: "cover", width: "100%" }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="mt-2"
                      onClick={() => handleDeletePhoto(photo._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPhotosModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EventsManagement;
