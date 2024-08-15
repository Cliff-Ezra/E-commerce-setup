"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
  TruckIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useState } from "react";
import { Switch } from "../ui/switch";

export const UserButton = ({ user }: Session) => {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(false);

  function setSwitchState() {
    switch (theme) {
      case "dark":
        return setChecked(true);
      case "light":
        return setChecked(false);
      case "system":
        return setChecked(false);
    }
  }

  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 p-4 flex flex-col gap-1 items-center rounded-lg bg-primary/15">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={36}
                height={36}
              />
            )}
            <p className="font-bold text-xs">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group py-2 font-medium cursor-pointer transition-all duration-500 ease-in-out">
            <TruckIcon
              size={14}
              className="mr-3 group-hover:translate-x-1 ease-in-out"
            />
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem className="group py-2 font-medium cursor-pointer transition-all duration-500 ease-in-out">
            <SettingsIcon
              size={14}
              className="mr-3 group-hover:rotate-180 ease-in-out"
            />
            Settings
          </DropdownMenuItem>
          {theme && (
            <DropdownMenuItem className="py-2 font-medium cursor-pointer transition-all duration-500 ease-in-out">
              <div
                onClick={(e) => e.stopPropagation()}
                className="group flex items-center"
              >
                <div className="relative flex mr-3">
                  <SunIcon
                    size={14}
                    className="absolute group-hover:text-yellow-600 group-hover:rotate-180 dark:scale-0 dark:-rotate-90 transition-all duration-500 ease-in-out"
                  />
                  <MoonIcon
                    size={14}
                    className="group-hover:text-blue-400 dark:scale-100 scale-0"
                  />
                </div>
                <p className="dark:text-blue-400 text-secondary-foreground/75 text-yellow-600">
                  {theme[0].toUpperCase() + theme?.slice(1)} Mode
                </p>
                <Switch
                  className="scale-75 ml-2"
                  checked={checked}
                  onCheckedChange={(e) => {
                    setChecked((prev) => !prev);
                    console.log(e);
                    if (e) setTheme("dark");
                    if (!e) setTheme("light");
                  }}
                />
              </div>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            className="group focus:bg-destructive/30 py-2 font-medium cursor-pointer transition-all duration-500"
            onClick={() => signOut()}
          >
            <LogOutIcon
              size={14}
              className="mr-3 group-hover:scale-75 ease-in-out"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
