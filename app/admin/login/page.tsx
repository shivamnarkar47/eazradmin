"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ADMIN_CONTACT_NUMBER } from "@/lib/constants";

export default function AdminLoginPage() {
  const [contactNumber, setContactNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"number" | "otp">("number");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      if (contactNumber !== ADMIN_CONTACT_NUMBER) {
        toast.error("Error",{
          description: "Only admin contact number is allowed for this demo",
          
        });
        return;
      }

      const response = await fetch("https://eazrdaily.eazr.in/auth/admin/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contactNumber }),
      });

      const data = await response.json();
      console.log(data)
      
      if (data.message == "Success") {
        setStep("otp");
        toast("OTP Sent",{
          description: "Please check your phone for the OTP",
        });
      } else {
        toast.error("Error",{
          description: data.message || "Failed to send OTP",
        });
      }
    } catch (error) {
      toast.error("Error",{
        description: "An error occurred while sending OTP",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    try {
      const isLoggedIn = await login(contactNumber, otp);
      if (isLoggedIn) {
        toast.success("Success",{
          description: "Logged in successfully",
        });
        router.push("/admin/dashboard");
      } else {
        toast.error("Error",{
          description: "Invalid OTP",

        });
      }
    } catch (error) {
      toast.error("Error",{
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-8   rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        
        {step === "number" ? (
          <div className="space-y-4 ">
            <div className=" px-4 py-6 rounded border">
              <Label htmlFor="contactNumber" className="pb-3">Contact Number</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                placeholder="Enter your contact number"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleSendOtp}
              disabled={!contactNumber || isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="otp" className="py-3">OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
            <Button
              className="w-full"
              onClick={handleVerifyOtp}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>
            <Button
              variant="ghost"
              className="w-full"
              onClick={() => setStep("number")}
            >
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}