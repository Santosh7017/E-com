"use client";

import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { safeUser } from "@/types";

interface RegisterFormProps {
  currentUser: safeUser | null;
}
const RegisterForm: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const { password, email } = data;
    const requirements = [
      // Must be at least 8 characters
      password.length >= 8,
      // Must contain at least 1 uppercase letter
      /[A-Z]/.test(password),
      // Must contain at least 1 lowercase letter
      /[a-z]/.test(password),
      // Must contain at least 1 number
      /\d/.test(password),
       // Email format check
       /^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.com$/.test(email)

    ];

    // If all requirements are met, password is valid
    const isValid = requirements.every(Boolean);

    if (isValid) {
      axios
        .post("/api/register", data)
        .then(() => {
          toast.success("Account Created");
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          }).then((callback) => {
            if (callback?.ok) {
              router.push("/cart");
              router.refresh();
              toast.success("Logged In");
            }
            if (callback?.error) {
              toast.error(callback.error);
            }
          });
        })
        .catch(() => toast.error("Email already present"))
        .finally(() => setIsLoading(false));
    } else {
      toast.error("Enter a valid Email or password");
      setIsLoading(false);
      return null;
    }
  };

  if (currentUser) {
    return <p className="text-center">Logged In. Redirecting..</p>;
  }

  return (
    <>
      <Heading title="Sign up for E-shop" />
      <Button
        outlined
        label="Continue with Google"
        Icon={AiOutlineGoogle}
        onclick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="email"
        required
      />
      <Input
        id="password"
        label="Password: 8 characters 1 UpperCase 1 LowerCase and 1 Digit"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Button
        label={isLoading ? "Loading" : "Sign Up"}
        onclick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
