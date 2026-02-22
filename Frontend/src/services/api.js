import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // change if needed
  timeout: 10000,
});

// Example: placeholder functions — replace endpoints with your backend routes
// export const fetchCoordinators = () => api.get("/coordinators"); // GET /coordinators
// export const addCoordinator = (data) => api.post("/coordinators", data);
// export const updateCoordinator = (id, data) => api.put(`/coordinators/${id}`, data);
// export const deleteCoordinator = (id) => api.delete(`/coordinators/${id}`);

export default api;
