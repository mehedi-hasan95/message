import { z } from "zod";

export const ConversationsSchema = z.object({
  domain: z.string().min(1, { message: "Domain is required" }),
  query: z.string().min(1, { message: "Query is required" }),
});

export const ChatBotMessageSchema = z.object({
  content: z
    .string()
    .min(1)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  image: z.string().optional(),
});
