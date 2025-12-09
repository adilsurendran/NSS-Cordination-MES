

import COMPLAINT from "../Modals/Complaint.js";
import CORDINATOR from "../Modals/Cordinator.js";

// export const addCoordinator = async (req, res) => {
//   try {
//     const { name, email, phone, department } = req.body;

//     if (!name || !email || !phone || !department) {
//       return res.status(400).json({ success: false, message: "All fields are required." });
//     }

//     // Check if coordinator already exists by email
//     const existing = await CORDINATOR.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ success: false, message: "Coordinator already exists." });
//     }

//     // ✅ Find the last coordinator based on creation date
//     const lastCoordinator = await CORDINATOR.findOne().sort({ createdAt: -1 });

//     let nextId = "001";
//     if (lastCoordinator && lastCoordinator.cordinatorId) {
//       // Extract only the number part from "CORD001"
//       const match = lastCoordinator.cordinatorId.match(/\d+/);
//       const lastNum = match ? parseInt(match[0]) : 0;
//       const newNum = lastNum + 1;
//       nextId = newNum.toString().padStart(3, "0");
//     }

//     // ✅ Final formatted ID (you can change prefix)
//     const formattedId = `CORD${nextId}`;

//     // ✅ Create new coordinator document
//     const newCoordinator = new CORDINATOR({
//       name,
//       email,
//       phone,
//       department,
//       cordinatorId: formattedId
//     });

//     await newCoordinator.save();

//     return res.status(201).json({
//       success: true,
//       message: "Coordinator added successfully!",
//       coordinator: newCoordinator,
//     });

//   } catch (error) {
//     console.error("Error adding coordinator:", error);
//     return res.status(500).json({ success: false, message: "Server error, please try again." });
//   }
// };


// export const getallcordinators = async(req,res)=>{
//     try{
//         const allcord = CORDINATOR.find()
//     }
//     catch(e){
//         console.log(e);
        
//     }

// }

import LOGIN from "../Modals/Login.js";
import bcrypt from "bcryptjs";
import STUDENT from "../Modals/Student.js";
import PERFORMANCE from "../Modals/Performance.js";

export const addCoordinator = async (req, res) => {
  try {
    const { name, email, phone, department, password } = req.body;

    // ✅ Validate required fields
    if (!name || !email || !phone || !department || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields (name, email, phone, department, password) are required.",
      });
    }

    // ✅ Check if coordinator already exists
    const existing = await CORDINATOR.findOne({ email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Coordinator already exists with this email.",
      });
    }

    // ✅ Generate next sequential coordinator ID
    const lastCoordinator = await CORDINATOR.findOne().sort({ createdAt: -1 });
    let nextId = "001";
    if (lastCoordinator && lastCoordinator.cordinatorId) {
      const match = lastCoordinator.cordinatorId.match(/\d+/);
      const lastNum = match ? parseInt(match[0]) : 0;
      const newNum = lastNum + 1;
      nextId = newNum.toString().padStart(3, "0");
    }
    const formattedId = `CORD${nextId}`;

    // ✅ Hash password from frontend
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Step 1: Create login record
    const loginRecord = new LOGIN({
      username: email,
      password: hashedPassword,
      role: "cordinator",
      status: true,
    });
    await loginRecord.save();

    // ✅ Step 2: Create coordinator record linked to login `_id`
    const newCoordinator = new CORDINATOR({
      name,
      email,
      phone,
      department,
      cordinatorId: formattedId,
      password: hashedPassword,
      commonKey: loginRecord._id, // references Login
    });
    await newCoordinator.save();

    // ✅ Step 3: Respond success
    res.status(201).json({
      success: true,
      message: "Coordinator added successfully!",
      coordinator: newCoordinator,
    });

  } catch (error) {
    console.error("Error adding coordinator:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding coordinator.",
      error: error.message,
    });
  }
};



export const getAllCoordinators = async (req, res) => {
  try {
    // ✅ Fetch all coordinators, newest first
    const allcord = await CORDINATOR.find().sort({ createdAt: -1 });

    if (!allcord || allcord.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No coordinators found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Coordinators fetched successfully.",
      total: allcord.length,
      coordinators: allcord,
    });
  } catch (e) {
    console.error("Error fetching coordinators:", e);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching coordinators.",
      error: e.message,
    });
  }
};


// export const editcordinator = async(req,res)=>{
//     const {id} = req.params
//     const {name,phone,department} = req.body

//     console.log(id,name,phone,department);
    
// }



export const editcordinator = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, department } = req.body;

    // Validate inputs
    if (!id || !name || !phone || !department) {
      return res.status(400).json({
        success: false,
        message: "All fields (id, name, phone, department) are required.",
      });
    }

    // Check if coordinator exists
    const existingCoordinator = await CORDINATOR.findById(id);
    if (!existingCoordinator) {
      return res.status(404).json({
        success: false,
        message: "Coordinator not found.",
      });
    }

    // ✅ Update the record
    existingCoordinator.name = name;
    existingCoordinator.phone = phone;
    existingCoordinator.department = department;

    // Save updated record
    const updatedCoordinator = await existingCoordinator.save();

    return res.status(200).json({
      success: true,
      message: "Coordinator updated successfully!",
      coordinator: updatedCoordinator,
    });
  } catch (error) {
    console.error("Error updating coordinator:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating coordinator.",
      error: error.message,
    });
  }
};

// export const deletecord = async(req,res)=>{
//     const {id} = req.params
//     // console.log(id);
    
// }


export const deletecord = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Coordinator ID is required.",
      });
    }

    // ✅ Find and delete coordinator
    const deletedCord = await CORDINATOR.findByIdAndDelete(id);

    if (!deletedCord) {
      return res.status(404).json({
        success: false,
        message: "Coordinator not found.",
      });
    }

    // ✅ Success response
    return res.status(200).json({
      success: true,
      message: "Coordinator deleted successfully!",
      deleted: deletedCord,
    });
  } catch (error) {
    console.error("Error deleting coordinator:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting coordinator.",
      error: error.message,
    });
  }
};



export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await COMPLAINT.find()
      .populate("studentId", "name email className")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      complaints,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching complaints",
    });
  }
};


export const replyToComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const complaint = await COMPLAINT.findByIdAndUpdate(
      id,
      { reply, status: "replied" },
      { new: true }
    );

    return res.json({
      success: true,
      message: "Reply sent successfully!",
      complaint,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error sending reply",
    });
  }
};


export const getstudents = async (req,res)=>{
  try{
    const students = await STUDENT.find().sort({ createdAt: -1 });
if (!students) {
      return res.status(404).json({
        success: false,
        message: "students not found.",
      });
    }
    return res.status(200).json({status:200, message:"Students", students})
  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error sending reply",
    });
    
  }
}

export const getperformance = async(req,res)=>{
  try{
    const performance = await PERFORMANCE.find().populate("studentId", "name className phone").sort({createdAt: -1})
    console.log(performance);
    if (!performance) {
      return res.status(404).json({
        success: false,
        message: "performances not found.",
      });
    }
        return res.status(200).json({status:200, message:"performance", performance})
  }
    catch(e){
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error sending reply",
    });
    
  }

}