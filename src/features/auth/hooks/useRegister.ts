import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { registerSchema } from "../schema/register.schema";
import type { RegisterFormType } from "../types/register.type";

import { supabase } from "@/shared/lib/supabaseClient";
import { useNotifications } from "@/shared/components/notifications/useNotification";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { showSuccess, showError } = useNotifications();

  const navigate = useNavigate();

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

      showSuccess("Registered successfully");

      setTimeout(() => {
        // TODO: navigate to user panel
        navigate("/");
      }, 1000);
    } catch (err: any) {
      switch (err.code) {
        case "user_already_exists":
          showError("Email is already existed, Log in to your account.");
          break;

        default:
          showError(err.message || "An error occurred during register");
          break;
      }

      setIsLoading(false);
    }
  };

  return { form, onSubmit, isLoading };
};
