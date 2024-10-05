import { voteDiscussionThread } from '@/utils/actions/threads'
import { auth } from '@/utils/authentication/auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import millify from 'millify'
import React from 'react'
import striptags from 'striptags'

dayjs.extend(relativeTime)

const DiscussionThread = async (props) => {
    const { threads } = props
    const session = await auth()
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
                    const email = session?.user?.email.toLowerCase()

                    const alreadyUpvoted = upvoters.includes(email)
                    const alreadyDownvoted = downvoters.includes(email)

                    return (
                        <div className='mb-2' key={"main-" + index}>
                            <small dangerouslySetInnerHTML={{ __html: striptags(item.comment, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div']) }}></small>
                            <div className="mb-1 mt-1 d-flex align-items-center flex-wrap">
                                <span className="badge badge-primary bg-secondary">{millify(votes)} VOTES</span>
                                <form action={voteDiscussionThread}>
                                    <input type="hidden" value={item._id.toString()} name="id" />
                                    <button className="btn btn-link btn-sm" name="vote" value="1" type='submit'>{alreadyUpvoted ? 'Upvoted' : 'Upvote'}</button>
                                    <button className="btn btn-link btn-sm" name="vote" value="-1" type='submit'>{alreadyDownvoted ? 'Downvoted' : 'Downvote'}</button>
                                </form>
                                <a className="btn btn-link btn-sm" href={`/create-thread/${item.discussionId}/${item._id}`}>Comment</a>
                                {item?.creator.toLowerCase() === session?.user?.email.toLowerCase() && <a className="btn btn-link btn-sm" href={`/create-thread/edit/main/${item.discussionId}/${item._id}`}>Edit</a>}
                                <small className="text-muted ms-auto">{item.creator.split("@")[0]} posted {dayjs(item.createdAt).fromNow()}&nbsp;{dayjs(item.updatedAt).diff(item.createdAt) > 60000 && `(Edited)`}</small>
                            </div>
                            <div className="ms-md-4 mb-4">
                                <ul className="list-group">
                                    {
                                        subThreads(item._id).map((subItem, subIndex) => {
                                            const upvoters1 = subItem?.upvoters || []
                                            const downvoters1 = subItem?.downvoters || []
                                            const votes1 = upvoters1.length - downvoters1.length

                                            const alreadyUpvoted1 = upvoters1.includes(session?.user?.email.toLowerCase())
                                            const alreadyDownvoted1 = downvoters1.includes(session?.user?.email.toLowerCase())

                                            return (
                                                <li className="list-group-item flex-wrap" key={"main-" + index + "sub-" + subIndex}>
                                                    <small>
                                                        {striptags(subItem.comment)}
                                                        <span className='text-muted'> &nbsp;{subItem.creator.split("@")[0]} posted {dayjs(subItem.createdAt).fromNow()}&nbsp;{dayjs(subItem.updatedAt).diff(subItem.createdAt) > 60000 && `(Edited)`}</span>&nbsp;
                                                        <span className="badge badge-primary bg-secondary">{millify(votes1)} VOTES</span>
                                                        <form action={voteDiscussionThread} className="d-inline">
                                                            <input type="hidden" value={subItem._id.toString()} name="id" />
                                                            <button className="btn btn-link btn-sm" name="vote" value="1" type='submit'>{alreadyUpvoted1 ? 'Upvoted' : 'Upvote'}</button>
                                                            <button className="btn btn-link btn-sm" name="vote" value="-1" type='submit'>{alreadyDownvoted1 ? 'Downvoted' : 'Downvote'}</button>
                                                        </form>
                                                        {subItem?.creator.toLowerCase() === session?.user?.email.toLowerCase() && <a className="btn btn-link btn-sm" href={`/create-thread/edit/${item._id}/${item.discussionId}/${subItem._id}`}>Edit</a>}
                                                    </small>
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