import React, { useEffect, useState } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import IsLoadingSec from "./isLoadingSec";
import toast from "react-hot-toast";
import Link from "next/link";
import { emptyUploadRandomFile, uploadRandomFile } from "../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";

export default function FileAttachment({ attachmentFile, setAttachmentFile }) {
    const dispatch = useDispatch()
    const isFilesUploaded = useSelector(state => state.user.isFilesUploaded);
    const isFileUploading = useSelector(state => state.user.isFileUploading);
    const file_name = useSelector(state => state.user.file_name);
    useEffect(() => {
        if (file_name) {
            setAttachmentFile(file_name)
        }
    }, [file_name]);
    useEffect(() => {
        if (isFilesUploaded) {
            dispatch(emptyUploadRandomFile({}))
            if (document.getElementById('file-upload')) {
                document.getElementById('file-upload').value = '';
            }
        }
    }, [isFilesUploaded]);
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        dispatch(uploadRandomFile({ file: file, }))
    };
    return (
        <>
            <div className="input up_banner">
                <label htmlFor="file-upload">
                    <img src="/images/upload.png" alt="Upload Image" />
                    <p>Upload your document</p>
                </label>
                <input
                    type="file"
                    id="file-upload"
                    name="file-upload"
                    className="uploadFile"
                    accept="documents/*"
                    onChange={(e) => handleFileChange(e)}
                />
            </div>
            {
                attachmentFile ?
                    <Link href={cmsFileUrl(attachmentFile, 'attachments')} className="img_blk_uploaded">
                        <img src="/images/file1.svg" alt="File Attachment" className="file_img" />
                        <div className="download_img">
                            <img src="/images/download.svg" alt="File Attachment" />
                        </div>

                    </Link>
                    :
                    ""
            }
            <IsLoadingSec isProcessing={isFileUploading} />
        </>
    );
}