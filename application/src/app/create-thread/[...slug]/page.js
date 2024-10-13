"use client"
import ClientError from '@/components/ClientError';
import { createThread } from '@/utils/actions/threads';
import { checkEligibility_createDiscussion } from '@/utils/common/apiCalls';
import { redirect } from 'next/navigation';
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
    const [error, setError] = useState(null)

    const submitAction = () => setSubmitted(true)

    useEffect(() => {
        checkEligibility_createDiscussion('false', (error) => setError(error))
    }, [])

    return (
        <div className='container container-lg mt-4'>
            {error === null ?
                <>
                    <h4 className='mb-4'>Create a Thread</h4>
                    <form action={createThread}>
                        <input type="hidden" name="discussionId" value={params.slug[0]} />
                        <input type="hidden" name="underId" value={params.slug[1]} />
                        <input type="hidden" name="comment" value={explanation} />
                        <label htmlFor="explanation" className='form-label'>Comment {`(${explanation.length}/1400)`}</label>
                        <div className="mb-3">
                            <EditorProvider>
                                <Editor id='explanation' value={explanation} onChange={(e) => setExplanation(e.target.value)}>
                                    {params.slug[1] === 'main' && (<Toolbar>
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
                        {params.slug[1] === 'main' && (
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
                </> : <ClientError error={error} reset={() => redirect("/")} />
            }
        </div>
    )
}

export default page