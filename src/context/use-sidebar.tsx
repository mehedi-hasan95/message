"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChatContext } from "./use-chat-context";
import {
  onGetConversationMode,
  onToggleRealtime,
} from "@/actions/conversation-action";
import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";

export const useSidebar = () => {
  const [realtime, setRealtime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const { chatRoom } = useChatContext();
  const onActivateRealTime = async (e: any) => {
    try {
      const realtime = await onToggleRealtime(
        chatRoom!,
        e.target.ariachecked == "true" ? false : true
      );
      if (realtime) {
        setRealtime(realtime.chatRoom.live);
        toast(realtime.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onGetCurrentMode = async () => {
    setLoading(true);
    const mode = await onGetConversationMode(chatRoom!);
    if (mode) {
      setRealtime(mode.live);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatRoom) {
      onGetCurrentMode;
    }
  }, [chatRoom]);

  const page = pathname.split("/").pop();

  const { signOut } = useClerk();
  const onSignOut = () => signOut(() => router.push("/"));
  return {
    page,
    onSignOut,
    realtime,
    onActivateRealTime,
    chatRoom,
    loading,
  };
};
