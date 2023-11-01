import User from "@/models/user";

export const getUsers = async () => {
  try {
    const users = await User.find({}).select("-password");
    return users;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};

export const updatedUser = async (id, updatedUser) => {
  try {
    await User.findByIdAndUpdate(id, updatedUser);
  } catch (error) {
    throw error;
  }
};
