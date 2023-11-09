"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {  useWorkItemDispatch } from "@/redux/hooks";
import { createWorkItem } from "@/redux/slices/workItemSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 characters.",
  }),
  color: z.enum(["yellow", "red", "blue", "green"]),
  status: z.enum(["todo", "in-progress", "completed"]),
  dueDate: z.string().optional(),
});



export function CreateWorkItemForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useWorkItemDispatch();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      color: "yellow",
      status: "todo",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
 
    console.log(data);
    console.log(JSON.stringify(data, null, 2));

    dispatch(createWorkItem({ ...data, id: Date.now().toString() }));
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className=" h-24 w-[340px] rounded-md p-4">
          <code className="text-gray-700">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    setIsOpen(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is your workitem description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="yellow">yellow</SelectItem>
                  <SelectItem value="green">green</SelectItem>
                  <SelectItem value="red">red</SelectItem>
                  <SelectItem value="blue">blue</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will be your workitem card color.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
       <FormField
  control={form.control}
  name="dueDate"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Due Date</FormLabel>
      <FormControl>
        <Input
          type="text"
          placeholder="YYYY-MM-DD"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="todo" className="font-mono font-medium">
                    TO DO
                  </SelectItem>

                  <SelectItem
                    value="in-progress"
                    className="text-green-500 bg-green-200 font-mono font-medium"
                  >
                    In Progress
                  </SelectItem>
                  <SelectItem
                    value="completed"
                    className="text-blue-500 bg-blue-200 font-mono font-medium"
                  >
                    Completed
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                This will be your workitem status.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
