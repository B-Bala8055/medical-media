"use client"
import { verifyId } from '@/utils/actions/verification'
import React, { useState } from 'react'

const VerificationCard = ({ email, name, student, identity }) => {
    const [actionTaken, setActionTaken] = useState(false)

    const actionTakenClick = () => { setActionTaken(true) }

    return (
        <div className={actionTaken ? 'card m-2 border-success' : 'card m-2'} style={{ width: '300px' }}>
            <div className='card-body'>
                <p>{name} &#8226; {student ? 'Student' : 'Professional'}</p>

                <form action={verifyId}>
                    <input type="hidden" name="email" value={email} />
                    <div className='d-flex justify-content-center'>
                        <a className="btn btn-sm btn-outline-secondary" target='_blank' href={identity}>Open ID</a>&nbsp;
                        <button name='verify' disabled={actionTaken} value={false} type="submit" onClick={actionTakenClick} className="btn btn-sm btn-outline-secondary">Decline</button>&nbsp;
                        <button name='verify' disabled={actionTaken} value={true} type="submit" onClick={actionTakenClick} className="btn btn-sm btn-outline-secondary">Accept</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerificationCard