import FormGenerator from "@/components/form-generator";
import { USER_REGISTRATION_FORM } from "@/constants/forms";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
};

function AccountDetailsForm({ errors, register }: Props) {
  return (
    <>
      <h2 className="md:text-3xl font-bold">Account details</h2>
      {USER_REGISTRATION_FORM.map((field) => (
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
}

export default AccountDetailsForm;
