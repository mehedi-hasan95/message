"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { useChatTime } from "@/hooks/use-conversation/use-conversation-hook";
import { ShieldAlert, User } from "lucide-react";

type Props = {
  title: string;
  description?: string;
  createdAt: Date;
  onChat(): void;
  id: string;
  seen?: boolean;
};
export const ChatCard = ({
  createdAt,
  onChat,
  title,
  description,
  seen,
  id,
}: Props) => {
  const { messageSentAt, onSeenChat, urgent } = useChatTime(createdAt, id);
  return (
    <Card
      onClick={onChat}
      className="rounded-none border-r-0 hover:bg-muted cursor-pointer transition duration-150 ease-in-out"
    >
      <CardContent className="py-4 flex gap-3">
        <div>
          <Avatar>
            <AvatarFallback className="bg-muted">
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex justify-between w-full">
          <div>
            <div className="flex gap-5 items-center">
              <CardDescription className="font-bold leading-none text-gray-600">
                {title}
              </CardDescription>
              {urgent && !seen && <ShieldAlert />}
            </div>
            <CardDescription>
              {description
                ? description.substring(0, 20) + "..."
                : "This chatroom is empty"}
            </CardDescription>
          </div>
          <div className="w-[100px] flex justify-end">
            <CardDescription className="text-xs">
              {createdAt ? messageSentAt : ""}
            </CardDescription>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
