import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/shared/lib/supabaseClient";
import { registerSchema } from "../schema/register.schema";
import type { RegisterFormType } from "../types/register.type";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormType) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name, // saving name in metadata
          },
        },
      });

      if (authError) {
        throw authError;
      }

      // TODO: remove
      console.log("Registration successful:", authData);

      // window.location.href = "/panel";
      window.location.href = "/";
    } catch (err: any) {
      switch (err.code) {
        case "user_already_exists":
          setError("Email is already existed, Log in to your account.");
          break;

        default:
          setError(err.message || "An error occurred during register");
          break;
      }

      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading, error };
};
