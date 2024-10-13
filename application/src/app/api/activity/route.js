import { auth } from '@/utils/authentication/auth'
import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import DiscussionThread from '@/utils/db/models/DiscussionThread'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const session = await auth()
    // console.log(request)
    // const page = Number(request.nextUrl.searchParams.get("page")) || 0

    if (!session?.user) {
        return NextResponse.json({ confirmation: false, discussion: [], discussionThread: [] })
    }

    await connectDB()

    const discussion = await Discussion.find({ creator: session?.user?.email.toLowerCase() })
    const discussionThread = await DiscussionThread.find({ creator: session?.user?.email.toLowerCase() })

    return NextResponse.json({ confirmation: true, discussion, discussionThread })

}