import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserDetails({ user }: { user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Name</h3>
            <p className="text-lg">{user.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="text-lg">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
            <p className="text-lg">{user.contactNumber}</p>
          </div>
          {/* Add more user details as needed */}
        </div>
      </CardContent>
    </Card>
  );
}