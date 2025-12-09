// import { useState } from 'react'
// import { Routes, Route } from 'react-router-dom';
// import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './pages/Login';
// import AdminHome from './pages/AdminHome';

// function App() {

//   return (
//     <Routes>
//       <Route path='/' element={<Login/>}></Route>
//       <Route path='/adminhome' element={<AdminHome/>}></Route>
//     </Routes>
//   )
// }

// export default App

import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import CoordinatorsManagement from "./components/admin/CoordinatorsManagement";
import StudentList from "./components/admin/StudentList";
import StudentPerformance from "./components/admin/StudentPerformance";
import FeedbackList from "./components/admin/FeedbackList";
import ComplaintManagement from "./components/admin/ComplaintManagement";
import CordinatorHome from "./pages/CordinatorHome";
import Approvals from "./pages/cordinator/Approvals";
import EventsManagement from "./pages/cordinator/EventsManagement";
import Attendance from "./pages/cordinator/Attendance";
import Grades from "./pages/cordinator/Grades";
import Notifications from "./pages/cordinator/Notifications";
import StudentPerformanceCORD from "./pages/cordinator/StudentPerformance";
import StudentHome from "./pages/student/StudentHome";
import StudentEvents from "./pages/student/StudentEvents";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentFeedback from "./pages/student/StudentFeedback";
import StudentComplaint from "./pages/student/StudentComplaint";
import StudentRegister from "./pages/student/StudentRegister";
import StudentProfile from "./pages/student/StudentProfile";
import ViewFeedback from "./pages/cordinator/ViewFeedback";
import StudentNotifications from "./pages/student/StudentNotifications";
// import Cordinator from "./pages/Cordinator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Admin home with nested routes */}
      <Route path="/adminhome/*" element={<AdminHome />}>
        <Route index element={<div className="p-4">Welcome to NSS Coordination Admin Dashboard</div>} />
        <Route path="coordinators" element={<CoordinatorsManagement />} />
        <Route path="students" element={<StudentList />} />
        <Route path="performance" element={<StudentPerformance />} />
        <Route path="feedback" element={<FeedbackList />} />
        <Route path="complaints" element={<ComplaintManagement />} />
      </Route>
      {/* <Route path="/userhome" element={<Cordinator/>}/> */}

    
      <Route path="/cordinatorhome" element={<CordinatorHome />}>
        <Route path="students" element={<StudentPerformanceCORD/>} />
        <Route path="approvals" element={<Approvals />} />
        <Route path="events" element={<EventsManagement />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="grades" element={<Grades />} />
        <Route path="feedbacks" element={<ViewFeedback />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    
    <Route path="/studenthome" element={<StudentHome />}>
   <Route path="events" element={<StudentEvents />} />
   <Route path="attendance" element={<StudentAttendance />} />
   <Route path="feedback" element={<StudentFeedback />} />
   <Route path="complaint" element={<StudentComplaint />} />
   <Route path="profile" element={<StudentProfile/>} />
   <Route path="notifications" element={<StudentNotifications/>} />
   
</Route>

<Route path="/studentregister" element={<StudentRegister />} />
{/* <Route path="/studentlogin" element={<StudentLogin />} /> */}


      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
