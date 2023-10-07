"use client";

import { signInRequest } from "@/service/signInRequest";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/utils/zod";
import { useToast } from "@/components/ui/use-toast";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import axiosApi from "@/service/axiosApi";

export const AuthContext = createContext({} as AuthContextType);

type PropType = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: String | null | undefined;
  signIn: (data: LoginForm) => Promise<void>;
  logueOut: () => void;
};

export function AuthProvider({ children }: PropType) {
  const [user, setUser] = useState<String | undefined>(undefined);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const cookieId: string | undefined = getCookie("userId");
    if (hasCookie("pomolist-token") && hasCookie("userId")) {
      setUser(cookieId);
    } else {
      setUser(undefined);
    }
  }, []);

  async function signIn({ email, password }: LoginForm) {
    const { token, id } = await signInRequest({
      email,
      password,
    });

    if (!token) {
      toast({
        variant: "destructive",
        description: "Usuario ou senha invalida!",
      });
      return;
    }

    setCookie("pomolist-token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });
    setCookie("userId", id, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    axiosApi.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(id);

    router.push("/todolist");
  }
  function logueOut() {
    deleteCookie("pomolist-token");
    deleteCookie("userId");
    setUser(undefined);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ signIn, user, logueOut }}>
      {children}
    </AuthContext.Provider>
  );
}
