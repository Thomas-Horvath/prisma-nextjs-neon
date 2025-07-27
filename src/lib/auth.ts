"use server";
import { signIn, signOut } from "@/auth";
const login = async () => {
  await signIn("github", { redirectTo: "/" });
};

const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};

export { login, logout };