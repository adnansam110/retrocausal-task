import { connectMongoDb } from "@/lib/mongoDb";
import { registerUser } from "@/services/authService";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { emailValidationPattern } from "@/constants/validators";
export async function POST(req) {
  try {
    const { username, password, email, country, state, city } =
      await req.json();
    const emailPattern = emailValidationPattern;
    if (!emailPattern.test(email)) {
      return NextResponse.json({
        message: "Invalid Email",
        status: 400,
      });
    }
    await connectMongoDb();
    const hashedPassword = await bcrypt.hash(password, 10);
    await registerUser({
      username,
      password: hashedPassword,
      email,
      country,
      state,
      city,
    });

    return NextResponse.json({
      message: "User Registered Succesfully",
      status: 200,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
