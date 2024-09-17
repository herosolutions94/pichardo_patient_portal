import React from "react";
import { cmsFileUrl } from "../helpers/helpers";

export default function ThumbnailAttachment({
    imageThumbnail,
    handleUploadThumbnail,
    path,
    page = "",
    isProfileImageLoading
}) {
    let thumbnail = null;
    function uploadThumbnail() {
        thumbnail.click();
    }
    return (
        <>
             <div className="flex upl ddp">
                <div className="image">
                    {
                        isProfileImageLoading ?
                            <img src="/images/loading.gif" />
                            :
                            <img src={cmsFileUrl(
                                imageThumbnail != null ? imageThumbnail : ""
                                , path)} alt="" />
                    }
                </div>
                
                <div className="text" onClick={uploadThumbnail}>
                    <label>
                    <img src="/images/upload.png" alt="Upload Image" />
                    <p>Upload now</p>
                    </label>
                </div>
            </div>
            <input
                type="file"
                name=""
                id="input_id"
                className="uploadFile"
                data-upload="gallery_image"
                onChange={handleUploadThumbnail}
                accept="image/*"
                ref={(file) => (thumbnail = file)}
            />

           
        </>
    );
}