// TODO: fix differnt colors of orange
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PencilRuler } from "lucide-react";
import { UserNav } from "@/components/navbar/user-nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { User } from "next-auth";
// import { signIn } from "@/auth";
import { signIn } from "next-auth/react";

export function Navbar({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const isAdmin = true; // TODO: implement should be in the user db object

  const navItems = [
    { name: "Nachhilfe suchen", href: "/angebote" },
    { name: "Nachhilfe anbieten", href: "/angebote/meine-angebote" },
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
                {name}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-destructive",
                  pathname === "/admin"
                    ? "text-destructive underline "
                    : "text-muted-foreground",
                )}
              >
                Seitenadministration
              </Link>
            )}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <UserNav user={user} pathname={pathname} />
          ) : (
            <Button
              variant="default"
              onClick={() =>
                signIn("microsoft-entra-id", { redirectTo: pathname })
              }
            >
              Anmelden
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
