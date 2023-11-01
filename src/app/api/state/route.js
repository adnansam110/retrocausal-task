import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getStates } from "@/services/locationsService";
export async function GET(req) {
  try {
    await connectMongoDb();
    const states = await getStates();
    console.log("🚀 ~ file: route.js:8 ~ GET ~ countries:", states);

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
