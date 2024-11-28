import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, "Name need to be at least 2 characters"),
  url: z.string().url("Need to be a URL."),
  description: z.string().min(1).max(200, "Description is too long.")
});