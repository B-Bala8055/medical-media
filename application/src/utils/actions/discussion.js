"use server"
import connectDB from "../db/connect-db";
import Discussion from "../db/models/Discussion";
import User from "../db/models/User";
import { auth } from "../authentication/auth";
import { redirect } from "next/navigation";
import striptags from "striptags";
import DiscussionThread from "../db/models/DiscussionThread";
import { deleteMultipleFiles, deleteSingleFile, uploadFileList } from "../helpers/cdn";

export const getOneDiscussionWithId = async (id) => {
    await connectDB()

    const discussion = await Discussion.findOne({ _id: id })

    if (discussion === null) {
        throw new Error("This discussion doesn't exist.")
    }

    return discussion;
}

export const voteDiscussion = async (formData) => {
    const id = formData.get("id")
    const value = Number(formData.get("vote"))

    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    await connectDB()

    const email = session?.user?.email.toLowerCase()

    const discussion = await Discussion.findOne({ _id: id })

    const upvoters = discussion?.upvoters || []
    const downvoters = discussion?.downvoters || []

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
        await Discussion.findOneAndUpdate({ _id: id }, pendingDbActions, { new: true })
    }

}

export const submitDiscussion = async (formData) => {
    const session = await auth()

    if (!session?.user) {
        redirect("/")
    }

    const id = formData.get("id")
    const creator = session?.user?.email.toLowerCase()
    const heading = formData.get("heading")
    const tags = formData.get("tags")
    const media = formData.getAll("media")
    let explanation = formData.get("explanation")

    if (explanation.length < 20 || explanation.length > 2000 || tags.length === 0 || tags.length > 50
        || heading.length < 10 || heading.length > 100
    ) {
        throw new Error("Condition for input fields not satisfied. It is either long or short")
    }

    explanation = striptags(explanation, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div'])

    await connectDB()

    if (id === 'new') {

        const existingCreator = await User.exists({ email: creator })

        if (creator === null || creator === undefined || !existingCreator) {
            throw new Error("Unauthorized access!")
        }

        const mediaUploads = await uploadFileList(media.sort((a, b) => a.size - b.size).slice(0, 5))

        const discussionNew = await Discussion.create({ heading, tags, explanation, creator, mediaLinks: mediaUploads.success })

        redirect(`/discussion/${discussionNew._id}`)
    } else {
        const existingDiscussion = await Discussion.findOne({ _id: id })

        if (existingDiscussion === null) {
            throw new Error("The discussion you are trying to edit does not exist")
        }

        if (existingDiscussion?.creator.toLowerCase() !== creator) {
            throw new Error("Unauthorized access!")
        }

        const existingMedia = existingDiscussion?.mediaLinks || []
        let newMedias = []
        console.log(existingMedia)
        if (media.length > 0 && media[0].size !== 0 && existingMedia.length < 5) {
            console.log("Have more space for new documents")
            const uploadData = await uploadFileList(media.sort((a, b) => a.size - b.size).slice(0, (5 - existingMedia.length)))
            console.log(uploadData.success)
            newMedias = uploadData.success
        }

        const discussionEdited = await Discussion.findOneAndUpdate({ _id: id }, { heading, tags, explanation, mediaLinks: [...existingMedia, ...newMedias] }, { new: true })

        redirect(`/discussion/${discussionEdited._id}`)
    }

}

export const getRelatedDiscussions = async (heading) => {
    await connectDB()
    await Discussion.ensureIndexes()
    const discussionQuery = [
        {
            $match: {
                $text: {
                    $search: heading,
                    $caseSensitive: false,
                    $diacriticSensitive: false
                }
            }
        },
        {
            $sort: {
                score: {
                    $meta: 'textScore'
                }
            }
        },
        {
            $limit: 10
        }
    ]

    const relatedDiscussions = await Discussion.aggregate(discussionQuery).exec()

    return relatedDiscussions
}

export const deleteDiscussion = async (formData) => {
    const id = formData.get("deleteAction")

    const session = await auth()

    if (!session?.user) {
        throw new Error("Unauthorized")
    }

    await connectDB()

    const email = session?.user?.email

    const discussion = await Discussion.findOne({ _id: id })

    if (discussion?.creator.toLowerCase() === email.toLowerCase()) {

        await deleteMultipleFiles(discussion?.mediaLinks || [])
        const allThreads = await DiscussionThread.find({ discussionId: id })

        for (let i = 0; i < allThreads.length; i++) {
            await deleteMultipleFiles(allThreads[i]?.mediaLinks || [])
        }

        await Discussion.findOneAndDelete({ _id: id })
        await DiscussionThread.deleteMany({ discussionId: id })

        redirect('/discussion')
    } else {
        throw new Error("Unauthorized")
    }
}

export const deleteMediaFromDiscussion = async (formData) => {
    const discussionId = formData.get("discussionId")
    const mediaFileName = formData.get("mediaFileName")

    if (discussionId === 'new') {
        throw new Error("Invalid Attempt")
    }

    await deleteSingleFile(mediaFileName)

    try {
        await Discussion.findOneAndUpdate({ _id: discussionId }, { $pull: { mediaLinks: mediaFileName } }, { new: true })
    } catch (error) {
        throw new Error("Delete Failed.")
    }

    redirect(`/discussion/${discussionId}`)
}