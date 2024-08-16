"use server"

import { signIn, signOut } from "../authentication/auth"

export const oAuthLogin = async (formdata) => {
  const action = formdata.get("action")
  await signIn(action, { redirectTo: "/explore" })
}

export const logout = async () => {
  console.log("Logout called")
  await signOut({ redirectTo: "/" })
}
