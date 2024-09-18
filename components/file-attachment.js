import React, { useState } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import IsLoadingSec from "./isLoadingSec";
import toast from "react-hot-toast";
import Link from "next/link";

export default function FileAttachment({attachmentFile , setAttachmentFile, isImageLoading,setIsImageLoading}) {
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const frmData = new FormData();
        frmData.append('file', file);
        setIsImageLoading(true);
        const result = await http
        .post('/upload-file/', frmData)
        .then((response) => response.data)
        .catch((error) => error);

        setIsImageLoading(false);
        if (document.getElementById('file-upload')) {
        document.getElementById('file-upload').value = '';
        }
        if (result?.status) {
        // console.log(result);
        setAttachmentFile(result?.file_name);
        } else {
        toast.error(result?.msg);
        }
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
            <Link href="{cmsFileUrl(attachmentFile ,'attachments')}" className="img_blk_uploaded">
                <img src="/images/file1.svg" alt="File Attachment" className="file_img"/>
                <div className="download_img">
                <img src="/images/download.svg" alt="File Attachment"/>
                </div>
                
            </Link>
            :
            ""
        }
        <IsLoadingSec isProcessing={isImageLoading}/>
        </>
    );
}