const User = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name profilePicture"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, profilePicture, bio } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;
    if (bio) user.bio = bio;

    await user.save();
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    return res.status(500).json({ message: "Error updating user", error });
  }
};

module.exports = { getUserById, updateUser };
