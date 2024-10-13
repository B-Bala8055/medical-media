import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import { NextResponse } from 'next/server'

const LIMIT = 6

export async function GET(request) {
    // console.log(request)
    const page = Number(request.nextUrl.searchParams.get("page")) || 0
    const search = request.nextUrl.searchParams.get("q") || null

    await connectDB()

    if (search !== 'na') {
        await Discussion.ensureIndexes()
        const discussionQuery = [
            {
                $match: {
                    $text: {
                        $search: search,
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
                $skip: (page - 1) * LIMIT
            },
            {
                $limit: LIMIT
            }
        ]

        const searchResults = await Discussion.aggregate(discussionQuery).exec()
        console.log(searchResults)
        if (searchResults !== null && searchResults.length !== 0) {
            return NextResponse.json({ confirmation: true, discussionList: searchResults })
        } else {
            return NextResponse.json({ confirmation: false, message: `No search results. Try a different search term or try creating a new discussion to get answers` })
        }
    }

    const discussionList = await Discussion.find().sort({ createdAt: -1 }).skip((page - 1) * LIMIT).limit(LIMIT)
    if (discussionList !== null && discussionList.length !== 0) {
        return NextResponse.json({ confirmation: true, discussionList })
    }
    return NextResponse.json({ confirmation: false, message: "No more discussions" })
}