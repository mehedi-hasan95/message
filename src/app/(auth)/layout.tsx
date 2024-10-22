import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  if (user) redirect("/");
  return (
    <div className="container mx-auto px-6 flex flex-col justify-center items-center h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
