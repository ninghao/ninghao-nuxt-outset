import { z } from 'zod';

export const entitiesRequestQuerySchema = z.object({
  page: z.union([
    z.number().default(1),
    z
      .string()
      .default('1')
      .transform((data) => parseInt(data, 10)),
  ]),

  sort: z.string().optional(),
});
