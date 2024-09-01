import ActivityCard from '@/components/ActivityCard'
import DiscussionThread from '@/components/DiscussionThread'
import { getOneDiscussionWithId } from '@/utils/actions/discussion'
import { getDiscussionThreadsById } from '@/utils/actions/threads'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import millify from 'millify'
import React from 'react'
import striptags from 'striptags'

dayjs.extend(relativeTime)

const CurrentDiscussion = async ({ params }) => {
    const id = params?.id
    const discussion = await getOneDiscussionWithId(id)
    const discussionThreads = await getDiscussionThreadsById(id)

    const upvoters = discussion?.upvoters || []
    const downvoters = discussion?.downvoters || []
    const votes = upvoters.length - downvoters.length

    return (
        <div className='container container-lg'>
            <div className="row mt-4">
                <div className="col col-12 col-md-8">

                    <h4 className="mb-4">{discussion.heading}</h4>

                    <div style={{ textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: striptags(discussion.explanation, ['a', 'b', 'ul', 'ol', 'li', 'br', 'i', 'u', 'div']) }} />
                    <div className='d-flex flex-wrap align-items-center'>
                        <span className="badge badge-primary bg-secondary">{millify(votes)} VOTES</span>
                        <button className="btn btn-link btn-sm">Upvote</button>
                        <button className="btn btn-link btn-sm">Downvote</button>
                        <button className='btn btn-link btn-sm'>Comment</button>
                        <button className='btn btn-link btn-sm'>Share</button>
                        <small className='ms-auto text-muted'>{discussion.creator.split("@")[0]} posted {dayjs(discussion.createdAt).fromNow()}</small>
                    </div>
                    <hr />
                    <h5 className="mb-3">Comments</h5>
                    <DiscussionThread threads={discussionThreads} />
                </div>
                <div className="col col-12 col-md-4">
                    <h4>Related</h4>
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                    <ActivityCard />
                </div>
            </div>
        </div >
    )
}

export default CurrentDiscussion