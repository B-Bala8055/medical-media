"use server"
import connectDB from "../db/connect-db"
import { auth } from "../authentication/auth"
import Discussion from "../db/models/Discussion"
import DiscussionThread from "../db/models/DiscussionThread"
import mongoose from "mongoose"
import { redirect } from "next/navigation"
import User from "../db/models/User"
import striptags from "striptags"
import { deleteMultipleFiles, deleteSingleFile, uploadFileList } from "../helpers/cdn"


export const editThread = async (formData) => {
    const session = await auth()

    const id = formData.get("id")
    const discussionId = formData.get("discussionId")
    const media = formData.getAll("media")
    let comment = formData.get("comment")
    const creator = session?.user?.email.toLowerCase()

    if (comment.length < 5 || comment.length > 1400) {
        throw new Error("Condition for input fields not satisfied. It is either long or short")
    }

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

    if (!userExists || thread?.creator.toLowerCase() !== creator) {
        throw new Error("Unauthorized")
    }

    const existingMedia = thread?.mediaLinks || []
    let newMedias = []
    console.log(existingMedia)
    if (media.length > 0 && media[0].size !== 0 && existingMedia.length < 3) {
        console.log("Have more space for new documents")
        const uploadData = await uploadFileList(media.sort((a, b) => a.size - b.size).slice(0, (3 - existingMedia.length)))
        console.log(uploadData.success)
        newMedias = uploadData.success
    }

    await DiscussionThread.findOneAndUpdate({ _id: id }, { comment, mediaLinks: [...existingMedia, ...newMedias] }, { new: true })

    redirect(`/discussion/${discussionId}`)
}

export const createThread = async (formData) => {
    const session = await auth()

    const discussionId = formData.get("discussionId")
    const underId = formData.get("underId")
    const media = formData.getAll("media")
    let comment = formData.get("comment")
    const creator = session?.user?.email.toLowerCase()

    if (comment.length < 5 || comment.length > 1400) {
        throw new Error("Condition for input fields not satisfied. It is either long or short")
    }

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

    const mediaUploads = await uploadFileList(media.sort((a, b) => a.size - b.size).slice(0, 3))


    await DiscussionThread.create({ discussionId, underId, creator, comment, mediaLinks: mediaUploads.success })

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

    const email = session?.user?.email.toLowerCase()

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

export const deleteDiscussionThread = async (formData) => {
    const id = formData.get("deleteAction")
    const discussionId = formData.get("discussionId")

    if (!mongoose.isValidObjectId(id)) {
        throw new Error("Invalid Request!")
    }

    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    await connectDB()

    const email = session?.user?.email

    const discussionThread = await DiscussionThread.findOne({ _id: id })

    if (discussionThread?.creator.toLowerCase() === email.toLowerCase()) {

        await deleteMultipleFiles(discussionThread?.mediaLinks || [])

        await DiscussionThread.deleteMany({ $or: [{ _id: id }, { underId: id }] })
        // Pending unlink media docs code
        redirect(`/discussion/${discussionId}`)
    } else {
        throw new Error("Unauthorized")
    }
}


export const deleteMediaFromDiscussionThread = async (formData) => {
    const discussionId = formData.get("discussionId")
    const discussionThreadId = formData.get("discussionThreadId")
    const mediaFileName = formData.get("mediaFileName")

    await deleteSingleFile(mediaFileName)

    try {
        await DiscussionThread.findOneAndUpdate({ _id: discussionThreadId }, { $pull: { mediaLinks: mediaFileName } }, { new: true })
    } catch (error) {
        throw new Error("Delete Failed.")
    }

    redirect(`/discussion/${discussionId}`)
}
