import { auth } from "@/auth";

/**
 * Get current logged-in session
 */
export async function getCurrentUser() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session.user;
}

/**
 * Check if user is Admin
 */
export async function isAdmin() {
  const session = await auth();

  return session?.user?.role === "ADMIN";
}

/**
 * Get Workspace ID
 */
export async function getWorkspaceId() {
  const session = await auth();

  return session?.user?.workspaceId;
}