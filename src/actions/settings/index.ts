"use server";

import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const onGetSubscriptionPlan = async () => {
  try {
    const user = await currentUser();
    if (!user) return;
    const plan = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (plan) {
      return plan.subscription?.plan;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetAllAccountDomains = async () => {
  const user = await currentUser();
  if (!user) return;

  try {
    const domains = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        domains: {
          select: {
            name: true,
            icon: true,
            id: true,
            customer: {
              select: {
                chatRoom: {
                  select: {
                    id: true,
                    live: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { ...domains };
  } catch (error) {
    console.log(error);
  }
};

export const onIntegrateDomain = async (domain: string, icon: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const subscription = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        _count: {
          select: {
            domains: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    const domainExists = await db.user.findFirst({
      where: {
        clerkId: user.id,
        domains: {
          some: {
            name: domain,
          },
        },
      },
    });
    if (!domainExists) {
      if (
        (subscription?.subscription?.plan == "STANDARD" &&
          subscription._count.domains < 1) ||
        (subscription?.subscription?.plan == "PRO" &&
          subscription._count.domains < 5) ||
        (subscription?.subscription?.plan == "ULTIMATE" &&
          subscription._count.domains < 10)
      ) {
        const newDomain = await db.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            domains: {
              create: {
                name: domain,
                icon,
                chatBot: {
                  create: {
                    welcomeMessage: "Hey there, have a question? Text us here",
                  },
                },
              },
            },
          },
        });
        if (newDomain) {
          return { status: 200, message: "Domain successfully added" };
        }
      }
      return {
        status: 400,
        message:
          "You've reached the maximum number of domains, upgrade your plan",
      };
    }
    return {
      status: 400,
      message: "Domain already exists",
    };
  } catch (error) {
    console.log(error);
  }
};

export const onUpdatePassword = async (
  currentPassword: string,
  password: string
) => {
  try {
    const user = await currentUser();
    if (!user) return;
    const verifyPassword = await clerkClient.users.verifyPassword({
      userId: user.id,
      password: currentPassword,
    });
    if (!verifyPassword)
      return { status: 422, message: "Current password dosen't match" };
    const update = await clerkClient.users.updateUser(user.id, { password });

    if (update) {
      return { status: 200, message: "Password Update" };
    }
  } catch (error) {
    console.log(error);
  }
};
