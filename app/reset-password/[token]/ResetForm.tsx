"use client";

import { updatePassword } from "@/actions/updatePassword";
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ResetForm = ({token}: {token: string}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      newpassword: "",
      reenterpassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const { newpassword, reenterpassword } = data;
    let password: string = newpassword;
    if (newpassword === reenterpassword) {
      await updatePassword({ password, token });

    } else {
      toast.error("Password doesn't match");
      reset({
        newpassword: "",
        reenterpassword: "",
      });
      setIsLoading(false);
      return;
    }
  };

  return (
    <>
      <Heading title="Forgot Password" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="newpassword"
        label="New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Input
        id="reenterpassword"
        label="Re Enter New Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
        required
      />
      <Button
        label={isLoading ? "Updating" : "Update"}
        onclick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default ResetForm;
