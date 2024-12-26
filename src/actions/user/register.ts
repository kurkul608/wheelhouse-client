"use server";

import { User } from "@/models/user";

export async function registerUser(headers: HeadersInit): Promise<User> {
  const user = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/register`, {
    method: "POST",
    headers,
  });

  return user.json();
}
