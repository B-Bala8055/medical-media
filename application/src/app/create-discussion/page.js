"use client"
import React from 'react'
import {
    BtnBold,
    BtnItalic,
    Editor,
    EditorProvider,
    Toolbar,
    BtnLink,
    BtnUnderline,
    BtnClearFormatting,
    BtnBulletList
} from 'react-simple-wysiwyg';

const CreateDiscussion = () => {

    return (
        <div className='container container-lg mt-4'>

            <label htmlFor='heading' className='form-label'>Title</label>
            <input id='heading' className='form-control mb-3' type="text" name="heading" />

            <label htmlFor='tag' className='form-label'>Tags</label>
            <input id='tag' className='form-control mb-3' type="text" name="tag" />

            <label htmlFor="formFile" className="form-label">Media (Images/Docs)</label>
            <input multiple={true} accept='.xlsx,.xls,image/*,.doc,.docx,.ppt,.pptx,.txt,.pdf' className="form-control  mb-4" type="file" id="formFile" name="identity" />

            <label htmlFor='explanation' className='form-label'>Description</label>
            <EditorProvider>
                <Editor id='explanation' name='explanation'>
                    <Toolbar>
                        <BtnBold />
                        <BtnItalic />
                        <BtnLink />
                        <BtnUnderline />
                        <BtnBulletList />
                        <BtnClearFormatting />
                    </Toolbar>
                </Editor>
            </EditorProvider>

            <div className="mt-4 d-flex justify-content-end">
                <button className="btn btn-outline-secondary">Discard</button>&nbsp;
                <button className="btn btn-outline-secondary">Submit</button>
            </div>
        </div>
    )
}

export default CreateDiscussion