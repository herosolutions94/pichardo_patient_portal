import React, { useState } from "react";
import http from "../helpers/http";
import toast from "react-hot-toast";
import IsLoadingIcon from "./isLoadingIcon";

export default function FilesAttachment({attachmentFiles, setAttachmentFiles, isImageLoading, setIsImageLoading}) {
    const handleFileChange = async (e) => {
        const newFiles = Array.from(e.target.files); // Get newly selected files
        if (!newFiles.length) return;

        // Append newly selected files to the existing ones
        const updatedFiles = [...attachmentFiles, ...newFiles];
        
        const frmData = new FormData();
        updatedFiles.forEach((file) => {
            frmData.append('files[]', file); // Add each file to FormData
        });

        setIsImageLoading(true);

        const result = await http
            .post('/upload-files/', frmData)
            .then((response) => response.data)
            .catch((error) => error);

        setIsImageLoading(false);

        if (document.getElementById('file-upload')) {
            document.getElementById('file-upload').value = '';
        }

        if (result?.status) {
            setAttachmentFiles((prevFiles) => [
                ...prevFiles,
                ...result.file_names
            ]);
            // console.log(result.files);
        } else {
            toast.error(result?.msg);
        }
    };

    return (
        <div className="relative_all">
            <label htmlFor="file-upload" className="site_btn arrowBtn blank">
                <img src="/images/file.svg"/>
                <IsLoadingIcon isProcessing={isImageLoading} />
            </label>
                
            <input
                type="file"
                id="file-upload"
                name="file-upload"
                className="uploadFile"
                accept="documents/*"
                multiple // Allow multiple file selection
                onChange={(e) => handleFileChange(e)}
            />

            

            
        </div>
    );
}
