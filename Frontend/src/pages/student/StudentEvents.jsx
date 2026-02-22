// import { useEffect, useState } from "react";
// import api from "../../services/api";


// function StudentEvents() {
//   const [events, setEvents] = useState([]);

//   const getEvents = async () => {
//     const res = await api.get("/student/events");
//     console.log(res);
    
//     setEvents(res.data.events);
//   };

//   useEffect(() => { getEvents(); }, []);

//   return (
//     <div>
//       <h5 className="mt-3">Upcoming & Past Events</h5>
//       <table className="table mt-3">
//         <thead>
//           <tr>
//             <th>#</th><th>Name</th><th>Date</th><th>Time</th><th>Place</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((e, i)=>(
//             <tr key={e._id}>
//               <td>{i+1}</td>
//               <td>{e.name}</td>
//               <td>{e.date}</td>
//               <td>{e.time}</td>
//               <td>{e.place}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StudentEvents;


import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Image, Spinner } from "react-bootstrap";
import api from "../../services/api";

function StudentEvents() {
  const [events, setEvents] = useState([]);

  // Photo viewer state
  const [showPhotosModal, setShowPhotosModal] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const getEvents = async () => {
    const res = await api.get("/student/events");
    setEvents(res.data.events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  // Fetch photos for event
  const openPhotos = async (event) => {
    setSelectedEvent(event);
    setShowPhotosModal(true);
    setPhotos([]);

    try {
      setLoadingPhotos(true);
      const res = await api.get(`/student/events/${event._id}/photos`);
      setPhotos(res.data.photos || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPhotos(false);
    }
  };

  return (
    <div>
      <h5 className="mt-3">Upcoming & Past Events</h5>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>#</th><th>Name</th><th>Date</th><th>Time</th><th>Place</th><th>Photos</th>
          </tr>
        </thead>

        <tbody>
          {events.map((e, i) => (
            <tr key={e._id}>
              <td>{i + 1}</td>
              <td>{e.name}</td>
              <td>{e.date}</td>
              <td>{e.time}</td>
              <td>{e.place}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => openPhotos(e)}
                >
                  View Photos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PHOTO VIEWER MODAL */}
      <Modal
        show={showPhotosModal}
        onHide={() => setShowPhotosModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Photos — {selectedEvent?.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {loadingPhotos ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          ) : photos.length === 0 ? (
            <p className="text-muted">No photos uploaded for this event.</p>
          ) : (
            <Row xs={2} md={4} className="g-3">
              {photos.map((photo) => (
                <Col key={photo._id}>
                  <Image
                    src={`http://localhost:8000${photo.url}`}
                    thumbnail
                    style={{
                      height: "140px",
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: "8px"
                    }}
                  />
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

export default StudentEvents;
