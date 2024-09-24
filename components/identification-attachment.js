import React, { useState } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import IsLoadingSec from "./isLoadingSec";
import toast from "react-hot-toast";

export default function IdentificationAttachment({identificationPhoto,setIdentificationPhoto,isImageLoading,setIsImageLoading}) {
    const handleFileChange = async (e, type) => {
        const image = e.target.files[0];
        const frmData = new FormData();
        frmData.append('type', type);
        frmData.append('image', image);
        frmData.append('token', authToken());
        setIsImageLoading(true);
        const result = await http
          .post('/upload-image/', frmData)
          .then((response) => response.data)
          .catch((error) => error);
    
        setIsImageLoading(false);
        if (document.getElementById('identification_photo')) {
          document.getElementById('identification_photo').value = '';
        }
        if (result?.status) {
          console.log(result, type);
          setIdentificationPhoto(result?.image_name);
        } else {
          toast.error(result?.msg);
        }
      };
    return (
        <>
             <div className="flex upl">
                <div className="image upload_relative">
                    <img src={cmsFileUrl(identificationPhoto ,'identification')} />
                    <IsLoadingSec isProcessing={isImageLoading}/>
                </div>
                <div className="text">
                    <label htmlFor="identification_photo">
                        <img src="/images/upload.png" alt="Upload Image" />
                        <p>Upload now</p>
                    </label>
                </div>
            </div>
            <input
                type="file"
                id="identification_photo"
                name="identification_photo"
                className="uploadFile"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'identification')}
            />

           
        </>
    );
}