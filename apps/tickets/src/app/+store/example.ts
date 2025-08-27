import * as z from 'zod';

const FlightSchema = z
  .object({
    from: z.string().min(0).max(100),
    to: z.string().min(0).max(100),
    delayedBy: z.number().optional(),
  })
  .strict();

export type Flight = z.infer<typeof FlightSchema>;

const flight = {
  from: 'Leipzig',
  to: 'Stuttgart',
} satisfies Flight;

const delayedFlight = {
  from: 'Leipzig',
  to: 'Stuttgart',
  delayedBy: 1,
} satisfies Flight;

export const parsedFlight = FlightSchema.parse(flight);

console.log({ flight, delayedFlight });
