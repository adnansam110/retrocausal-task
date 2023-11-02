import User from "@/models/user";

export const getUsers = async (page, limit, search, sortBy) => {
  try {
    const users = await User.find({})
      .or([
        {
          username: new RegExp(search, "i"),
        },
        {
          email: new RegExp(search, "i"),
        },
        {
          country: new RegExp(search, "i"),
        },
        {
          city: new RegExp(search, "i"),
        },
        {
          state: new RegExp(search, "i"),
        },
      ])
      .skip(limit * (page - 1))
      .limit(limit)
      .sort(sortBy)
      .select("-password");
    const count = await getUserCount(search);
    return { users, count };
  } catch (error) {
    throw error;
  }
};

export const getUserCount = async (search) => {
  try {
    const count = await User.find({})
      .or([
        {
          username: new RegExp(search, "i"),
        },
        {
          email: new RegExp(search, "i"),
        },
        {
          country: new RegExp(search, "i"),
        },
        {
          city: new RegExp(search, "i"),
        },
        {
          state: new RegExp(search, "i"),
        },
      ])
      .count();
    return count;
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
