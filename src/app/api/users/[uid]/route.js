import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { deleteUser, updatedUser } from "@/services/usersService";
export async function DELETE(req, content) {
  try {
    const id = content.params.uid;
    await connectMongoDb();
    await deleteUser(id);

    return NextResponse.json({
      message: "Users deleted Succesfully",
      status: 200,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
export async function PUT(req, content) {
  try {
    const id = content.params.uid;
    const user = await req.json();
    await connectMongoDb();
    await updatedUser(id, user);

    return NextResponse.json({
      message: "Users Updated Succesfully",
      status: 200,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
