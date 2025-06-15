"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import UserDetails from "@/components/admin/UserDetails";
import { User } from "@/lib/types";

export default function UserDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user",data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, token, isAuthenticated, router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button onClick={() => router.push("/admin/dashboard")} variant="outline">
          Back to Dashboard
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading user details...</div>
      ) : user ? (
        <UserDetails user={user} />
      ) : (
        <div className="text-center py-8">User not found</div>
      )}
    </div>
  );
}