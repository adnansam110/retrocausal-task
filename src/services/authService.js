import User from "@/models/user";

export const registerUser = async (data) => {
  console.log("🚀 ~ file: authService.js:4 ~ registerUser ~ data:", data);
  const { email } = data;
  console.log("🚀 ~ file: authService.js:4 ~ registerUser ~ data:", data);
  const userExists = await User.findOne({ email }).select("_id");
  if (!!userExists) {
    throw "User Already Exists";
  }
  console.log("🚀 ~ file: authService.js:4 ~ registerUser ~ data:", data);
  await User.create(data);
};
