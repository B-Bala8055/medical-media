"use client"
import ActivityCard from '@/components/ActivityCard'
import DiscussionCard from '@/components/DiscussionCard'
import React, { useEffect, useState } from 'react'

const Discussion = () => {
    const [page, setPage] = useState(1)
    const [discussionList, setDiscussionList] = useState([])

    useEffect(() => {
        (async function () {
            const api = await fetch(`/api/discussion?page=${page}`)
            const response = await api.json()
            if (response?.confirmation) {
                setDiscussionList(response?.discussionList)
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        })()
    }, [page])

    return (
        <div className='container container-lg'>
            <div className="row">
                <div className="col col-12 col-md-8">
                    <h4 className='mt-4'>Latest Discussions</h4>

                    {discussionList.map((item, index) => <DiscussionCard key={index} data={item} />)}

                    <div className="d-flex mt-3 mb-4 justify-content-center">
                        <button className="btn btn-outline-secondary" onClick={() => setPage(page + 1)}>
                            Load more discussions
                        </button>
                    </div>
                </div>
                <div className="col col-12 col-md-4">
                    <h4 className='mt-4'>Your past activity</h4>
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
        </div>
    )
}

export default Discussion