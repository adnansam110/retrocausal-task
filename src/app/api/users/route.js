import { connectMongoDb } from "@/lib/mongoDb";
import { NextResponse } from "next/server";
import { getUsers } from "@/services/usersService";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      const url = new URL(req.url);
      const page = url.searchParams.get("page") || 1;
      const limit = url.searchParams.get("limit") || 2;
      const search = url.searchParams.get("search") || "";
      const sortBy = url.searchParams.get("sortBy") || "username";
      await connectMongoDb();
      const usersData = await getUsers(page, limit, search, sortBy);
      return NextResponse.json({
        data: usersData,
        message: "Users returned Succesfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "User Unauthorized",
      status: 401,
    });
  } catch (err) {
    throw NextResponse.json({
      message: err,
      status: 500,
    });
  }
}
