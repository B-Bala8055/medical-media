"use server"
import { auth } from "../authentication/auth"
import connectDB from "../db/connect-db"
import User from "../db/models/User"

export const verifyId = async (formData) => {
    const session = await auth()

    const email = formData.get("email")
    const verifier = session?.user?.email.toLowerCase()
    const verify = formData.get("verify")

    console.log(email, verifier, verify)

    const verifyBoolean = (String(verify).toLowerCase() === 'true');

    await connectDB()

    const existingUser = await User.findOne({ email })

    if (!existingUser || existingUser?.verified) {
        // User admission declined/accepted by other user already
        return
    }

    if (!verifyBoolean) {
        await User.findOneAndDelete({ email })
    } else {
        await User.findOneAndUpdate({ email }, { verified: true, witness: [verifier], identity: "" }, { new: true })
    }

}

export const getUnverifiedUsers = async (search) => {
    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }
    await connectDB()

    const dbQueryConditions = { verified: { $ne: true } }

    if (typeof search !== 'undefined' && search !== null) {
        dbQueryConditions.email = search.toLowerCase()
    }
    // console.log(dbQueryConditions)
    const usersList = await User.find(dbQueryConditions).select({ email: 1, name: 1, student: 1, identity: 1 }).limit(30)
    // console.log(usersList)

    return usersList
} 