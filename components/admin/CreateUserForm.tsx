"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function CreateUserForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
    });
    const [closed,setClosed] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("adminToken")}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Success", {
                    description: "User created successfully",
                });
                router.refresh(); // Refresh the user list
                setFormData({ name: "", email: "", contactNumber: "" }); // Reset form
                setClosed(!closed)
            } else {
                throw new Error(data.message || "Failed to create user");
            }
        } catch (error) {
            toast.error("Error", {
                description: error instanceof Error ? error.message : "An error occurred",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={closed} onOpenChange={()=>setClosed(!closed)} >
            <DialogTrigger asChild >
                <Button>Create User</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4"  suppressHydrationWarning>
                    <div>
                        <Label htmlFor="name" className="py-4">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="pb-4">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label htmlFor="contactNumber" className="pb-4">Contact Number</Label>
                        <Input
                            id="contactNumber"
                            name="contactNumber"
                            type="tel"
                            required
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Creating..." : "Create User"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}