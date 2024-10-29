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

export const onGetCurrentDomainInfo = async (domain: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const domainInfo = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        domains: {
          where: {
            name: `${domain}.com`,
          },
          select: {
            id: true,
            icon: true,
            name: true,
            userId: true,
            chatBot: {
              select: {
                id: true,
                icon: true,
                welcomeMessage: true,
              },
            },
          },
        },
      },
    });
    if (domainInfo) {
      return domainInfo;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onUpdateSettings = async (
  domainId: string | undefined,
  domainName: string | undefined,
  img: string | undefined,
  message: string | undefined
) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const updateDomain = await db.user.update({
      where: {
        clerkId: user.id,
        subscription: {
          plan: {
            not: "STANDARD",
          },
        },
      },
      data: {
        domains: {
          update: {
            where: {
              id: domainId,
            },
            data: {
              name: domainName,
              chatBot: {
                update: {
                  welcomeMessage: message,
                  icon: img,
                },
              },
            },
          },
        },
      },
    });
    if (updateDomain) {
      return { status: 200, message: "Domain update successfully" };
    }
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
  }
};

export const onDeleteDomain = async (id: string) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const validateUser = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (validateUser) {
      const validUser = await db.domain.delete({
        where: {
          id,
          userId: validateUser.id,
        },
      });
      if (validUser) {
        return {
          status: 200,
          message: `${validUser.name} delete successfully`,
        };
      }
    }
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
  }
};

export const onHelpDeskQuestion = async (
  id: string,
  question: string,
  answer: string
) => {
  const user = await currentUser();
  if (!user) return;
  try {
    const helpDesk = await db.domain.update({
      where: {
        id,
      },
      data: {
        helpdesk: {
          create: {
            question,
            answer,
          },
        },
      },
      include: {
        helpdesk: {
          select: {
            id: true,
            answer: true,
            question: true,
          },
        },
      },
    });
    if (helpDesk) {
      return { status: 200, message: "Helpdesk add successfully" };
    }
    return { status: 400, message: "Something went wrong" };
  } catch (error) {
    console.log(error);
  }
};

export const onGetHelpDeskQuestion = async (id: string) => {
  const user = await currentUser();
  if (!user) return;

  try {
    const helpDesk = await db.helpDesk.findMany({
      where: {
        domainId: id,
      },
      select: {
        answer: true,
        question: true,
        id: true,
      },
    });
    return { helpDesk };
  } catch (error) {
    console.log(error);
  }
};
