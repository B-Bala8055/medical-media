import { verifyId } from '@/utils/actions/verification'
import React from 'react'

const VerificationCard = ({ email, name, student, identity }) => {
    return (
        <div className='card m-2' style={{ width: '300px' }}>
            <div className='card-body'>
                <p><i>{name} requested to verify ID</i> <small className="text-danger">{student ? '(Student)' : '(Professional)'}</small></p>
                <form action={verifyId}>
                    <input type="hidden" name="email" value={email} />
                    <div className='d-flex justify-content-center'>
                        <a className="btn btn-sm btn-outline-secondary" target='_blank' href={identity}>Open ID</a>&nbsp;
                        <button name='verify' value={false} type="submit" className="btn btn-sm btn-outline-secondary">Decline</button>&nbsp;
                        <button name='verify' value={false} type="submit" className="btn btn-sm btn-outline-secondary">Accept</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerificationCard