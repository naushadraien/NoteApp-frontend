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
  name: z.string().min(2).max(20),
  email: z.string().min(2).max(50),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});
const SignUp = () => {
  // Access the client
  const queryClient = useQueryClient();
  const router = useRouter();

  // Mutations
  const mutation = useMutation({
    mutationFn: async (values) => {
      // await new Promise((resolve) =>
      //   setTimeout(() => resolve(console.log("Resolving")), 2000)
      // );
      return axios.post("http://localhost:5000/api/v1/auth/new", values);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values as any);
    if (mutation.data === undefined) {
      toast.error("Retry!");
    }
    if (mutation.data?.status === 201) {
      router.push("/");
      toast.success("Registered Successfully!");
    }
    if (mutation.data?.status === 200) {
      router.push("/");
      toast.success(mutation.data?.data.message);
    }
  }
  return (
    <div className="flex justify-center items-center flex-col">
      <p className="font-bold text-xl text-blue-700 underline my-5">
        SignUp Form
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            Register
          </Button>
        </form>
      </Form>
      <div className=" flex gap-3 my-5">
        <p>Already have an account</p>
        <Link href="/login" className="underline text-blue-500">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
