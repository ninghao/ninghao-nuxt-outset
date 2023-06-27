import { z } from 'zod';

export const CurrentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  token: z.string(),
});

export type CurrentUser = z.infer<typeof CurrentUserSchema>;
