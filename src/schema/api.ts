import { z } from 'zod';

export const filtersSchema = z
  .record(z.string(), z.record(z.union([z.string(), z.record(z.string(), z.string())])))
  .optional();

export const entitiesRequestQuerySchema = z.object({
  page: z.union([
    z.number().default(1),
    z
      .string()
      .default('1')
      .transform((data) => parseInt(data, 10)),
  ]),

  sort: z.string().optional(),

  filters: filtersSchema,
});

export type EntitiesRequestQuery = z.infer<typeof entitiesRequestQuerySchema>;
export type Filters = z.infer<typeof filtersSchema>;
