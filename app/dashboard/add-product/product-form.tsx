"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/server/actions/create-product";
import { ProductSchema } from "@/types/schemas/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Tiptap from "./tiptap";

export default function ProductForm() {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      price: 0,
    },
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { execute, status } = useAction(createProduct, {
    onSuccess(data) {
      if (data?.success) {
        console.log(data.success);
      }
    },
    onError: (error) => console.log(error),
  });

  async function onSubmit(values: z.infer<typeof ProductSchema>) {
    console.log(values);
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input placeholder=" Bleomycin Inj 15iu" {...field} />
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
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 py-2 rounded-md">
                      <span className="bg-muted p-2 rounded-md">KSH</span>
                      <Input
                        {...field}
                        placeholder="Your price in KSH"
                        type="number"
                        step="1"
                        min={0}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
