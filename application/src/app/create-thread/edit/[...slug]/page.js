"use client"
import Loading from '@/components/Loading/Loading';
import { editThread } from '@/utils/actions/threads';
import React, { useState, useEffect } from 'react'
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
    const [explanation, setExplanation] = useState("")
    const [submitted, setSubmitted] = useState(false)
    const [loadingFlag, setLoadingFlag] = useState(true)

    const submitAction = () => setSubmitted(true)
    const loadingOFF = () => setLoadingFlag(false)

    useEffect(() => {
        (async function () {
            const api = await fetch(`/api/thread/${params.slug[2]}`)
            const response = await api.json()
            if (response?.confirmation) {
                setExplanation(response?.discussionThread?.comment)
            } else {
                throw new Error(response?.message)
            }
        })()
        loadingOFF()
    }, [params.slug[2]])

    return (
        <div className='container container-lg mt-4'>
            {

                loadingFlag ? (
                    <div style={{ height: '80vh' }} className='d-flex align-items-center justify-content-center'>
                        <Loading />
                    </div>
                )
                    :
                    (
                        <>
                            <h4 className='mb-4'>Edit your Thread</h4>
                            <form action={editThread}>
                                <input type="hidden" name="id" value={params.slug[2]} />
                                <input type="hidden" name="discussionId" value={params.slug[1]} />
                                <input type="hidden" name="comment" value={explanation} />
                                <label htmlFor="explanation" className='form-label'>Comment</label>
                                <div className="mb-3">
                                    <EditorProvider>
                                        <Editor id='explanation' value={explanation} onChange={(e) => setExplanation(e.target.value)}>
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

                                    <button className="btn btn-outline-secondary" disabled={submitted} onClick={submitAction} type='reset'>Reset</button>&nbsp;
                                    <button className="btn btn-outline-secondary" disabled={submitted} onClick={submitAction} type='submit'>Submit</button>
                                </div>
                            </form>
                        </>
                    )}
        </div>
    )
}

export default page