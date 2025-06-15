import { clsx, type ClassValue } from "clsx"
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge"
import { User } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const fetchUsers = async ({token,setUsers,setIsLoading}:{token:string | null,setUsers: Dispatch<SetStateAction<User[]>>,setIsLoading: Dispatch<SetStateAction<boolean>>}) => {
  try {
    const response = await fetch("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (data.success && data.users) {
      setUsers(data.users);
    } else {
      console.error("Failed to fetch users");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    setIsLoading(false);
  }
};