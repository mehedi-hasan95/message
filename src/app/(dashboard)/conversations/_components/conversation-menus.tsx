"use client";

import { TABS_MENU } from "@/constants/forms";
import TabsMenu from "../../settings/[domain]/_components/bot/tabs-menu";
import { TabsContent } from "@/components/ui/tabs";
import { ConversationnSearch } from "./conversation-search";
import { useConversation } from "@/hooks/use-conversation/use-conversation-hook";
import { Loader } from "@/components/forms/loader";
import { ChatCard } from "./chat-card";
import { CardDescription } from "@/components/ui/card";

type Props = {
  domains?:
    | {
        id: string;
        name: string;
        icon: string;
      }[]
    | undefined;
};
export const ConversationMenus = ({ domains }: Props) => {
  const { register, chatRooms, loading, onGetActiveChatMessages } =
    useConversation();
  return (
    <div>
      <TabsMenu triggers={TABS_MENU}>
        <TabsContent value="unread">
          <ConversationnSearch register={register} domains={domains} />
          <div className="flex flex-col">
            <Loader loading={loading}>
              {chatRooms.length ? (
                chatRooms.map((chat) => (
                  <ChatCard
                    key={chat.chatRoom[0].id}
                    createdAt={chat.chatRoom[0]?.message[0]?.createdAt}
                    onChat={() => onGetActiveChatMessages(chat.chatRoom[0].id)}
                    title={chat.email!}
                    description={chat.chatRoom[0].message[0].message}
                    seen={chat.chatRoom[0].message[0].seen}
                    id={chat.chatRoom[0].id}
                  />
                ))
              ) : (
                <CardDescription>No Chat for this domain</CardDescription>
              )}
            </Loader>
          </div>
        </TabsContent>
      </TabsMenu>
    </div>
  );
};
