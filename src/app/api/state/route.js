import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getStates } from "@/services/locationsService";
export async function GET(req) {
  try {
    await connectMongoDb();
    const states = await getStates();

    return NextResponse.json({
      data: states,
      message: "Countries returned Succesfully",
      status: 200,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
