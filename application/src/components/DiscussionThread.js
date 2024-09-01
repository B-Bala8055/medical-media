import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import millify from 'millify'
import React from 'react'
import striptags from 'striptags'

dayjs.extend(relativeTime)

const DiscussionThread = (props) => {
    const { threads } = props

    const mainThreads = threads.filter(item => item.underId === 'main')

    const subThreads = (id) => {
        const threadsFiltered = threads.filter(item => item.underId === id.toString())
        return threadsFiltered
    }
    return (
        <>
            {
                mainThreads.map((item, index) => {
                    const upvoters = item?.upvoters || []
                    const downvoters = item?.downvoters || []
                    const votes = upvoters.length - downvoters.length

                    return (
                        <div className='mb-2' key={"main-" + index}>
                            <small dangerouslySetInnerHTML={{ __html: striptags(item.comment, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div']) }}></small>
                            <div className="mb-1 mt-1 d-flex align-items-center flex-wrap">
                                <span className="badge badge-primary bg-secondary">{millify(votes)} VOTES</span>
                                <a className="btn btn-link btn-sm" href={`/create-thread/${item.discussionId}/${item.underId}`}>Comment</a>
                                {/* <button className="btn btn-link btn-sm">Share</button> */}
                                <button className="btn btn-link btn-sm">Upvote</button>
                                <button className="btn btn-link btn-sm">Downvote</button>
                                <small className="text-muted ms-auto">{item.creator.split("@")[0]} posted {dayjs(item.createdAt).fromNow()}</small>
                            </div>
                            <div className="ms-md-4 mb-4">
                                <ul className="list-group">
                                    {
                                        subThreads(item._id).map((subItem, subIndex) => {
                                            const upvoters1 = subItem?.upvoters || []
                                            const downvoters1 = subItem?.downvoters || []
                                            const votes1 = upvoters1.length - downvoters1.length
                                            return (
                                                <li className="list-group-item flex-wrap" key={"main-" + index + "sub-" + subIndex}>
                                                    <small>
                                                        {striptags(subItem.comment)}
                                                        <span className='text-muted'> &nbsp;{subItem.creator.split("@")[0]} posted {dayjs(subItem.createdAt).fromNow()}</span>
                                                    </small>&nbsp;
                                                    <span className="badge badge-primary bg-secondary">{millify(votes1)} VOTES</span>
                                                    <button className="btn btn-link btn-sm">Upvote</button>
                                                    <button className="btn btn-link btn-sm">Downvote</button>
                                                </li>
                                            )
                                        })
                                    }

                                </ul>
                            </div>
                            <hr />
                        </div >
                    )
                })
            }


        </>
    )
}

export default DiscussionThread