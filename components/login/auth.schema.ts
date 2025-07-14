import { email, z } from 'zod'

export const loginSchema = z.object({
    email: z.email({ error: "This is not a valid email" }),
    password: z
        .string()
        .min(8, 'Password must be at least 4 character')
        .max(256, 'Password must be at least 256 character'),
})

export const signupSchema = z.object({
    email: z.email({ error: "Not a valid email" }),
    password: z
        .string()
        .min(8, 'Password must be at least 4 character')
        .max(256, 'Password must be at least 256 character'),
}).transform((values) => {
    const name = values.email.split('@')[0]
    return {
        ...values,
        name
    }

})
