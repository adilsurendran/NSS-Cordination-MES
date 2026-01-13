

import ATTENDANCE from "../Modals/Attendance.js";
import EVENT from "../Modals/Event.js"; // ✅ Make sure you have the .js extension
import FEEDBACK from "../Modals/Feedback.js";
import LOGIN from "../Modals/Login.js";
import NOTIFICATION from "../Modals/Notification.js";
import PERFORMANCE from "../Modals/Performance.js";
import STUDENT from "../Modals/Student.js";

// ✅ Add a new event
export const newevent = async (req, res) => {
  try {
    const { name, date, time, place } = req.body;

    // 🔹 Validate required fields
    if (!name || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, date, time, place) are required.",
      });
    }

    // 🔹 Check if event already exists (optional)
    const existingEvent = await EVENT.findOne({ name, date, time, place });
    if (existingEvent) {
      return res.status(400).json({
        success: false,
        message: "Event already exists for the given details.",
      });
    }

    // 🔹 Create new event
    const newEvent = new EVENT({
      name,
      date,
      time,
      place,
    });

    // 🔹 Save to DB
    await newEvent.save();

    // ✅ Success Response
    return res.status(201).json({
      success: true,
      message: "Event added successfully!",
      event: newEvent,
    });
  } catch (error) {
    console.error("Error adding event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding event.",
      error: error.message,
    });
  }
};


export const fetchallevents = async (req, res) => {
  try {
    // 🔹 Fetch all events (newest first)
    const events = await EVENT.find().sort({ createdAt: -1 });

    // 🔹 If no events found
    if (!events || events.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No events found.",
      });
    }

    // ✅ Success Response
    return res.status(200).json({
      success: true,
      message: "Events fetched successfully.",
      total: events.length,
      events,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching events.",
      error: error.message,
    });
  }
};


export const editevent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date, time, place } = req.body;

    // ✅ Basic validation
    if (!id || !name || !date || !time || !place) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, date, time, place) are required.",
      });
    }

    // ✅ Find and update event
    const updatedEvent = await EVENT.findByIdAndUpdate(
      id,
      { name, date, time, place },
      { new: true, runValidators: true }
    );

    // ✅ Check if event exists
    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Event updated successfully!",
      event: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating event.",
      error: error.message,
    });
  }
};



export const deleteevent = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required.",
      });
    }

    // ✅ Attempt to delete
    const deletedEvent = await EVENT.findByIdAndDelete(id);

    // ✅ If not found
    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully!",
      deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting event.",
      error: error.message,
    });
  }
};


import fs from "fs";
import path from "path";

// ✅ Add photos to an event
export const addEventPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EVENT.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No photos uploaded" });
    }

    const newPhotos = req.files.map((file) => ({
      filename: file.filename,
      url: `/uploads/event/${file.filename}`,
    }));

    event.photos.push(...newPhotos);
    await event.save();

    return res.status(201).json({
      success: true,
      message: "Photos added successfully",
      photos: event.photos,
    });
  } catch (error) {
    console.error("Error adding event photos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding photos",
    });
  }
};

// ✅ Get photos for an event
export const getEventPhotos = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await EVENT.findById(eventId).select("photos name");
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    return res.json({
      success: true,
      eventName: event.name,
      photos: event.photos,
    });
  } catch (error) {
    console.error("Error fetching event photos:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching photos",
    });
  }
};

// // ✅ Delete a specific event photo
// export const deleteEventPhoto = async (req, res) => {
//   try {
//     const { eventId, photoId } = req.params;

//     const event = await EVENT.findById(eventId);
//     if (!event) {
//       return res.status(404).json({ success: false, message: "Event not found" });
//     }

//     const photo = event.photos.id(photoId);
//     if (!photo) {
//       return res.status(404).json({ success: false, message: "Photo not found" });
//     }

//     const filePath = path.join("uploads", "event", photo.filename);
//     if (fs.existsSync(filePath)) {
//       fs.unlinkSync(filePath);
//     }

//     photo.remove();
//     await event.save();

