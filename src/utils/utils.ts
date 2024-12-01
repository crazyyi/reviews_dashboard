import { redirect } from "next/navigation";
import { createHash } from "crypto"
import { TableName } from "@/types";
import { paymentPlans } from "@/lib/payments/payments";

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

export function generateId(userId: string, table: string): string {
  // Combine the userId and timestamp
  const data = `${userId}_${Date.now()}`;

  // Create a hash from the combined data
  const hash = createHash('sha256')
    .update(data)
    .digest('base64url'); // Use base64url for a URL-safe, compact result

  // Make the ID shorter by taking a substring if necessary (e.g., take first 16 characters)
  const shortHash = hash.substring(0, 16); // Adjust length as necessary

  // Prefix the ID with 'p_' for clarity
  let prefix = ""
  if (table === TableName.SUBSCRIPTION) {
    prefix = 's'
  }

  if (table === TableName.PROJECT) {
    prefix = 'p'
  }

  return `${prefix}_${shortHash}`;
}

export function getEnumKeyByValue({ priceId }: { priceId: string | null | undefined }) {
  return Object.keys(paymentPlans).find(key => paymentPlans[key as keyof typeof paymentPlans] === priceId)
}