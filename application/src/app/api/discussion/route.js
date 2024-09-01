import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import { NextResponse } from 'next/server'

const LIMIT = 6

export async function GET(request) {
    // console.log(request)
    const page = Number(request.nextUrl.searchParams.get("page")) || 0

    await connectDB()

    const discussionList = await Discussion.find().sort({ createdAt: -1 }).skip((page - 1) * LIMIT).limit(LIMIT)
    if (discussionList !== null && discussionList.length !== 0) {
        console.log('Return records', discussionList[0])
        return NextResponse.json({ confirmation: true, discussionList })
    }
    return NextResponse.json({ confirmation: false })
}