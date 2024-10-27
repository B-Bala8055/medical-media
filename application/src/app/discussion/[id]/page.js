import ActivityCard from '@/components/ActivityCard'
import DiscussionThread from '@/components/DiscussionThread'
import { deleteDiscussion, getOneDiscussionWithId, getRelatedDiscussions, voteDiscussion } from '@/utils/actions/discussion'
import { getDiscussionThreadsById } from '@/utils/actions/threads'
import { getCurrentProfile } from '@/utils/actions/user'
import { auth } from '@/utils/authentication/auth'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import millify from 'millify'
import React from 'react'
import striptags from 'striptags'

dayjs.extend(relativeTime)

const CurrentDiscussion = async ({ params }) => {
    const session = await auth()
    const id = params?.id
    const discussion = await getOneDiscussionWithId(id)
    const discussionThreads = await getDiscussionThreadsById(id)
    const registeredUser = await getCurrentProfile(session?.user?.email)

    const isVerifiedUser = registeredUser === null ? false : registeredUser?.verified

    let relatedDiscussions = []

    if (discussion?.heading) {
        relatedDiscussions = await getRelatedDiscussions(discussion?.heading)
    }

    const upvoters = discussion?.upvoters || []
    const downvoters = discussion?.downvoters || []
    const votes = upvoters.length - downvoters.length

    const alreadyUpvoted = upvoters.includes(session?.user?.email.toLowerCase())
    const alreadyDownvoted = downvoters.includes(session?.user?.email.toLowerCase())

    return (
        <div className='container container-lg'>
            <div className="row mt-4 mb-3">
                <div className="col col-12 col-md-8">

                    <h4 className="mb-4">{discussion.heading}</h4>

                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: striptags(discussion.explanation, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div']) }} />

                    {discussion?.mediaLinks.length > 0 &&
                        <div className="d-flex flex-wrap mb-3 mt-2">
                            {isVerifiedUser ? discussion?.mediaLinks.map((item, index) => <a key={index} href={item} target='_blank' className='link-secondary me-2'><small>{item.split("/").pop()}</small></a>) : <p><small className='text-muted'>Media files are hidden, because your ID is not verified.</small></p>}
                        </div>
                    }

                    <div className='d-flex flex-wrap align-items-center mt-2'>
                        <span id="votes" className="badge badge-primary bg-secondary">{millify(votes)} VOTES</span>
                        <form action={voteDiscussion}>
                            <input type="hidden" value={discussion._id.toString()} name="id" />
                            <button id="upvote" className="btn btn-link btn-sm" name="vote" value="1" type='submit'>{alreadyUpvoted ? 'Upvoted' : 'Upvote'}</button>
                            <button id="downvote" className="btn btn-link btn-sm" name="vote" value="-1" type='submit' >{alreadyDownvoted ? 'Downvoted' : 'Downvote'}</button>
                        </form>
                        <a className='btn btn-link btn-sm' href={`/create-thread/${discussion._id}/main`}>Comment</a>
                        {/* <button className='btn btn-link btn-sm'>Share</button> */}
                        {discussion?.creator.toLowerCase() === session?.user?.email.toLowerCase() &&
                            <>
                                <a className='btn btn-link btn-sm' href={`/create-discussion/${discussion._id}`}>Edit</a>
                                <form action={deleteDiscussion}>
                                    <button className='btn btn-link btn-sm' name="deleteAction" value={id} type="submit">Delete</button>
                                </form>
                            </>
                        }
                        <small className='ms-auto text-muted'>{dayjs(discussion.createdAt).fromNow()}&nbsp;{dayjs(discussion.updatedAt).diff(discussion.createdAt) > 600000 && `(Edited)`}</small>
                    </div>
                    <hr />
                    <h5 className="mb-3">Comments</h5>
                    <DiscussionThread threads={discussionThreads} isVerifiedUser={isVerifiedUser} />
                </div>
                <div className="col col-12 col-md-4">
                    <h4>Related</h4>
                    {relatedDiscussions.filter(item => item._id.toString() !== id).map((item, index) => <ActivityCard key={index} data={item} />)}
                    {relatedDiscussions.length <= 1 && <h6>No Related discussions</h6>}
                </div>
            </div>
        </div >
    )
}

export default CurrentDiscussion