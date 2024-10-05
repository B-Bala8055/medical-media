import VerificationCard from '@/components/VerificationCard'
import { getCurrentProfile } from '@/utils/actions/user'
import { getUnverifiedUsers } from '@/utils/actions/verification'
import { auth } from '@/utils/authentication/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Community = async ({ searchParams }) => {
    const search = typeof (searchParams?.search) === 'undefined' ? null : searchParams?.search
    const session = await auth()

    if (!session?.user) {
        redirect('/')
    } else {
        const email = session?.user?.email.toLowerCase()
        const myDetails = await getCurrentProfile(email)
        if (myDetails === null || !myDetails?.verified) {
            throw new Error("Verify your account to access community")
        }
    }

    const usersList = await getUnverifiedUsers(search)

    return (
        <div className='container container-lg mt-3'>
            <div className='row'>
                <div className="col col-12">
                    <p className='fst-italic'>
                        To ensure the accuracy and security of discussions in our platform, we request the existing users to verify the identity of new members by reviewing their ID before the new users can be fully approved. Please assist us by promptly checking the IDs of new users.
                    </p>
                </div>
                <div className="col col-12 mb-5">
                    <form style={{ display: 'flex', justifyContent: 'center' }} method='GET' action='/community'>
                        <input id="searchUserInput" type="text" name="search" className='form-control' placeholder='Search user by email' />&nbsp;
                        <button type='submit' className='btn btn-outline-secondary'>Search</button>
                    </form>
                </div>
                <div className="col col-12">
                    <div className='d-flex flex-row flex-wrap justify-content-center'>
                        {
                            usersList.map((item, index) => <VerificationCard key={index} email={item._doc?.email.toLowerCase()} name={item._doc?.name} student={item._doc?.student} identity={item._doc?.identity} />)
                        }
                        {
                            (usersList.length === 0 && search === null) && <h6>No users are pending verification. Thanks for your support!</h6>
                        }
                        {
                            (usersList.length === 0 && search !== null) &&
                            <div className='d-block'>
                                <h6>We were not able to find any unverified user for your search <u>{search}</u>.</h6>
                                <ul>
                                    <li>Check if the email is correct.</li>
                                    <li>Check if the email is already verified.</li>
                                </ul>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community