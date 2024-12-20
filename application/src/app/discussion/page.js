"use client"
import ActivityCard from '@/components/ActivityCard'
import DiscussionCard from '@/components/DiscussionCard'
import Loading from '@/components/Loading/Loading'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useReducer } from 'react'

dayjs.extend(relativeTime)

const Discussion = () => {
    const searchParams = useSearchParams()
    const search = searchParams.get("q")
    const LIMIT = 10;
    const initialState = {
        page: 1,
        activityPage: 0,
        discussionList: [],
        activityList: [],
        loadingFlag: true
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "page_inc": {
                return { ...state, page: state.page + 1 }
            }
            case "activity_page_inc": {
                return { ...state, activityPage: state.activityPage + 1 }
            }
            case "set_discussion": {
                return { ...state, discussionList: action.discussionList }
            }
            case "set_activity": {
                return { ...state, activityList: action.activityList }
            }
            case "set_loading": {
                return { ...state, loadingFlag: action.loadingFlag }
            }
            default: {
                return state
            }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchDiscussions = async () => {
        dispatch({ type: "set_loading", loadingFlag: true })
        const api = await fetch(`/api/discussion?q=${search === null ? 'na' : search}&page=${state.page}`)
        const response = await api.json()
        if (response?.confirmation) {
            // setDiscussionList(response?.discussionList)
            dispatch({ type: "set_discussion", discussionList: response?.discussionList })
        }
        dispatch({ type: "set_loading", loadingFlag: false })

    }

    const fetchActivities = async () => {
        const api2 = await fetch(`/api/activity`)
        const response2 = await api2.json()
        if (response2?.confirmation) {
            const unsortedList = [...response2?.discussion, ...response2?.discussionThread]
            const sortedList = unsortedList.sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt))
            // setActivityList(sortedList)
            dispatch({ type: "set_activity", activityList: sortedList })

        }
    }

    const addPage = () => {
        dispatch({ type: "page_inc" })
    }
    const addActivityPage = () => {
        dispatch({ type: "activity_page_inc" })
    }

    useEffect(() => {
        fetchDiscussions()
    }, [state.page])

    useEffect(() => {
        fetchActivities()
    }, [])


    return (
        <div className='container container-lg'>
            {state.loadingFlag ?
                <div style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>
                    <Loading />
                </div>
                :
                <div className="row">
                    <div className="col col-12 col-md-8">
                        <h4 className='mt-4 mb-3'>{search === null ? "Latest Discussions" : `Results for "${search}"`}</h4>
                        {
                            (state.discussionList.length === 0 && !state.loadingFlag) && <h6 className='text-muted'>{search === null ? "No discussions found. Meanwhile, please get your ID verified and actively create discussions related to your queries." : "No search results. Try creating a new discussion for this topic to get answers."}</h6>
                        }
                        {state.discussionList.map((item, index) => <DiscussionCard key={index} data={item} />)}

                        {state.discussionList.length !== 0 && <div className="d-flex mt-3 mb-4 justify-content-center">
                            <button className="btn btn-outline-secondary" onClick={addPage}>
                                Load more discussions
                            </button>
                        </div>}
                    </div>
                    <div className="col col-12 col-md-4">
                        <h4 className='mt-4 mb-3'>Your past activity</h4>
                        {(state.activityList.length === 0 && !state.loadingFlag) && <h6 className='text-muted'>No actvities. You need to get your account verified before posting anything. <a href='/profile'>Verify your account now</a> </h6>}
                        {state.activityList.slice(state.activityPage * LIMIT, (state.activityPage + 1) * LIMIT).map((item, index) => <ActivityCard key={index} data={item} />)}

                        {state.activityList.length !== 0 && <div className="d-flex mt-3 mb-4 justify-content-center">
                            <button className="btn btn-outline-secondary" onClick={addActivityPage}>
                                Older
                            </button>
                        </div>}
                    </div>
                </div>}
        </div>
    )
}

export default Discussion

/*
(async function () {
            const api = await fetch(`/api/discussion?page=${state.page}`)
            const response = await api.json()
            if (response?.confirmation) {
                // setDiscussionList(response?.discussionList)
                dispatch({ type: "set_discussion", discussionList: response?.discussionList })
            }

            const api2 = await fetch(`/api/activity?page=${state.activityPage}`)
            const response2 = await api2.json()
            if (response2?.confirmation) {
                const unsortedList = [...response2?.discussion, ...response2?.discussionThread]
                const sortedList = unsortedList.sort((a, b) => dayjs(b.updatedAt).diff(a.updatedAt))
                // setActivityList(sortedList)
                dispatch({ type: "set_activity", activityList: sortedList })

            }
        })()
*/