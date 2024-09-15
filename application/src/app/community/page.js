import VerificationCard from '@/components/VerificationCard'
import { getCurrentProfile } from '@/utils/actions/user'
import { getUnverifiedUsers } from '@/utils/actions/verification'
import { auth } from '@/utils/authentication/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const Community = async () => {

    const session = await auth()

    if (!session?.user) {
        redirect('/')
    } else {
        const email = session?.user?.email
        const myDetails = await getCurrentProfile(email)

        if (myDetails === null || !myDetails?.verified) {
            redirect('/discussion')
        }
    }

    const usersList = await getUnverifiedUsers()

    return (
        <div className='container container-lg mt-3'>
            <div className='row'>
                <div className="col col-12">
                    <p className='fst-italic text-secondary'>
                        To ensure the accuracy and security of our platform, we request the existing users to verify the identity of new members by reviewing their ID before the new users can be fully approved. Please assist us by promptly checking the IDs of new users.
                    </p>
                </div>
                <div className="col col-12 mb-5">
                    <form style={{ display: 'flex', justifyContent: 'center' }}>
                        <input id="searchUserInput" type="text" name="search" className='form-control' placeholder='Search user by email' />&nbsp;
                        <button type='submit' className='btn btn-outline-secondary'>Search</button>
                    </form>
                </div>
                <div className="col col-12">
                    <div className='d-flex flex-row flex-wrap justify-content-center'>
                        {
                            usersList.map((item, index) => <VerificationCard key={index} email={item._doc?.email} name={item._doc?.name} student={item._doc?.student} identity={item._doc?.identity} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community