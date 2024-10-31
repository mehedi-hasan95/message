"use server";

import { db } from "@/lib/db";
import { pusherServer } from "@/lib/utils";

export const onGetDomainChatRooms = async (id: string) => {
  try {
    const domains = await db.domain.findUnique({
      where: { id },
      select: {
        customer: {
          select: {
            email: true,
            chatRoom: {
              select: {
                id: true,
                createdAt: true,
                message: {
                  select: {
                    message: true,
                    createdAt: true,
                    seen: true,
                  },
                  orderBy: {
                    createdAt: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });
    if (domains) {
      return domains;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onGetChatMessages = async (id: string) => {
  try {
    const messages = await db.chatRoom.findMany({
      where: { id },
      select: {
        id: true,
        live: true,
        message: {
          select: {
            id: true,
            role: true,
            createdAt: true,
            message: true,
            seen: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    if (messages) {
      return messages;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onViewUnReadMessages = async (id: string) => {
  try {
    await db.chatMessage.updateMany({
      where: {
        chatRoomId: id,
      },
      data: {
        seen: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const onOwnerSendMessage = async (
  chatroom: string,
  message: string,
  role: "assistant" | "user"
) => {
  try {
    const chat = await db.chatRoom.update({
      where: { id: chatroom },
      data: {
        message: {
          create: {
            message,
            role,
          },
        },
      },
      select: {
        message: {
          select: {
            id: true,
            role: true,
            message: true,
            createdAt: true,
            seen: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });
    if (chat) {
      return chat;
    }
  } catch (error) {
    console.log(error);
  }
};

export const onRealTimeChat = (
  chatRoomId: string,
  message: string,
  id: string,
  role: "assistant" | "user"
) => {
  pusherServer.trigger(chatRoomId, "realtime-mode", {
    chat: {
      message,
      id,
      role,
    },
  });
};