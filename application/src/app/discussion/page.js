"use client"
import ActivityCard from '@/components/ActivityCard'
import DiscussionCard from '@/components/DiscussionCard'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useEffect, useState } from 'react'

dayjs.extend(relativeTime)

const Discussion = () => {
    const [page, setPage] = useState(1)
    const [discussionList, setDiscussionList] = useState([])
    const [activityList, setActivityList] = useState([])

    useEffect(() => {
        (async function () {
            const api = await fetch(`/api/discussion?page=${page}`)
            const response = await api.json()
            if (response?.confirmation) {
                setDiscussionList(response?.discussionList)
            }

            const api2 = await fetch(`/api/activity?page=${page}`)
            const response2 = await api2.json()
            console.log(response2)
            if (response2?.confirmation) {
                const unsortedList = [...response2?.discussion, ...response2?.discussionThread]
                const sortedList = unsortedList.sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt))
                setActivityList(sortedList)
            }
        })()
    }, [page])

    return (
        <div className='container container-lg'>
            <div className="row">
                <div className="col col-12 col-md-8">
                    <h4 className='mt-4'>Latest Discussions</h4>
                    {
                        discussionList.length === 0 && <h6 className='text-muted'>No discussions related to your expertise. This is a new platform and we will catch up soon. Meanwhile, get your ID verified & actively contribute by posting discussions. This is a platform built entirely for you.</h6>
                    }
                    {discussionList.map((item, index) => <DiscussionCard key={index} data={item} />)}

                    {discussionList.length !== 0 && <div className="d-flex mt-3 mb-4 justify-content-center">
                        <button className="btn btn-outline-secondary" onClick={() => setPage(page + 1)}>
                            Load more discussions
                        </button>
                    </div>}
                </div>
                <div className="col col-12 col-md-4">
                    <h4 className='mt-4'>Your past activity</h4>
                    {activityList.length === 0 && <h6 className='text-muted'>No actvities. You need to get your account verified before posting anything. <a href='/profile'>Verify your account now</a> </h6>}
                    {activityList.map((item, index) => <ActivityCard key={index} data={item} />)}
                </div>
            </div>
        </div>
    )
}

export default Discussion