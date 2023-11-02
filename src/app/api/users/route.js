import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getUsers } from "@/services/usersService";
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page") || 0;
    const limit = url.searchParams.get("limit") || 5;
    const search = url.searchParams.get("search") || "";
    const sortBy = url.searchParams.get("sortBy") || "username";
    await connectMongoDb();
    const usersData = await getUsers(page, limit, search, sortBy);

    return NextResponse.json({
      data: usersData,
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
