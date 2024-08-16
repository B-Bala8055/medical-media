import React from 'react'

const DiscussionCard = ({ data }) => {
    return (
        <div className="card mt-1 mb-1" style={{ width: '100%', display: 'block' }}>
            <div className="card-body">
                <p className='card-text fw-bold'>
                    <small className='text-muted'>{data.creator.name} <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>posted at</span> {data.timestamp}</small>
                </p>
                <h5 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                    <a className='link text-capitalize'>{data.heading}</a>
                </h5>
                <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}><small className="text-muted">{data.explanation}</small></p>
            </div>
        </div >
    )
}

export default DiscussionCard