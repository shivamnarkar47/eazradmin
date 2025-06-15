import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserCard({ user }: { user: User }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Email: {user.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Phone: {user.contactNumber}</p>
                <Link href={`/admin/users/${user.id}`}>
                    <Button  variant="outline" className="w-full">
                        View Details
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}