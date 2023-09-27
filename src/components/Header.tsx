import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { Button } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex justify-end gap-3 p-3">
      <ThemeButton />
      <Button className="hover:bg-opacity-50 bg-black ">
        <Link href="/signup">Sign in</Link>
      </Button>
      <Button className="hover:bg-opacity-50 bg-black">
        <Link href="/login">Login</Link>
      </Button>
    </header>
  );
};
