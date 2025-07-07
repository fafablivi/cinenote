import { HTTP_STATUS } from "@/lib/httpStatus";
import { login } from "@/services/authService";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { identifier, password } = await req.json();
        if (!identifier || !password) {
            return NextResponse.json(
                { error: "L'identifiant et le mot de passe sont requis." },
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }
        try {
            const token = await login(identifier, password);
            return NextResponse.json(
                { token },
                { status: HTTP_STATUS.OK }
            );
        } catch (error) {
            return NextResponse.json(
                { error: error instanceof Error ? error.message : "Erreur de connexion" },
                { status: HTTP_STATUS.UNAUTHORIZED }
            );
        }
    } catch (error) {
        console.error("Login error:", error);
        return new Response(JSON.stringify({ error: "Erreur de connexion" }), { status: HTTP_STATUS.INTERNAL_SERVER_ERROR });
    }
}