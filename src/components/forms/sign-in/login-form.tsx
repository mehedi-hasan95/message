"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import { USER_LOGIN_FORM } from "@/constants/forms";
import FormGenerator from "@/components/form-generator";

const LoginForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <h2 className="text-gravel md:text-4xl font-bold">Login</h2>
      {USER_LOGIN_FORM.map((field) => (
        <FormGenerator
          key={field.id}
          {...field}
          errors={errors}
          register={register}
          name={field.name}
        />
      ))}
    </>
  );
};

export default LoginForm;