//     return res.json({
//       success: true,
//       message: "Photo deleted successfully",
//       photos: event.photos,
//     });
//   } catch (error) {
//     console.error("Error deleting event photo:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while deleting photo",
//     });
//   }
// };

export const deleteEventPhoto = async (req, res) => {
  try {
    const { eventId, photoId } = req.params;

    const event = await EVENT.findById(eventId);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    // Find photo
    const photo = event.photos.find((p) => p._id.toString() === photoId);
    if (!photo) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }

    // Delete file from disk
    const filePath = path.join("uploads", "event", photo.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Remove photo from array (IMPORTANT FIX)
    event.photos = event.photos.filter((p) => p._id.toString() !== photoId);

    // Save updated event
    await event.save();

    return res.json({
      success: true,
      message: "Photo deleted successfully",
      photos: event.photos,
    });

  } catch (error) {
    console.error("Error deleting event photo:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting photo",
    });
  }
};




// export const getallpending = async (req, res) => {
//   try {
//     const pending = await STUDENT.find();

//     return res.status(200).json({
//       success: true,
//       message: "Pending students fetched successfully",
//       students: pending,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.status(500).json({
//       success: false,
//       message: "Server error while fetching pending students",
//     });
//   }
// };

// export const approvestd = async(req,res)=>{
//   const {id} = req.params
//   console.log(id);
//   try{
//     const approve = await STUDENT.findByIdAndUpdate(id,{status:"approved"})
//     console.log(approve);
    
//   }
//   catch(e){
//     console.log(e);
    
//   }
  
// }

export const getallpending = async (req, res) => {
  try {
    const pending = await STUDENT.find()
      .populate("commonKey", "status").sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Pending students fetched successfully",
      students: pending,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching pending students",
    });
  }
};


// export const approvestd = async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
  

//   // try {
//   //   // ✅ Update status
//   //   const updated = await STUDENT.findByIdAndUpdate(
//   //     id,
//   //     { status: "approved" },
//   //     { new: true } // return updated document
//   //   );

//   //   // ✅ If student not found
//   //   if (!updated) {
//   //     return res.status(404).json({
//   //       success: false,
//   //       message: "Student not found",
//   //     });
//   //   }

//   //   // ✅ Success response
//   //   return res.status(200).json({
//   //     success: true,
//   //     message: "Student approved successfully",
//   //     student: updated,
//   //   });
//   // } catch (error) {
//   //   console.log(error);

//   //   return res.status(500).json({
//   //     success: false,
//   //     message: "Server error while approving student",
//   //   });
//   // }
// };


export const approvestd = async (req, res) => {
  const { id } = req.params; // this is Login ID (commonKey)
  console.log("Approve ID:", id);

  try {
    // ✅ Update Login status
    const updatedLogin = await LOGIN.findByIdAndUpdate(
      id,
      { status: true },
      { new: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({
        success: false,
        message: "Login record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student approved successfully",
      login: updatedLogin,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while approving student",
    });
  }
};

// export const rejectstd = async (req, res) => {
//   const { id } = req.params;

//   try {
//     // ✅ Update status to rejected
//     const updated = await STUDENT.findByIdAndUpdate(
//       id,
//       { status: "rejected" },
//       { new: true }
//     );

//     // ✅ If student not found
//     if (!updated) {
//       return res.status(404).json({
//         success: false,
//         message: "Student not found",
//       });
//     }

//     // ✅ Success response
//     return res.status(200).json({
//       success: true,
//       message: "Student rejected successfully",
//       student: updated,
//     });
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       success: false,
//       message: "Server error while rejecting student",
//     });
//   }
// };



export const rejectstd = async (req, res) => {
  const { id } = req.params; // Login ID

  try {
    // ✅ Set login status back to "false"
    const updatedLogin = await LOGIN.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );

    if (!updatedLogin) {
      return res.status(404).json({
        success: false,
        message: "Login record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Student rejected successfully",
      login: updatedLogin,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server error while rejecting student",
    });
  }
};


export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await FEEDBACK.find()
      .populate("studentId", "name email className") 
      .sort({ createdAt: -1 }); 

    return res.json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching feedback",
    });
  }
};



