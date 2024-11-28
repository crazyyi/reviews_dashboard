"use server"

import { db } from "@/db"
import { projects } from "@/db/schema"
import { auth } from "@/lib/auth"
import { formSchema } from "@/lib/form-schemas/formSchema"
import { TableName } from "@/types"
import { generateId } from "@/utils/utils"
import { headers } from "next/headers"
import { z } from "zod"

type CreateProjectResponse = {
  success: boolean;
  projectId?: string;  // `projectId` is optional in case of an error
}

export async function createProject(form: z.infer<typeof formSchema>): Promise<CreateProjectResponse> {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  const userId = data?.user.id


  if (userId) {
    try {
      const project = {
        id: generateId(userId, TableName.PROJECT),
        name: form.name,
        description: form.description,
        url: form.url,
        userId
      }
      const newProject = await db.insert(projects).values(project).returning({ insertedId: projects.id })

      console.log(`New project created with ID: ${newProject[0].insertedId}`);

      return { success: true, projectId: newProject[0].insertedId }
    } catch (error) {
      throw new Error("Failed to create project.")
    }
  } else {
    throw new Error("User doesn't exist.")
  }
}