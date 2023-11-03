import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getCountries } from "@/services/locationsService";
export async function GET(req) {
  try {
    await connectMongoDb();
    const countries = await getCountries();

    return NextResponse.json({
      data: countries,
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