export const getAllEvents = async (req, res) => {
  try {
    const events = await EVENT.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      events,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Server error fetching events",
    });
  }
};



export const getVerifiedStudents = async (req, res) => {
  try {
    const loginVerifiedIds = await LOGIN.find({ status: true }).select("_id");
    
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


// export const markAttendance = async (req, res) => {
//   try {
//     const { eventId, students } = req.body;

//         console.log(students,"students============================================")


//     if (!eventId || !students || students.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Event ID and students list required",
//       });
//     }

//     const attendanceDocs = students.map((stdId) => ({
//       eventId,
//       studentId: stdId,
//       present: true,
//     }));

//             console.log(attendanceDocs,"attendanceDocs============================================")


//     // ✅ Insert attendance but ignore duplicates
//     await ATTENDANCE.insertMany(attendanceDocs, { ordered: false });

//     return res.json({
//       success: true,
//       message: "Attendance saved successfully!",
//     });

//   } catch (error) {
//     console.log(error);

//     // ✅ Duplicate inserts throw BulkWriteError — ignore
//     if (error.code === 11000) {
//       return res.json({
//         success: true,
//         message: "Attendance saved (duplicates ignored)",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Error saving attendance",
//     });
//   }
// };

  export const getAttendanceByEvent = async (req, res) => {
    try {
      const { eventId } = req.params;

      const attendance = await ATTENDANCE.find({ eventId })
        .select("studentId");

      const presentStudentIds = attendance.map(a => a.studentId.toString());

      return res.json({
        success: true,
        presentStudents: presentStudentIds,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error fetching attendance",
      });
    }
  };


  export const updateAttendance = async (req, res) => {
    console.log(req.body);
    
    try {
      const { eventId, presentStudents } = req.body;

      if (!eventId) {
        return res.status(400).json({ success: false, message: "Event ID required" });
      }

      // 1️⃣ Fetch all existing attendance records
      const existing = await ATTENDANCE.find({ eventId }).select("studentId");
      const existingIds = existing.map(a => a.studentId.toString());

      // 2️⃣ Students to ADD
      const toAdd = presentStudents.filter(id => !existingIds.includes(id));

      // 3️⃣ Students to REMOVE
      const toRemove = existingIds.filter(id => !presentStudents.includes(id));

      // Insert ADD records
      if (toAdd.length > 0) {
        const docs = toAdd.map(id => ({
          eventId,
          studentId: id,
          present: true
        }));
        await ATTENDANCE.insertMany(docs);
      }

      // Remove records
      if (toRemove.length > 0) {
        await ATTENDANCE.deleteMany({
          eventId,
          studentId: { $in: toRemove }
        });
      }

      return res.json({
        success: true,
        message: "Attendance updated successfully!",
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Error updating attendance",
      });
    }
  };



export const addPerformance = async (req, res) => {
  console.log(req.body , "reqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq");
  
  try {
    const { studentId, participationLevel, remarks, attendance } = req.body; 

    // ✅ Check if student exists
    const student = await STUDENT.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // ✅ Prevent duplicate performance entry
    const existing = await PERFORMANCE.findOne({ studentId });
    if (existing) {
      return res.status(400).json({ success: false, message: "Performance already added" });
    }

    // ✅ Create new record
    const newPerformance = new PERFORMANCE({
      studentId,
      participationLevel,
      remarks,
      attendance,
    });

    await newPerformance.save();

    return res.status(201).json({
      success: true,
      message: "Performance added successfully",
      data: newPerformance,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding performance",
    });
  }
};




export const getAllPerformances = async (req, res) => {
  try {
    const performances = await PERFORMANCE.find()
      .populate("studentId", "name regYear className department dob")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      performances,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching performances",
    });
  }
};


export const notification = async (req, res) => {
  const { batches, message } = req.body;

  try {
    // ✅ Create and save notification
    const newNotification = await NOTIFICATION.create({
      batches,
      message,
    });

    res.json({
      success: true,
      message: "Notification saved successfully",
      notification: newNotification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error saving notification",
    });
  }
};
