import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// Get all user except the logged in user:
export const getUsersForSidebar = async (req, res) => {
  try {
    const userId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    // Count no of messages not seen:
    const unseenMessages = {};
    const promises = filteredUsers.map(async () => {
      const messages = await Message.find({
        senderId: user._id,
        receiverId: userId,
        seen: false,
      });

      if (messages.length > 0) {
        unseenMessages[user._id] = messages.length;
      }
    });
    await Promise.all(promises);
    res.json({
      success: true,
      users: filteredUsers,
      unseenMessages,
    });
  } catch (error) {
    console.log("Erorr occured ==> ", error.message);
    res.json({
      success: false,
      message: "Error occured ==>" + error.message,
    });
  }
};
