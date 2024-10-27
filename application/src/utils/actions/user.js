"use server"
import { redirect } from "next/navigation"
import connectDB from "../db/connect-db"
import User from "../db/models/User"
import { deleteSingleFile, uploadSingleFile } from "../helpers/cdn"

export const submitProfile = async (formData) => {
    const email = formData.get('email').toLowerCase()
    const name = formData.get('name')
    const qualification = formData.get('qualification')
    const country = formData.get('country')
    const student = formData.get('student') === 'on' ? true : false;
    const identity = formData.get("identity");

    // for (var pair of formData.entries()) {
    //     console.log(pair[0] + ', ' + pair[1]);
    // }

    const identityUploadLink = await uploadSingleFile(identity)

    if (identityUploadLink === null) {
        throw new Error("File upload failed!")
    }

    try {
        await connectDB()
        const existingProfile = await User.findOne({ email })

        if (existingProfile) {
            await deleteSingleFile(existingProfile?.identity)
            await User.findOneAndUpdate({ email }, { name, qualification, country, student, identity: identityUploadLink, witness: [], verified: false }, { new: true })
        }
        else {
            await User.create({ email, name, qualification, country, student, identity: identityUploadLink })
        }

    } catch (error) {
        console.log(error)
        throw new Error("Profile update failed.")
    }

    redirect('/discussion')
}

export const getCurrentProfile = async (email) => {
    await connectDB()
    const user = await User.findOne({ email })

    return user === null ? null : user
}