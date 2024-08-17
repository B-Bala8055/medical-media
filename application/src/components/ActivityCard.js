import React from 'react'

const ActivityCard = () => {
    return (
        <div className='card mt-1 mb-1'>
            <div className="card-body">
                <p className="card-text">
                    <small className='text-muted'><b>  Votes: 1 &#183; Posted: 12/04/2024 </b></small>
                </p>
                <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                    <small className='text-muted'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit pariatur provident nihil quia cumque, quidem quam doloremque accusantium incidunt exercitationem, alias similique totam ea nulla itaque harum dolore. Alias, rerum?
                    </small>
                </p>
            </div>
        </div>
    )
}

export default ActivityCard