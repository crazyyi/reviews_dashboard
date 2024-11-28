"use client"

import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Input
} from "@/components/ui/input"
import {
  Textarea
} from "@/components/ui/textarea"
import { createProject } from "@/app/actions/createProject"
import { formSchema } from "@/lib/form-schemas/formSchema"
import SubmitButton from "./SubmitButton"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProjectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      description: ""
    }
  })

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      console.log(values);
      const response = await createProject(values)

      if (response.success) {
        toast.success(
          <pre className="mt-2 w-[340px] rounded-md p-4">
            Added {values.name}
          </pre>
        );
        router.push(`/projects/${response.projectId}/instructions`)
      }
    } catch (error) {
      console.error("Form submission error: ", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 max-w-3xl mx-auto py-2 grid">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Max Paddington"

                      type=""
                      {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"

                      type="url"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write your description for the project."
                  className="resize-none"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton loading={loading} />
      </form>
    </Form>
  )
}