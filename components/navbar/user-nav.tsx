"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { User } from "next-auth";
import { useState, useEffect } from "react";

export function UserNav({ user, pathname }: { user: User; pathname: string }) {
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    undefined,
  );
  const [initials, setInitials] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user.image) {
      setProfilePicture(user.image);
    }
    if (user.name) {
      setInitials(
        user.name
          .split(" ")
          .map((n: string) => n[0])
          .join(""),
      );
    }
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePicture} alt={user?.name || undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/angebote/meine-angebote" className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Meine Angebote</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut({ redirectTo: pathname })}
          className="cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4 text-foreground" />
          Abmelden
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
