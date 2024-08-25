"use client"
import { getOneDiscussionWithId, submitDiscussion } from '@/utils/actions/discussion';
import React, { useEffect, useState } from 'react'
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
    const [explanation, setExplanation] = useState("")
    const [discussion, setDiscussion] = useState(null)

    useEffect(() => {

        if (id !== 'new') {
            (async function () {
                const api = await fetch(`/api/discussion?id=${id}`)
                const response = await api.json()
                if (response?.confirmation) {
                    setDiscussion(response?.discussion)
                    setExplanation(response?.discussion?.explanation)
                }
            })()
        }

    }, [id])

    return (
        <div className='container container-lg mt-4'>
            <form action={submitDiscussion}>

                <input type="hidden" name="id" value={id} />
                <input type="hidden" required name="explanation" value={explanation} />

                <label htmlFor='heading' className='form-label'>Title</label>
                <input id='heading' required className='form-control mb-3' type="text" name="heading" defaultValue={discussion !== null ? discussion?.heading : ""} />

                <label htmlFor='tag' className='form-label'>Tags</label>
                <input id='tag' required className='form-control mb-3' type="text" name="tags" defaultValue={discussion !== null ? discussion?.tags : ""} />

                {/* <label htmlFor="formFile" className="form-label">Media (Images/Docs)</label>
                <input multiple={true} accept='.xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf' className="form-control  mb-4" type="file" id="formFile" name="identity" /> */}

                <label htmlFor='explanation' className='form-label'>Description</label>
                <EditorProvider>
                    <Editor id='explanation' value={explanation} onChange={(e) => setExplanation(e.target.value)}>
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
                    <button type="reset" className="btn btn-outline-secondary">Reset</button>&nbsp;
                    <button type="submit" className="btn btn-outline-secondary">Submit</button>
                </div>
            </form>
        </div >
    )
}

export default page