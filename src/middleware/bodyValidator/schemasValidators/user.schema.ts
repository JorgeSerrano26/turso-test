import { z } from "zod"

const User = z.object({
    name: z.string().min(1),
    email: z.string().email().min(1),
});

// type FishEnum = z.infer<typeof FishEnum>;

export { User }