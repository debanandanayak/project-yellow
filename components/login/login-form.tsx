"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import type z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from "./auth.schema"
import { authClient } from '@/lib/auth-client'
export function EmailPasswordLoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const params = useSearchParams()
  console.log(params.get("cb"))
  const router = useRouter()
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { error, data } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: `/team/new`
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
                    <a
                      href="forgot-password"
                      className="ml-auto text-sm leading-none font-medium underline-offset-2 hover:underline"
                    >
                      Forgot your password?
                    </a>
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
            disabled={form.formState.isSubmitting || !form.formState.isValid}
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <>
                Verifying
                <Loader2Icon className="animate-spin" />
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
