"use client";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { Button } from "./ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AvatarIcon } from "./UserButton";

export const Header = () => {
  const { user, logueOut } = useContext(AuthContext);

  return (
    <header className="flex justify-end gap-3 p-3 max-w-7xl m-auto">
      <ThemeButton />
      {user ? (
        <AvatarIcon onClick={logueOut} />
      ) : (
        <>
          <Button className="hover:bg-opacity-50 bg-black ">
            <Link href="/signup">Sign in</Link>
          </Button>
          <Button className="hover:bg-opacity-50 bg-black">
            <Link href="/login">Login</Link>
          </Button>
        </>
      )}
    </header>
  );
};
