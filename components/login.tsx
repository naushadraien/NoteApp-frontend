"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});
const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post("http://localhost:5000/api/v1/auth/login", values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const router = useRouter();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(values as any);
    console.log(mutation?.data?.data.name);
    if (mutation.data?.status === 200) {
      toast.success(`Welcome ${mutation?.data?.data.name}`);
      router.push("/");
    }
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-bold text-xl text-blue-700 underline my-5">
        Login Form
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending}>
            Login
          </Button>
        </form>
      </Form>
      <div className=" flex gap-3 my-5">
        <p>Don&apos;t have an account</p>
        <Link href="/signup" className="underline text-blue-500">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
