"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "./Heading";
import Input from "./inputs/Input";
import Button from "./Button";
import { useState } from "react";
import { mailAction } from "@/actions/mailAction";
import toast from "react-hot-toast";

const InputEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Add reset function from react-hook-form
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email } = data;
    console.log(email);

    const info = await mailAction({ email }).catch((error) => {
      toast.error("Email not found");
    });

    if (info) {
      toast.success("Check your Email");
    }
    reset();
  };

  return (
    <>
      <Heading title="Enter Email To Reset" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        type="email"
        required
      />
      <Button label={"Reset Password"} onclick={handleSubmit(onSubmit)} />
    </>
  );
};

export default InputEmail;
