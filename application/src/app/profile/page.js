import React from 'react'

const Profile = () => {
    return (
        <div className='container container-lg mt-4'>
            <div className="row">
                <div className="col col-12 col-lg-8">
                    <h4 className='mb-4'>Edit your Profile</h4>
                    <form>
                        <label htmlFor='name' className='form-label'>Name</label>
                        <input id='name' className='form-control mb-3' type="text" name="name" />

                        <label htmlFor='qualification' className='form-label'>Qualification</label>
                        <input id='qualification' className='form-control mb-3' type="text" name="qualification" />

                        <label htmlFor='country' className='form-label'>Country</label>
                        <input id='country' className='form-control mb-3' type="text" name="country" />


                        <label htmlFor="formFile" className="form-label">ID Proof (JPEG / JPG / PNG)</label>
                        <input accept='.jpg,.jpeg,.png' multiple={false} className="form-control  mb-4" type="file" id="formFile" name="identity" />

                        <div className="d-flex justify-content-end">
                            <input id='student' className='form-check-input mb-3' type="checkbox" name="student" />
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