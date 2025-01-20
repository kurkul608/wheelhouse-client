"use server";

import { cookies } from "next/headers";
import { User } from "@/models/user";

export async function registerUser(
  headers: HeadersInit,
): Promise<User | undefined> {
  try {
    const user = await fetch(`${process.env.API_URL}users/register`, {
      method: "POST",
      headers,
    });

    const userData: User = await user.json();
    const cookieStore = await cookies();

    if (userData.roles.some((role) => role === "MANAGER")) {
      cookieStore.set("roleManager", "true");
    }

    return userData;
  } catch (error) {
    console.error(error);
  }
}
