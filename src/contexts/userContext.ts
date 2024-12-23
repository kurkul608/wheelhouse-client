import { createContext } from "react";
import { User } from "@/models/user";

export const UserContext = createContext<User | null>(null);
