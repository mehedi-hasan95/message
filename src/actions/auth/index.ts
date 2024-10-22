"use server";

import { db } from "@/lib/db";
import { Type } from "@prisma/client";

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
