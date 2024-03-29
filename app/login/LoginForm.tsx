"use client";

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { safeUser } from "@/types";

interface currentUser {
  currentUser: safeUser | null;
}

const LoginForm: React.FC<currentUser> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/");
      router.refresh();
    }
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return <p className="text-center">Logged In. Redirecting..</p>;
  }

  function handleForgot() {
    toast.success("Check your email");



  }
  return (
    // <>
    //   <Heading title="Sign In for E-shop" />
    //   <Button
    //     outlined
    //     label="Continue with Google"
    //     Icon={AiOutlineGoogle}
    //     onclick={() => {
    //       signIn("google");
    //     }}
    //   />
    //   <hr className="bg-slate-300 w-full h-px" />

    //   <Input
    //     id="email"
    //     label="Email"
    //     disabled={isLoading}
    //     register={register}
    //     errors={errors}
    //     type="email"
    //     required
    //   />
    //   <div className="w-full h-24">
    //     <Input
    //       id="password"
    //       label="Password"
    //       disabled={isLoading}
    //       register={register}
    //       errors={errors}
    //       type="password"
    //       required
    //     />
    //     <p className="text-md">
    //       <Link className=" absolute right-96 mr-12 mt-3 mb-3" href="/reset">
    //         Forgot Password
    //       </Link>
    //     </p>
    //   </div>

    //   <div style={{ width: "30vw" }}>
    //     <Button
    //       label={isLoading ? "Loading" : "Loign"}
    //       onclick={handleSubmit(onSubmit)}
    //     />
    //   </div>
    //   <p className="text-sm">
    //     Do not have an account?{" "}
    //     <Link className="underline" href="/register">
    //       Signup
    //     </Link>
    //   </p>
    // </>
    <>
    <Heading title="Sign In for E-shop" />
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
      id="email"
      label="Email"
      disabled={isLoading}
      register={register}
      errors={errors}
      type="email"
      required
    />
    <div className="w-full h-24 flex flex-col justify-between">
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <p className="text-md self-end">
        <Link href="/reset">
          Forgot Password
        </Link>
      </p>
    </div>

    <div style={{ width: "30vw" }}>
      <Button
        label={isLoading ? "Loading" : "Loign"}
        onclick={handleSubmit(onSubmit)}
      />
    </div>
    <p className="text-sm">
      Do not have an account?{" "}
      <Link className="underline" href="/register">
        Signup
      </Link>
    </p>
  </>
  );
};

export default LoginForm;
