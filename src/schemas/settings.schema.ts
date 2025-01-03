import { z } from "zod";

export const AddDomainSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    ),
  image: z.string({ message: "Image is required" }),
});

export const DomainSettingsSchema = z.object({
  domain: z
    .string()
    .min(4, { message: "A domain must have atleast 3 characters" })
    .refine(
      (value) =>
        /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\.)+[A-Za-z]{2,3}$/.test(value ?? ""),
      "This is not a valid domain"
    )
    .optional(),
  image: z.string().optional(),
  welcomeMessage: z
    .string()
    .min(6, "The message must be atleast 6 characters")
    .optional(),
});

export const HelpDeskSchema = z.object({
  question: z.string().min(1, { message: "Help Desk question is required" }),
  answer: z.string().min(1, { message: "Help Desk Answer is required" }),
});

export const FilterQuestionSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.string().optional(),
});
