import React from 'react'

const VerificationCard = () => {
    return (
        <div className='card m-2' style={{ width: '200px' }}>
            <img src="https://images.pexels.com/photos/27244362/pexels-photo-27244362/free-photo-of-lakes-viti-and-oskjuvatn-on-iceland.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="card-img-top" style={{ maxWidth: '200px', aspectRatio: 3 / 2, objectFit: 'cover' }} alt="Identity" />
            <div className='card-body'>
                <div className="card-image"></div>
                <form >
                    <div className='d-block mb-2 text-center'>
                        <input id="studentFlag" className='form-check-input' type='checkbox' name="student" defaultChecked={false} />
                        <label className='form-check-label' htmlFor="studentFlag">&nbsp;Is Student?</label>
                    </div>
                    <div className='d-flex justify-content-around'>
                        <button type="button" className="btn btn-outline-secondary">Decline</button>&nbsp;
                        <button type="button" className="btn btn-outline-secondary">Accept</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerificationCard