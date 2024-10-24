"use server";

import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Type } from "@prisma/client";
import { onGetAllAccountDomains } from "../settings";

export const onCompleteUserRegisration = async (
  fullname: string,
  clerkId: string,
  type: Type
) => {
  try {
    const registered = await db.user.create({
      data: { fullname, clerkId, type, subscription: { create: {} } },
      select: { fullname: true, id: true, type: true },
    });
    if (registered) {
      return { status: 200, user: registered };
    }
  } catch (error) {
    return { status: 400 };
  }
};

export const onLoginUser = async () => {
  const user = await currentUser();
  if (!user) auth().redirectToSignIn();
  else {
    try {
      const authenticated = await db.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      });
      if (authenticated) {
        const domains = await onGetAllAccountDomains();
        return { status: 200, user: authenticated, domains: domains?.domains };
      }
    } catch (error) {
      console.log(error);
    }
  }
};
