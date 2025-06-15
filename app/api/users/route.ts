import { NextResponse } from "next/server";
import { ApiResponse, User } from "@/lib/types";
import { MOCK_TOKEN } from "@/lib/constants";
import { mockUsers } from "@/data";


export async function GET(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];

    if (token !== MOCK_TOKEN) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    const response: ApiResponse = {
        success: true,
        users: mockUsers,
    };

    return NextResponse.json(response);
}

export async function POST(request: Request) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
  
    if (token !== MOCK_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
  
    try {
      const userData = await request.json();
      
      if (!userData.name || !userData.email || !userData.contactNumber) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }
  
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };
  
      mockUsers.push(newUser);
  
      return NextResponse.json(
        { success: true, user: newUser },
        { status: 201 }
      );
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Error creating user" },
        { status: 500 }
      );
    }
  }


