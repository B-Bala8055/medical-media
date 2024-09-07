import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import millify from 'millify'
import { redirect } from 'next/navigation'
import React from 'react'
import striptags from 'striptags'

dayjs.extend(relativeTime)

const ActivityCard = ({ data }) => {
    return (
        <a className='card mt-1 mb-1 text-decoration-none' href={`/discussion/${data?.discussionId || data?._id}`}>
            <div className="card-body">
                <p className="card-text">
                    <small className='text-muted'><b>  Votes: {millify((data?.upvoters || []).length - (data?.downvoters || []).length)} &#183; Posted: {dayjs(data?.updatedAt).fromNow()} </b></small>
                </p>
                <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                    <small className='text-muted'>
                        {striptags(data?.comment) || striptags(data?.heading)}
                    </small>
                </p>
            </div>
        </a>
    )
}

export default ActivityCard