import { auth } from '@/utils/authentication/auth'
import connectDB from '@/utils/db/connect-db'
import User from '@/utils/db/models/User'
import { NextResponse } from 'next/server'

export async function GET(request) {
    const session = await auth()

    const editMode = request.nextUrl.searchParams.get("edit")

    if (typeof editMode === 'undefined') {
        return NextResponse.json({ confirmation: false, message: "Unauthorized!" })
    }

    const editFlag = editMode === 'true' ? true : false

    if (!session?.user) {
        return NextResponse.json({ confirmation: false, message: "Kindly Login to Proceed." })
    }

    const email = session?.user?.email

    await connectDB()

    const user = await User.findOne({ email })

    if (!user) {
        return NextResponse.json({ confirmation: false, message: "Fill your profile and get verified to create a discussion." })
    }

    if (!user.verified && !editFlag) {
        return NextResponse.json({ confirmation: false, message: "Account not verified after latest ID submission. You can still edit your old discussions." })
    }

    if (user.student) {
        return NextResponse.json({ confirmation: false, message: "Students are restricted from creating discussions. If you are a physician already, submit your latest ID and get verified." })
    }

    return NextResponse.json({ confirmation: true, message: "Approved" })

}