"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";
import UserCard from "@/components/admin/UserCard";
import CreateUserForm from "@/components/admin/CreateUserForm";
import { fetchUsers } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/admin/login");
      return;
    }

    fetchUsers({token,setUsers,setIsLoading});
  }, [token, isAuthenticated, router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Users</h1>
        <div className="flex gap-4">
         
              <CreateUserForm />
            
     
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"  suppressHydrationWarning>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">No users found</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}