import { createContext } from "react";
import { User } from "@/models/user";

export const UserContext = createContext<{
  user: User | null;
  update: null | (() => Promise<void>);
}>({ user: null, update: null });
