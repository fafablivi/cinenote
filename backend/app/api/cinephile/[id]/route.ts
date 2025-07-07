import { HTTP_STATUS } from "@/lib/httpStatus";
import { getCinephileById, updateCinephile } from "@/services/cinephileService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const cinephile = await getCinephileById(id);
        return NextResponse.json(
            { cinephile },
            { status: HTTP_STATUS.OK }
        );
    } catch (error) {
        console.error("Error fetching cinephile:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur de récupération du cinéphile" },
            { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
    }
}


export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const updates = await req.json();
        const updatedCinephile = await updateCinephile(id, updates);
        return NextResponse.json(
            { updatedCinephile },
            { status: HTTP_STATUS.OK }
        );
    } catch (error) {
        console.error("Error updating cinephile:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Erreur de mise à jour du cinéphile" },
            { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
    }
}