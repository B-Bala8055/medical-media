"use client"
import ClientError from '@/components/ClientError';
import Loading from '@/components/Loading/Loading';
import { editThread } from '@/utils/actions/threads';
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
    // const [explanation, setExplanation] = useState("")
    // const [submitted, setSubmitted] = useState(false)
    // const [loadingFlag, setLoadingFlag] = useState(true)


    const initialState = {
        explanation: "",
        submitted: false,
        loadingFlag: true,
        error: null
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case "set_explanation": {
                return { ...state, explanation: action.explanation }
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
        (async function () {
            const status = await checkEligibility_createDiscussion('true', (error) => dispatch({ type: "set_error", error }));
            if (status === false) {
                loadingOFF()
                return;
            }
            const api = await fetch(`/api/thread/${params.slug[2]}`)
            const response = await api.json()
            if (response?.confirmation) {
                dispatch({ type: "set_explanation", explanation: response?.discussionThread?.comment })
            } else {
                dispatch({ type: "set_error", error: response?.message })
            }
            loadingOFF()
        })()
    }, [params.slug[2]])

    return (
        <div className='container container-lg mt-4'>
            {

                state.loadingFlag ? (
                    <div style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>
                        <Loading />
                    </div>
                )
                    :
                    (state.error === null ?
                        <>
                            <h4 className='mb-4'>Edit your Thread</h4>
                            <form action={editThread}>
                                <input type="hidden" name="id" value={params.slug[2]} />
                                <input type="hidden" name="discussionId" value={params.slug[1]} />
                                <input type="hidden" name="comment" value={state.explanation} />
                                <label htmlFor="explanation" className='form-label'>Comment {`(${state.explanation.length}/1400)`}</label>
                                <div className="mb-3">
                                    <EditorProvider>
                                        <Editor id='explanation' value={state.explanation} onChange={handleExplanation}>
                                            {params.slug[0] === 'main' && (<Toolbar>
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
                                            </Toolbar>)}
                                        </Editor>
                                    </EditorProvider>
                                </div>
                                {params.slug[0] === 'main' && (
                                    <>
                                        <label htmlFor="media" className='form-label'>Attach Media</label>
                                        <input multiple={true} accept='.xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf' className="form-control  mb-4" type="file" id="formFile" name="media" />
                                    </>
                                )}
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-outline-secondary" disabled={state.submitted} onClick={submitAction} type='reset'>Reset</button>&nbsp;
                                    <button className="btn btn-outline-secondary" disabled={state.submitted} onClick={submitAction} type='submit'>Submit</button>
                                </div>
                            </form>
                        </> : <ClientError error={state.error} reset={() => redirect("/")} />
                    )}
        </div>
    )
}

export default page