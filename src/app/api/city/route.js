import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getCities } from "@/services/locationsService";
export async function GET(req) {
  try {
    await connectMongoDb();
    const cities = await getCities();

    return NextResponse.json({
      data: cities,
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
