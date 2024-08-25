"use server"
import connectDB from "../db/connect-db";
import Discussion from "../db/models/Discussion";
import User from "../db/models/User";
import { auth } from "../authentication/auth";

export const getOneDiscussionWithId = async (id) => {
    await connectDB()

    const discussion = await Discussion.findOne({ _id: id })

    return discussion;
}

export const submitDiscussion = async (formData) => {
    const session = await auth()
    const id = formData.get("id")
    const creator = session?.user?.email
    const heading = formData.get("heading")
    const tags = formData.get("tags")
    const explanation = formData.get("explanation")

    // console.log(id, creator, heading, tags, explanation)

    try {
        await connectDB()

        if (id === 'new') {

            const existingCreator = await User.exists({ email: creator })

            if (creator === null || creator === undefined || !existingCreator) {
                throw new Error("Unauthorized access!")
            }

            await Discussion.create({ heading, tags, explanation, creator })

        } else {
            const existingDiscussion = await Discussion.findOne({ _id: id })

            if (existingDiscussion === null) {
                throw new Error("The discussion you are trying to edit does not exist")
            }

            if (existingDiscussion?.creator !== creator) {
                throw new Error("Unauthorized access!")
            }

            await Discussion.findOneAndUpdate({ _id: id }, { heading, tags, explanation }, { new: true })
        }
    } catch (err) {
        throw new Error(err.message)
    }
}
