"use client"
import ClientError from '@/components/ClientError';
import Loading from '@/components/Loading/Loading';
import { deleteMediaFromDiscussion, submitDiscussion } from '@/utils/actions/discussion';
import { checkEligibility_createDiscussion } from '@/utils/common/apiCalls';
import { redirect } from 'next/navigation';
import React, { useEffect, useReducer } from 'react'
import {
    BtnBold,
    BtnItalic,
    BtnUndo,
    BtnRedo,
    Editor,
    EditorProvider,
    Toolbar,
    BtnLink,
    BtnUnderline,
    BtnClearFormatting,
    BtnBulletList,
    BtnNumberedList,
    Separator
} from 'react-simple-wysiwyg';

const page = ({ params }) => {

    const id = params.type;
    // const [explanation, setExplanation] = useState("")
    // const [discussion, setDiscussion] = useState(null)
    // const [submitted, setSubmitted] = useState(false)
    // const [loadingFlag, setLoadingFlag] = useState(true)

    const initialState = {
        explanation: "",
        discussion: null,
        submitted: false,
        loadingFlag: true,
        error: null
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "set_explanation": {
                return { ...state, explanation: action.explanation }
            }
            case "set_discussion_explanation": {
                return { ...state, discussion: action.discussion, explanation: action.explanation }
            }
            case "submit_flag": {
                return { ...state, submitted: action.submitted }
            }
            case "loading_flag": {
                return { ...state, loadingFlag: action.loadingFlag }
            }
            case "set_error": {
                console.log(action)
                return { ...state, error: action.error }
            }
            default: { return state }
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);


    const submitAction = () => dispatch({ type: "submit_flag", submitted: true })
    const loadingOFF = () => dispatch({ type: "loading_flag", loadingFlag: false })

    const handleExplanation = (e) => {
        // setExplanation(e.target.value)
        dispatch({ type: "set_explanation", explanation: e.target.value })
    }

    useEffect(() => {


        if (id !== 'new') {
            (async function () {
                const status = await checkEligibility_createDiscussion('true', (error) => dispatch({ type: "set_error", error }))
                if (status === false) {
                    loadingOFF()
                    return;
                }
                const api = await fetch(`/api/discussion/${id}`)
                const response = await api.json()
                if (response?.confirmation) {
                    dispatch({ type: "set_discussion_explanation", discussion: response?.discussion, explanation: response?.discussion?.explanation })
                } else {
                    dispatch({ type: "set_error", error: response?.message })
                }
                loadingOFF()
            })()
        } else {
            checkEligibility_createDiscussion('false', (error) => dispatch({ type: "set_error", error }))
            loadingOFF()
        }
    }, [id])

    return (
        <div className='container container-lg mt-4 mb-3'>
            {

                state?.loadingFlag ? (
                    <div style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>
                        <Loading />
                    </div>
                )
                    :
                    (state?.error === null ?
                        <>
                            <h4 className='mb-4'>Create a Discussion</h4>

                            {(state?.discussion !== null && state?.discussion?.mediaLinks.length > 0) && <form action={deleteMediaFromDiscussion}>
                                <input type="hidden" name="discussionId" value={state?.discussion?._id.toString()} />
                                <div className='card mt-3 mb-4'>
                                    <div className="card-header">Delete Media</div>
                                    <div className="card-body">
                                        {
                                            state?.discussion?.mediaLinks.map((item, index) => {
                                                return (
                                                    <div className="d-flex" key={index}>
                                                        <a href={item} target='_blank' className="link-dark link-underline link-underline-opacity-0 me-2"><small>{item.split("/").pop()}</small></a>
                                                        <button className="btn btn-sm btn-link" name="mediaFileName" value={item} type="submit">Delete</button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </form>}
                            <form action={submitDiscussion}>
                                <input type="hidden" name="id" value={id} />
                                <input type="hidden" name="explanation" value={state.explanation} />

                                <label htmlFor='heading' className='form-label'>Title</label>
                                <input id='heading' required maxLength={100} minLength={10} className='form-control mb-3' type="text" name="heading" defaultValue={state?.discussion !== null ? state?.discussion?.heading : ""} />

                                <label htmlFor='tag' className='form-label'>Tags</label>
                                <input id='tag' required maxLength={50} className='form-control mb-3' type="text" name="tags" defaultValue={state?.discussion !== null ? state?.discussion?.tags : ""} />

                                <label htmlFor="formFile" className="form-label">Media 	&#183; Max 5 files | 2 MB each</label>
                                <input multiple={true} accept='image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf,.odt,.odp' className="form-control  mb-4" type="file" id="formFile" name="media" />

                                <label htmlFor='explanation' className='form-label'>Description {`(${state?.explanation.length}/2000)`}</label>
                                <EditorProvider>
                                    <Editor id='explanation' value={state?.explanation} onChange={handleExplanation}>
                                        <Toolbar>
                                            <BtnUndo />
                                            <BtnRedo />
                                            <Separator />
                                            <BtnBold />
                                            <BtnItalic />
                                            <BtnUnderline />
                                            <BtnLink />
                                            <Separator />
                                            <BtnBulletList />
                                            <BtnNumberedList />
                                            <Separator />
                                            <BtnClearFormatting />
                                            <Separator />
                                        </Toolbar>
                                    </Editor>
                                </EditorProvider>

                                <div className="mt-4 d-flex justify-content-end">
                                    <button type="reset" disabled={state?.submitted} onClick={submitAction} className="btn btn-outline-secondary">Reset</button>&nbsp;
                                    <button type="submit" disabled={state?.submitted} onClick={submitAction} className="btn btn-outline-secondary">Submit</button>
                                </div>
                            </form> </> : <ClientError error={state?.error} reset={() => redirect("/")} />
                    )}
        </div >
    )
}

export default page