import { mockUsers } from "@/data";
import { MOCK_TOKEN } from "@/lib/constants";
import { ApiResponse, User } from "@/lib/types";
import { NextResponse } from "next/server";




export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (token !== MOCK_TOKEN) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const user = mockUsers.find((u) => u.id === id);
    const response: ApiResponse = {
        success: !!user,
        user: user,
        message: user ? undefined : "User not found",
    };

    return NextResponse.json(response);
}

