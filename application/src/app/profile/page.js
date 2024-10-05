import { getCurrentProfile, submitProfile } from '@/utils/actions/user'
import { auth } from '@/utils/authentication/auth'
import { redirect } from 'next/navigation'
import React from 'react'


const Profile = async () => {

    const session = await auth()

    if (!session?.user) redirect("/")

    let user = await getCurrentProfile(session?.user?.email.toLowerCase())
    if (user === null) {
        user = {
            name: "",
            qualification: "",
            country: "",
            student: false,
            verified: false
        }
    }

    return (
        <div className='container container-lg mt-4 mb-5'>
            <div className="row">
                <div className="col col-12 col-lg-8">
                    <h4 className='mb-4'>Edit your Profile</h4>
                    <p className={user?.verified ? 'text-success' : 'text-danger'}><b>{user?.verified ? 'Your ID Proof is verified' : 'Your ID Proof is not verified'}</b></p>
                    {!user?.verified && <p><small className='text-muted'>Please wait until someone from community accepts you. If you know an already verified user, ask them to accept you.</small></p>}
                    <form action={submitProfile}>
                        <label htmlFor='email1' className='form-label'>Registered Email</label>
                        <input type='text' name="email1" className='form-control mb-3' readOnly={true} disabled={true} value={session?.user?.email.toLowerCase()} />

                        <input type='hidden' name="email" value={session?.user?.email.toLowerCase()} />

                        <label htmlFor='name' className='form-label'>Name</label>
                        <input id='name' required className='form-control mb-3' type="text" name="name" placeholder={user?.name} />

                        <label htmlFor='qualification' className='form-label'>Qualification</label>
                        <input id='qualification' required className='form-control mb-3' type="text" name="qualification" placeholder={user.qualification} />

                        <label htmlFor='country' className='form-label'>Country</label>
                        <input id='country' required className='form-control mb-3' type="text" name="country" placeholder={user.country} />


                        <label htmlFor="formFile" className="form-label">ID Proof (JPEG / JPG / PNG)</label>
                        <input accept='.jpg,.jpeg,.png' multiple={false} className="form-control  mb-4" type="file" id="formFile" name="identity" />

                        <div className="d-flex justify-content-end">
                            <input id='student' className='form-check-input mb-3' type="checkbox" name="student" defaultChecked={user.student} />
                            <label htmlFor='student' className='form-check-label'>&nbsp;Is Student?</label>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type='submit' className='btn btn-outline-secondary float-right'>Update Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Profile