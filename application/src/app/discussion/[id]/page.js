import ActivityCard from '@/components/ActivityCard'
import DiscussionThread from '@/components/DiscussionThread'
import { getOneDiscussionWithId, getRelatedDiscussions, voteDiscussion } from '@/utils/actions/discussion'
import { getDiscussionThreadsById } from '@/utils/actions/threads'
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

    let relatedDiscussions = []

    if (discussion?.heading) {
        relatedDiscussions = await getRelatedDiscussions(discussion?.heading)
    }

    const upvoters = discussion?.upvoters || []
    const downvoters = discussion?.downvoters || []
    const votes = upvoters.length - downvoters.length

    const alreadyUpvoted = upvoters.includes(session?.user?.email)
    const alreadyDownvoted = downvoters.includes(session?.user?.email)

    return (
        <div className='container container-lg'>
            <div className="row mt-4">
                <div className="col col-12 col-md-8">

                    <h4 className="mb-4">{discussion.heading}</h4>

                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: striptags(discussion.explanation, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div']) }} />
                    <div className='d-flex flex-wrap align-items-center'>
                        <span id="votes" className="badge badge-primary bg-secondary">{millify(votes)} VOTES</span>
                        <form action={voteDiscussion}>
                            <input type="hidden" value={discussion._id.toString()} name="id" />
                            <button id="upvote" className="btn btn-link btn-sm" name="vote" value="1" type='submit'>{alreadyUpvoted ? 'Upvoted' : 'Upvote'}</button>
                            <button id="downvote" className="btn btn-link btn-sm" name="vote" value="-1" type='submit' >{alreadyDownvoted ? 'Downvoted' : 'Downvote'}</button>
                        </form>
                        <a className='btn btn-link btn-sm' href={`/create-thread/${discussion._id}/main`}>Comment</a>
                        <button className='btn btn-link btn-sm'>Share</button>
                        <small className='ms-auto text-muted'>{discussion.creator.split("@")[0]} posted {dayjs(discussion.createdAt).fromNow()}&nbsp;{dayjs(discussion.updatedAt).diff(discussion.createdAt) > 60000 && `(Edited)`}</small>
                    </div>
                    <hr />
                    <h5 className="mb-3">Comments</h5>
                    <DiscussionThread threads={discussionThreads} />
                </div>
                <div className="col col-12 col-md-4">
                    <h4>Related</h4>
                    {/* <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard /> */}
                    {relatedDiscussions.map((item, index) => <ActivityCard key={index} data={item} />)}
                </div>
            </div>
        </div >
    )
}

export default CurrentDiscussion