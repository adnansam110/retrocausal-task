import { connectMongoDb } from "@/lib/mongoDb";
import { registerUser } from "@/services/authService";
import { NextResponse } from "next/server";
import { getUsers } from "@/services/usersService";
export async function GET(req) {
  try {
    await connectMongoDb();
    const users = await getUsers();

    return NextResponse.json({
      data: users,
      message: "Users returned Succesfully",
      status: 200,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
