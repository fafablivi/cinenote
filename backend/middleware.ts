import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { HTTP_STATUS } from "@/lib/httpStatus";

const secret = new TextEncoder().encode(process.env.SECRET_KEY!);

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/api/login") || pathname.startsWith("/api/register")) {
        return NextResponse.next();
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: HTTP_STATUS.UNAUTHORIZED });
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        return NextResponse.json({ error: "Invalid token" }, { status: HTTP_STATUS.FORBIDDEN });
    }
}

export const config = {
    matcher: ["/api/:path*"],
};
