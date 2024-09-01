import React from 'react'
import stripTags from 'striptags'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const DiscussionCard = ({ data }) => {
    return (
        <div className="card mt-1 mb-1" style={{ width: '100%', display: 'block' }}>
            <div className="card-body">
                <p className='card-text fw-bold'>
                    <small className='text-muted'>{data.creator.split("@")[0]} <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>posted </span> {dayjs(data.createdAt).fromNow()} {dayjs(data.updatedAt).diff(data.createdAt) > 60000 && `(Edited)`}</small>
                </p>
                <h5 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                    <a className='link text-capitalize' href={`/discussion/${data._id}`}>{data.heading}</a>
                </h5>
                <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}><small className="text-muted">{stripTags(data.explanation)}</small></p>
            </div>
        </div >
    )
}

export default DiscussionCard