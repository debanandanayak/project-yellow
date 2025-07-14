'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from './auth.schema'
import { toast } from 'sonner'
import { authClient } from '@/lib/auth-client'
export function SignupForm() {
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const router = useRouter()
    async function onSubmit(values: z.infer<typeof loginSchema>) {
        const { error, data } = await authClient.signUp.email({
            name: values.email.split("@")[0],
            email: values.email,
            password: values.password,
            callbackURL: "/team/new"
        })
        console.log(error, data)
        if (error?.message) {
            toast.error(error.message)
        } else {
            toast.success(data?.user.email)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="m@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid gap-3">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel>Password</FormLabel>
                                    </div>

                                    <FormControl>
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="w-full"
                    >
                        {form.formState.isSubmitting ? (
                            <>
                                Verifying
                                <Loader2Icon className="animate-spin" />
                            </>
                        ) : (
                            'Sign up'
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
