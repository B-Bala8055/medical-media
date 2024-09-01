"use server"
import connectDB from "../db/connect-db"
import { auth } from "../authentication/auth"
import Discussion from "../db/models/Discussion"
import DiscussionThread from "../db/models/DiscussionThread"
import mongoose from "mongoose"
import { redirect } from "next/navigation"
import User from "../db/models/User"

export const createThread = async (formData) => {
    const session = await auth()

    const discussionId = formData.get("discussionId")
    const underId = formData.get("underId")
    const comment = formData.get("comment")
    const creator = session?.user?.email

    if (!(mongoose.isValidObjectId(discussionId) && (underId === 'main' || mongoose.isValidObjectId(underId)))) {
        throw new Error("The discussion you are trying to refer does not exist")

    }
    console.log(comment)
    await connectDB()

    let userExists = await User.exists({ email: creator })

    if (!userExists) {
        throw new Error("Unauthorized")
    }

    let discussionExists = await Discussion.exists({ _id: discussionId })
    let threadExists = underId === 'main' ? true : false;

    if (!threadExists) {
        threadExists = await DiscussionThread.exists({ _id: underId })
    }

    if (!(discussionExists && threadExists)) {
        throw new Error("The discussion you are trying to refer does not exist")
    }

    await DiscussionThread.create({ discussionId, underId, creator, comment })

    if (discussionExists) {
        redirect(`/discussion/${discussionId}`)
    } else {
        redirect('/discussion')
    }
}