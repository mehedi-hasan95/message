import { FieldValues, UseFormRegister } from "react-hook-form";
import { UserTypeCard } from "./user-type-card";

type Props = {
  register: UseFormRegister<FieldValues>;
  userType: "ADMIN" | "USER";
  setUserType: React.Dispatch<React.SetStateAction<"ADMIN" | "USER">>;
};

export const TypeSelectionForm = ({
  register,
  setUserType,
  userType,
}: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
        Create an Account
      </h2>
      <p>Tell us about yourself</p>
      <div className="flex flex-col gap-3">
        <UserTypeCard
          register={register}
          setUserType={setUserType}
          userType={userType}
          title="I own a business"
          text="Setting up my account for my company"
          value="ADMIN"
        />
        <UserTypeCard
          register={register}
          setUserType={setUserType}
          userType={userType}
          title="I an a user"
          text="Looking for something new"
          value="USER"
        />
      </div>
    </div>
  );
};
