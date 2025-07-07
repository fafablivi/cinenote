import { HTTP_STATUS } from "@/lib/httpStatus";
import { register } from "@/services/authService";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Tous les champs sont requis" },
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }

        try {
            const token = await register(name, email, password);
            return NextResponse.json(
                { token },
                { status: HTTP_STATUS.CREATED }
            );
        } catch (error) {
            return NextResponse.json(
                { error: error instanceof Error ? error.message : "Erreur d'inscription" },
                { status: HTTP_STATUS.BAD_REQUEST }
            );
        }


    } catch (error) {
        console.error("Erreur d'inscription:", error);
        return new Response(JSON.stringify({ error: "Erreur d'inscription" }), { status: 500 });
    }
}
