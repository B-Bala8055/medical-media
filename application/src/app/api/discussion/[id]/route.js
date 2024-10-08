import connectDB from '@/utils/db/connect-db'
import Discussion from '@/utils/db/models/Discussion'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

// Get all latest 
export async function GET(request, { params }) {
    const { id } = params

    if (!mongoose.isValidObjectId(id)) {
        return NextResponse.json({ confirmation: false, message: "Invalid request" })
    }

    await connectDB()

    const discussion = await Discussion.findOne({ _id: id })

    if (discussion !== null) {
        return NextResponse.json({ confirmation: true, discussion })
    }
    return NextResponse.json({ confirmation: false, message: "Discussion not found" })
}