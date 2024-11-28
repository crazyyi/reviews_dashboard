"use server";

import { revalidatePath } from "next/cache";

export async function revalidateComponent() {
  revalidatePath("/", "layout");
}