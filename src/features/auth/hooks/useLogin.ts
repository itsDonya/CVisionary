import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/shared/lib/supabaseClient.ts";
import { loginSchema } from "../schema/login.scheme";
import type { LoginFormType } from "../types/login.type";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormType) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (authError) {
        throw authError;
      }

      // TODO: remove
      console.log("Login successful:", authData);

      window.location.href = "/panel";
    } catch (err: any) {
      switch (err.code) {
        case "invalid_credentials":
          setError("Email or password is wrong, try again");
          break;

        default:
          setError(err.message || "An error occurred during login");
          break;
      }
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading, error };
};
