import { z, object, string } from 'zod';

export const CurrentUserSchema = object({
  id: string().default(''),
  name: string().default(''),
  token: string().default(''),
});

export type CurrentUser = z.infer<typeof CurrentUserSchema>;
