import VerificationCard from '@/components/VerificationCard'
import React from 'react'

const Community = () => {
    return (
        <div className='container container-lg mt-3'>
            <div className='row'>
                <div className="col col-12">
                    <p className='fst-italic text-secondary'>
                        To ensure the accuracy and security of our platform, we request the existing users to verify the identity of new members by reviewing their ID before the new users can be fully approved. Please assist us by promptly checking the IDs of new users.
                    </p>
                </div>
                <div className="col col-12 mb-5">
                    <form>
                        <label htmlFor="searchUserInput" className="form-label">Search people you know by their E-mail</label>
                        <div className='row'>
                            <div className="col-10">
                                <input id="searchUserInput" type="text" name="search" className='form-control' placeholder='Search user...' />
                            </div>
                            <div className="col-2">

                                <button type='submit' className='btn btn-outline-secondary'>Search</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col col-12">
                    <div className='d-flex flex-row flex-wrap justify-content-center'>
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                        <VerificationCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community