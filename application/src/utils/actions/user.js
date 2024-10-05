"use server"
import { redirect } from "next/navigation"
import connectDB from "../db/connect-db"
import User from "../db/models/User"

export const submitProfile = async (formData) => {
    const email = formData.get('email').toLowerCase()
    const name = formData.get('name')
    const qualification = formData.get('qualification')
    const country = formData.get('country')
    const student = formData.get('student') === 'on' ? true : false;
    const identity = "hello"
    console.log(email, name, qualification, country, student)
    try {
        await connectDB()
        const existingProfile = await User.exists({ email })

        if (existingProfile) {
            await User.findOneAndUpdate({ email }, { email, name, qualification, country, student, identity, witness: [], verified: false }, { new: true })
        }
        else {
            await User.create({ email, name, qualification, country, student, identity })
        }

    } catch (error) {
        console.log(error)
    }    //salert('Your profile is under review. People you know can review your account through community tab')
    redirect('/discussion')
}

export const getCurrentProfile = async (email) => {
    await connectDB()
    const user = await User.findOne({ email })

    return user === null ? null : user
}