import ATTENDANCE from "../Modals/Attendance.js";
import COMPLAINT from "../Modals/Complaint.js";
import EVENT from "../Modals/Event.js";
import FEEDBACK from "../Modals/Feedback.js";
import LOGIN from "../Modals/Login.js";
import NOTIFICATION from "../Modals/Notification.js";
import PERFORMANCE from "../Modals/Performance.js";
import STUDENT from "../Modals/Student.js";
import bcrypt from "bcryptjs";

export const registerStudent = async (req, res) => {
    console.log(req.body);
    
  try {
    const {
      name,
      className,
      dob,
      sex,
      caste,
      aadhar,
      height,
      weight,
      address,
      phone,
      email,
      password,
      blood,
      talents,
      interests,
      regYear,
    } = req.body;

    // ✅ Validate fields
    if (
      !name ||
      !className ||
      !dob ||
      !sex ||
      !caste ||
      !aadhar ||
      !height ||
      !weight ||
      !address ||
      !phone ||
      !email ||
      !password ||
      !blood ||
      !regYear
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All required fields must be filled." });
    }

    // ✅ Check email duplicate
    const existing = await LOGIN.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered." });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Photo from multer
    const photo = req.file ? req.file.filename : null;

    // ✅ 1. Create Login first
    const loginRecord = new LOGIN({
      username: email,
      password: hashedPassword,
      role: "student",
      status: false
    });

    const savedLogin = await loginRecord.save();

    // ✅ 2. Create Student + link login._id
    const newStudent = new STUDENT({
      name,
      className,
      dob,
      sex,
      caste,
      aadhar,
      height,
      weight,
      address,
      phone,
      email,
      blood,
      talents,
      interests,
      password: hashedPassword,
      photo,
      regYear,
      commonKey: savedLogin._id, 
    });

    await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully! Once the cordinator approves you can login",
      student: newStudent,
    });

  } catch (error) {
    console.error("Student Register Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error while registering student." });
  }
};





export const postfeedback = async (req, res) => {
  try {
    const { text, studentId } = req.body;

    // ✅ Validate
    if (!text || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Feedback text and student ID are required",
      });
    }

    // ✅ Create new feedback record
    const newFeedback = new FEEDBACK({
      feedback: text,
      studentId: studentId,
    });

    await newFeedback.save();

    return res.status(201).json({
      success: true,
      message: "Feedback submitted successfully!",
      feedback: newFeedback,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting feedback",
    });
  }
};



export const postComplaint = async (req, res) => {
  try {
    const { text, studentId } = req.body;

    if (!text || !studentId) {
      return res.status(400).json({
        success: false,
        message: "Complaint and student ID required",
      });
    }

    const complaint = new COMPLAINT({
      text,
      studentId
    });

    await complaint.save();

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      complaint,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const getStudentComplaints = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    
    const complaints = await COMPLAINT.find({ studentId })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      complaints,
    });
    
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error fetching complaints",
    });
  }
};



export const getallevents = async (req, res) => {
  try {
    const events = await EVENT.find().sort({ createdAt: -1 }); // ✅ latest first

    return res.status(200).json({
      success: true,
      message: "Events fetched successfully",
      events,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events",
    });
  }
}; 

// /student/events/:eventId/photos
export const getEventPhotosForStudent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EVENT.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    return res.json({
      success: true,
      photos: event.photos || [],
    });

  } catch (error) {
    console.error("Error fetching event photos:", error);
    res.status(500).json({
      success: false,
      message: "Server error fetching event photos",
    });
  }
};




export const getVerifiedStudents = async (req, res) => {
  try {
    const loginVerifiedIds = await LOGIN.find({ status: "true" }).select("_id");

    const students = await STUDENT.find({
      commonKey: { $in: loginVerifiedIds },
    });

    return res.json({
      success: true,
      students,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error fetching students",
    });
  }
};






export const getStudentAttendance = async (req, res) => {
  try {
    const studentId = req.params.studentId; // ✅ Comes from frontend

    const student = await STUDENT.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // ✅ Count total NSS events
    const totalEvents = await EVENT.countDocuments();

    // ✅ Count attended events
    const attended = await ATTENDANCE.countDocuments({
      studentId: student._id,
      present: true,
    });

    return res.json({
      success: true,
      totalSessions: totalEvents,
      attended: attended,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching attendance",
    });
  }
};

// export const getStudentPerformans = async(req,res)=>{
//   const {studentId} = req.params
//   console.log(studentId);

//   try{
//     const performance = await PERFORMANCE.findOne({studentId : studentId})
//     console.log(performance);
    
//   }
//   catch(e){
//     console.log(e);
    
//   }
  
// }


export const getStudentPerformans = async (req, res) => {
  const { studentId } = req.params;

  try {
    // ✅ Find performance data for this student
    const performance = await PERFORMANCE.findOne({ studentId });

    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "No performance data found for this student",
      });
    }

    // ✅ Return only performance data
    return res.status(200).json({
      success: true,
      performance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching performance data",
    });
  }
};


export const notifications = async (req, res) => {
  const { regYear } = req.params;
  console.log(regYear);
  

  try {
    // ✅ Find all notifications for this batch
    const notifications = await NOTIFICATION.find({
      batches: { $in: [regYear] },
    }).sort({ createdAt: -1 }); // latest first
    console.log(notifications);
    
    res.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
    });
  }
};
