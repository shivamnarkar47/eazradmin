"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAuth();

    const routes = [
        {
            href: "/",
            label: "Home",
            active: pathname === "/",
        },
        {
            href: "/admin/dashboard",
            label: "Dashboard",
            active: pathname === "/admin/dashboard",
            protected: true,
        },
    ];

    return (
        <header className="border-b">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-lg font-semibold">AdminDash</span>
                </Link>

                <nav className="flex items-center space-x-4">
                    {routes.map((route) => {
                        if (route.protected && !isAuthenticated()) return null;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={`text-sm font-medium transition-colors hover:text-primary ${route.active ? "dark:text-white font-bold text-black" : "text-muted-foreground"
                                    }`}
                            >
                                {route.label}
                            </Link>
                        );
                    })}

                    {isAuthenticated() ? (
                        <Button variant="outline" size="sm" onClick={logout}>
                            Logout
                        </Button>
                    ) : (
                        <Link href="/admin/login">
                            <Button asChild size="sm">
                                Login
                            </Button>
                        </Link>
                    )}

                    <ModeToggle />
                </nav>
            </div>
        </header>
    );
};

export default Navbar;