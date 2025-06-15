import { NextResponse } from "next/server";
import { ADMIN_CONTACT_NUMBER, DEFAULT_OTP, MOCK_TOKEN } from "@/lib/constants";
import { ApiResponse } from "@/lib/types";

export async function POST(request: Request) {
  const { contactNumber } = await request.json();

  // Mock response
  const response: ApiResponse = {
    success: contactNumber === ADMIN_CONTACT_NUMBER,
    message: contactNumber === ADMIN_CONTACT_NUMBER 
      ? "OTP sent successfully" 
      : "Only admin contact number is allowed",
  };

  return NextResponse.json(response);
}

export async function PUT(request: Request) {
  const { contactNumber, otp } = await request.json();

  // Mock verification
  const response: ApiResponse = {
    success: contactNumber === ADMIN_CONTACT_NUMBER && otp === DEFAULT_OTP,
    message: contactNumber === ADMIN_CONTACT_NUMBER && otp === DEFAULT_OTP
      ? "OTP verified successfully"
      : "Invalid OTP",
    token: contactNumber === ADMIN_CONTACT_NUMBER && otp === DEFAULT_OTP
      ? MOCK_TOKEN
      : undefined,
  };

  return NextResponse.json(response);
}