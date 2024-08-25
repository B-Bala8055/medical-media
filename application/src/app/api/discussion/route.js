import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import { NextResponse } from 'next/server'

export async function GET(request) {
    // console.log(request)
    const id = request.nextUrl.searchParams.get("id")

    await connectDB()

    const discussion = await Discussion.findOne({ _id: id })
    if (discussion !== null) {
        return NextResponse.json({ confirmation: true, discussion })
    }
    return NextResponse.json({ confirmation: false })
}