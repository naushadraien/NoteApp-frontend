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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(8),
  category: z.string().min(2),
});
const AddNewNote = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/notes/new`,
          values,
          {
            withCredentials: true,
          }
        );
        return res.data;
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["noteData"] }); //this is working for invalidating the queryKey as used in the homePage
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values as any);
    form.reset();
  }

  const CategoryData = [
    {
      name: "personal",
      value: "personal",
    },
    {
      name: "public",
      value: "public",
    },
    {
      name: "confidential",
      value: "confidential",
    },
  ];
  return (
    <div className="flex justify-center items-center flex-col mb-4">
      <p className="font-bold text-xl text-blue-700 underline my-5">
        Add New Note
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Title</FormLabel>
                <FormControl>
                  <Input placeholder="Your Note Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your description</FormLabel>
                <FormControl>
                  <Input placeholder="Your note description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CategoryData.map((category) => (
                      <SelectItem value={category.value} key={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={mutation.isPending}>
            AddNewNote
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddNewNote;
