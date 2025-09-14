import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { loginSchema } from "../schema/login.scheme";
import type { LoginFormType } from "../types/login.type";

import { supabase } from "@/shared/lib/supabaseClient.ts";
import { useNotifications } from "@/shared/components/notifications/useNotification";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { showSuccess, showError } = useNotifications();

  const navigate = useNavigate();

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

      showSuccess("Logged in successfully");

      setTimeout(() => {
        // TODO: navigate to user panel
        navigate("/");
      }, 1000);
    } catch (err: any) {
      switch (err.code) {
        case "invalid_credentials":
          showError("Email or password is wrong, try again");
          break;

        default:
          showError(err.message || "An error occurred during login");
          break;
      }
      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
};
