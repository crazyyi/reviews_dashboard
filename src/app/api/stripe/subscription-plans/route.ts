import { fetchPlans } from "@/lib/fetchPlans";

export async function GET() {
  return fetchPlans()
}