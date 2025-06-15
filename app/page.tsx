import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen  " suppressHydrationWarning>
      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Modern Admin Dashboard
          </h1>
          
          <p className="text-lg md:text-xl  mb-10">
            Secure, efficient, and beautifully designed admin interface with OTP authentication, 
            user management, and real-time analytics.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/admin/login">
                Get Started
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <section id="features" className="py-16 ">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border  ">
              <h3 className="text-xl font-semibold mb-3">Secure Authentication</h3>
              <p className="text-gray-600 dark:text-gray-500">
                OTP-based login flow with token management for maximum security.
              </p>
            </div>
            <div className="p-6 rounded-lg border  ">
              <h3 className="text-xl font-semibold mb-3">User Management</h3>
              <p className="text-gray-600 dark:text-gray-500">
                View and manage all users with detailed profiles and analytics.
              </p>
            </div>
            <div className="p-6 rounded-lg border  ">
              <h3 className="text-xl font-semibold mb-3">Modern Interface</h3>
              <p className="text-gray-600 dark:text-gray-500">
                Clean, accessible UI built with shadcn/ui and Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t   mt-12">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p suppressHydrationWarning>© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}