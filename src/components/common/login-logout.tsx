import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

export const LoginLogout = async () => {
  const user = await currentUser();
  return (
    <div>
      {user ? (
        <SignOutButton>
          <Image
            src={user.imageUrl}
            alt="author"
            height={40}
            width={40}
            className="rounded-full cursor-pointer"
          />
        </SignOutButton>
      ) : (
        <Link
          href="/sign-in"
          className="bg-orange-300 border-orange-500 p-2 rounded-md font-bold"
        >
          Sign In
        </Link>
      )}
    </div>
  );
};
