import React, { useEffect, useState } from "react";
import http from "../helpers/http";
import toast from "react-hot-toast";
import IsLoadingIcon from "./isLoadingIcon";
import { useDispatch, useSelector } from "react-redux";
import { emptyUploadMultipleFiles, uploadMultipleFiles } from "../redux/reducers/user";

export default function FilesAttachment({ attachmentFiles, setAttachmentFiles, isImageLoading, setIsImageLoading }) {
    const dispatch = useDispatch()
    const isFileUploading = useSelector(state => state.user.isFileUploading);
    const isFilesUploaded = useSelector(state => state.user.isFilesUploaded);
    const file_names = useSelector(state => state.user.file_names);
    console.log(file_names)
    const handleFileChange = async (e) => {
        const newFiles = Array.from(e.target.files); // Get newly selected files
        if (!newFiles.length) return;

        // Append newly selected files to the existing ones
        const updatedFiles = [...attachmentFiles, ...newFiles];
        dispatch(uploadMultipleFiles({ files: updatedFiles }))

    };
    useEffect(() => {
        if (file_names?.length > 0) {
            setAttachmentFiles((prevFiles) => [
                ...prevFiles,
                ...file_names
            ]);
        }

    }, [file_names]);
    useEffect(() => {
        if (isFilesUploaded) {
            dispatch(emptyUploadMultipleFiles({}))
            if (document.getElementById('file-upload')) {
                document.getElementById('file-upload').value = '';
            }
        }
    }, [isFilesUploaded]);

    return (
        <div className="relative_all">
            <label htmlFor="file-upload" className="site_btn arrowBtn blank">
                <img src="/images/file.svg" />
                <IsLoadingIcon isProcessing={isFileUploading} />
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
