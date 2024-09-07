"use server"
import connectDB from "../db/connect-db"
import { auth } from "../authentication/auth"
import Discussion from "../db/models/Discussion"
import DiscussionThread from "../db/models/DiscussionThread"
import mongoose from "mongoose"
import { redirect } from "next/navigation"
import User from "../db/models/User"
import striptags from "striptags"


export const editThread = async (formData) => {
    const session = await auth()

    const id = formData.get("id")
    const discussionId = formData.get("discussionId")
    let comment = formData.get("comment")
    const creator = session?.user?.email

    comment = striptags(comment, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div'])

    if (!mongoose.isValidObjectId(id)) {
        throw new Error("The thread you are trying to refer does not exist")
    }

    await connectDB()

    const userExists = await User.exists({ email: creator })
    const thread = await DiscussionThread.findOne({ _id: id })

    if (thread === null) {
        throw new Error("The thread you are trying to refer does not exist")
    }

    if (!userExists || thread?.creator !== creator) {
        throw new Error("Unauthorized")
    }

    await DiscussionThread.findOneAndUpdate({ _id: id }, { comment }, { new: true })

    redirect(`/discussion/${discussionId}`)
}

export const createThread = async (formData) => {
    const session = await auth()

    const discussionId = formData.get("discussionId")
    const underId = formData.get("underId")
    let comment = formData.get("comment")
    const creator = session?.user?.email

    comment = striptags(comment, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div'])


    if (!(mongoose.isValidObjectId(discussionId) && (underId === 'main' || mongoose.isValidObjectId(underId)))) {
        throw new Error("The discussion you are trying to refer does not exist")

    }
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

export const getDiscussionThreadsById = async (id) => {

    await connectDB()
    const discussionThreads = await DiscussionThread.find({ discussionId: id })
    console.log(discussionThreads.length)
    return discussionThreads
}


export const voteDiscussionThread = async (formData) => {
    const id = formData.get("id")
    const value = Number(formData.get("vote"))

    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    await connectDB()

    const email = session?.user?.email

    const discussionThread = await DiscussionThread.findOne({ _id: id })

    const upvoters = discussionThread?.upvoters || []
    const downvoters = discussionThread?.downvoters || []

    const pendingDbActions = {}

    if (email !== undefined && email !== null) {

        if (value === 1 && downvoters.includes(email)) {
            pendingDbActions["$pull"] = { downvoters: email }
            pendingDbActions["$addToSet"] = { upvoters: email }

        } else if (value === -1 && upvoters.includes(email)) {
            pendingDbActions["$pull"] = { upvoters: email }
            pendingDbActions["$addToSet"] = { downvoters: email }

        } else if (value === 1 && upvoters.includes(email)) {
            pendingDbActions["$pull"] = { upvoters: email }

        } else if (value === -1 && downvoters.includes(email)) {
            pendingDbActions["$pull"] = { downvoters: email }

        } else if (value === 1) {
            pendingDbActions["$addToSet"] = { upvoters: email }

        } else if (value === -1) {
            pendingDbActions["$addToSet"] = { downvoters: email }

        }

    }

    if (Object.keys(pendingDbActions).length > 0) {
        await DiscussionThread.findOneAndUpdate({ _id: id }, pendingDbActions, { new: true })
    }

}
