"use server"
import { auth } from "../authentication/auth"
import connectDB from "../db/connect-db"
import User from "../db/models/User"

export const verifyId = async (formData) => {
    const session = await auth()

    const email = formData.get("email")
    const verifier = session?.user?.email
    const verify = formData.get("verify")

    console.log(email, verifier, verify)
}

export const getUnverifiedUsers = async () => {
    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    await connectDB()
    const usersList = await User.find({ verified: { $ne: true } }).select({ email: 1, name: 1, student: 1, identity: 1 }).limit(30)
    console.log(usersList)

    return usersList
} 