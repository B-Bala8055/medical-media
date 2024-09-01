import React from 'react'

const DiscussionThread = () => {
    return (
        <div className='mb-2'>
            <p className='mb-1'>
                <small>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, labore animi ratione eius repellendus ipsam deserunt sapiente fugiat ea fugit tempora nemo facilis magni. Asperiores dolorem odit magnam perspiciatis aliquam.
                </small>
            </p>
            <div className="mb-1 d-flex align-items-center flex-wrap">
                <span className="badge badge-primary bg-secondary">10 VOTES</span>
                <button className="btn btn-link btn-sm">Comment</button>
                {/* <button className="btn btn-link btn-sm">Share</button> */}
                <button className="btn btn-link btn-sm">Upvote</button>
                <button className="btn btn-link btn-sm">Downvote</button>
                <small className="text-muted ms-auto">Rishikesh posted on 25/02/2023</small>
            </div>
            <div className="ms-md-4 mb-4">

                <ul className="list-group">
                    <li className="list-group-item flex-wrap"> <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quidem molestiae perspiciatis asperiores porro alias? <span className='text-muted'> &nbsp;Master posted on 25-Aug-2020</span></small>&nbsp;<span className="badge badge-primary bg-secondary">10 VOTES</span><button className="btn btn-link btn-sm">Upvote</button><button className="btn btn-link btn-sm">Downvote</button></li>
                    <li className="list-group-item flex-wrap"> <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quidem molestiae perspiciatis asperiores porro alias? <span className='text-muted'> &nbsp;Master posted on 25-Aug-2020</span></small>&nbsp;<span className="badge badge-primary bg-secondary">10 VOTES</span><button className="btn btn-link btn-sm">Upvote</button><button className="btn btn-link btn-sm">Downvote</button></li>
                    <li className="list-group-item flex-wrap"> <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quidem molestiae perspiciatis asperiores porro alias? <span className='text-muted'> &nbsp;Master posted on 25-Aug-2020</span></small>&nbsp;<span className="badge badge-primary bg-secondary">10 VOTES</span><button className="btn btn-link btn-sm">Upvote</button><button className="btn btn-link btn-sm">Downvote</button></li>
                    <li className="list-group-item flex-wrap"> <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quidem molestiae perspiciatis asperiores porro alias? <span className='text-muted'> &nbsp;Master posted on 25-Aug-2020</span></small>&nbsp;<span className="badge badge-primary bg-secondary">10 VOTES</span><button className="btn btn-link btn-sm">Upvote</button><button className="btn btn-link btn-sm">Downvote</button></li>
                    <li className="list-group-item flex-wrap"> <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, quidem molestiae perspiciatis asperiores porro alias? <span className='text-muted'> &nbsp;Master posted on 25-Aug-2020</span></small>&nbsp;<span className="badge badge-primary bg-secondary">10 VOTES</span><button className="btn btn-link btn-sm">Upvote</button><button className="btn btn-link btn-sm">Downvote</button></li>
                </ul>
            </div>
            <hr />
        </div>
    )
}

export default DiscussionThread