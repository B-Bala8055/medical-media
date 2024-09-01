import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import DiscussionThread from '@/utils/db/models/DiscussionThread'
import { NextResponse } from 'next/server'

// Get all latest 
export async function GET(request) {
    // console.log(request)
    const { id } = params
    await connectDB()

    const discussion = await Discussion.findOne({ _id: id })
    const discussionThreads = await DiscussionThread.findAll({ discussionId: id })

    if (discussion !== null) {
        return NextResponse.json({ confirmation: true, discussion, discussionThreads })
    }
    return NextResponse.json({ confirmation: false })
}