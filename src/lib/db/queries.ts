import { db } from "@/db"
import { projects } from "@/db/schema"
import { eq } from "drizzle-orm"


export async function getAllProjects() {
  return await db.select().from(projects).limit(10)
}

export async function getUserProjects(userId: string) {
  return await db.select().from(projects).where(eq(projects.userId, userId))
}