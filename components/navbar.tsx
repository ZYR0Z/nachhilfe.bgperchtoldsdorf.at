// TODO: fix differnt colors of orange
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PencilRuler } from "lucide-react";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { User } from "next-auth";

export function Navbar({ user }: { user: User | undefined }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Nachhilfe suchen", href: "/nachhilfe-suchen" },
    { name: "Nachhilfe anbieten", href: "/nachhilfe-anbieten" },
  ];

  return (
    <header className="px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            className="font-bold text-xl text-primary flex items-center gap-2"
          >
            <PencilRuler />
            Nachhilfe
          </Link>
          <nav className="hidden md:flex gap-6">
            {navItems.map(({ href, name }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === href
                    ? "text-foreground underline "
                    : "text-muted-foreground",
                )}
              >
                {" "}
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserNav user={user} />
          ) : (
            <Button asChild variant="default">
              <Link href="/api/auth/signin">Anmelden</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
