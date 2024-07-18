import { auth } from "@/server/auth";
import { UserButton } from "./user-button";
import { Button } from "../ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default async function Nav() {
  const session = await auth();
  //   console.log(session);

  return (
    <header className="bg-slate-500 py-4">
      <nav>
        <ul className="flex justify-between px-6">
          <li>Logo</li>
          {!session ? (
            <li>
              <Button asChild>
                <Link
                  aria-label="sign-in"
                  href="/auth/login"
                  className="flex gap-2"
                >
                  <LogIn size={16} />
                  <span>Login</span>
                </Link>
              </Button>
            </li>
          ) : (
            <li>
              <UserButton expires={session?.expires} user={session?.user} />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
