import bcrypt from "bcryptjs";
import LOGIN from "../Modals/Login.js";
import STUDENT from "../Modals/Student.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    

    const user = await LOGIN.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });
    }

    // ✅ Declare variable outside IF
    let fulldetails = null;

    if (user.role === "student") {
      fulldetails = await STUDENT.findOne({ commonKey: user._id });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      role: user.role,
      username: user.username,
      userid: user._id,
      status: user.status,
      fulldetails, // ✅ now accessible
    });

  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
