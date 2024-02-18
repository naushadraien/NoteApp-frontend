"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateUser } from "@/lib/redux/slices/userSlice";
import { RootState } from "@/lib/redux/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().max(40),
});

const EditUser = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isAuth } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!isAuth) {
      router.push("/login");
    }
  }, [isAuth, router]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: data || {
      name: "",
      email: "",
    },
  });
  const queryClient = useQueryClient();
  // Mutations
  const mutation = useMutation({
    mutationFn: async (values) => {
      try {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/user/${data?._id}`,
          values,
          {
            withCredentials: true,
          }
        );
        console.log(res.data);
        return res.data;
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      dispatch(updateUser(data));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Updated Successfully!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutation.mutate(values as any);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={mutation.isPending} type="submit">
          {mutation.isPending ? "Updating" : "Update"}
        </Button>
      </form>
    </Form>
  );
};

export default EditUser;
