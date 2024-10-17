import React, { useEffect, useState } from "react";
import { cmsFileUrl } from "../helpers/helpers";
import http from "../helpers/http";
import { authToken } from "../helpers/authToken";
import IsLoadingSec from "./isLoadingSec";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { emptyUploadRandomPhoto, uploadRandomImage } from "../redux/reducers/user";

export default function IdentificationAttachment({ identificationPhoto, setIdentificationPhoto }) {
  const dispatch = useDispatch()
  const is_image_uploaded = useSelector(state => state.user.is_image_uploaded);
  const isImageUploading = useSelector(state => state.user.isImageUploading);
  const image_name = useSelector(state => state.user.image_name);
  useEffect(() => {
    if (image_name) {
      setIdentificationPhoto(image_name)
    }
  }, [image_name]);
  useEffect(() => {
    if (is_image_uploaded) {
      dispatch(emptyUploadRandomPhoto({}))
      if (document.getElementById('identification_photo')) {
        document.getElementById('identification_photo').value = '';
      }
    }
  }, [is_image_uploaded]);


  const handleFileChange = async (e, type) => {
    const image = e.target.files[0];
    dispatch(uploadRandomImage({ image: image, type: type }))
  };
  return (
    <>
      <div className="flex upl">
        <div className="image upload_relative">
          <img src={cmsFileUrl(identificationPhoto, 'identification')} />
          <IsLoadingSec isProcessing={isImageUploading} />
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