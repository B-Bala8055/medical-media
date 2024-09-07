import connectDB from '@/utils/db/connect-db'
import DiscussionThread from '@/utils/db/models/DiscussionThread'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {

    const { id } = params

    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ confirmation: false, message: "Invalid request" })
    }

    await connectDB()

    const discussionThread = await DiscussionThread.findOne({ _id: id })

    if (discussionThread !== null) {
        return NextResponse.json({ confirmation: true, discussionThread })
    }
    return NextResponse.json({ confirmation: false, message: "Thread not found" })
}