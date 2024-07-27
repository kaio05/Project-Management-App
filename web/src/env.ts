import { z } from 'zod'

const envSchema = z.object({
    VITE_REACT_APP_PORT: z.coerce.number().default(3333),
    VITE_REACT_APP_BASE_URL: z.string().url()
})

export const env = envSchema.parse(import.meta.env)