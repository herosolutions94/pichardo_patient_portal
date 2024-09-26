import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import FileAttachment from "@/components/components/file-attachment";
import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";
import { authToken } from "@/components/helpers/authToken";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function NewRequest({ popupData }) {
  const[attachmentFile , setAttachmentFile] = useState(null);
  const[isImageLoading , setIsImageLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
} = useForm();

// console.log(popupData.preferred_pharmacy);
const [isLoading, setIsLoading] = useState(false);
const onSubmit = async (formData) => {
    if(attachmentFile) {
        formData={...formData,file:attachmentFile}
        const newFrmData={...formData,...popupData}
        try {
        const result = await http.post("/create-request", doObjToFormData({...newFrmData,token:authToken()}));
        setIsLoading(true);
        if (result.data.status === 1) {
            reset();
            setAttachmentFile(null);
            toast.success(result.data.msg);
            const encodedId = result.data.encodedId;
            router.push(`/dashboard/requests/view/${encodedId}`);
            // router.reload();
        } else {
            toast.error(result.data.msg);
            setIsLoading(false);
        }
        } catch (error) {
        console.error('Error submitting request:', error);
        setIsLoading(false);
        }
    }else{
        toast.error('Document is required');
    }
  };
  
  return (
    <>
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>Create Request</h3>
            </div>
          </div>
        </section>

        <section id="create_request">
          <div className="contain">
            <div className="bulk outer">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form_blk col-xs-6">
                  <label>Subject</label>
                  <select
                    className="input"
                    {...register("subject", {
                      required: "Subject is required",
                  })}
                  >
                    <option value="">Choose Subject</option>
                    <option value="subject1">Subject 1</option>
                    <option value="subject2">Subject 2</option>
                    <option value="subject3">Subject 3</option>
                  </select>
                  <ErrorMessage
                      errors={errors}
                      name="subject"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                  />
                </div>
                <div className="form_blk">
                  <label>Symptoms</label>
                  <textarea
                    placeholder=""
                    className="input"
                    {...register("symptoms", {
                        required: "Symptoms information is required",
                    })}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="symptoms"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
                </div>
                <div className="form_blk">
                  <label>Requested Medication</label>
                  <input
                    placeholder=""
                    className="input"
                    {...register("requested_medication", {
                        required: 'Required'
                    })}
                  />
                  <ErrorMessage
                      errors={errors}
                      name="requested_medication"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                  />
                </div>
                <div className="form_blk">
                  <FileAttachment attachmentFile={attachmentFile} setAttachmentFile={setAttachmentFile} isImageLoading={isImageLoading} setIsImageLoading={setIsImageLoading} />
                </div>
                <div className="btn_blk">
                  <button type="submit" href="" className="site_btn green" disabled={isLoading}>
                    Submit <IsFormProcessingSpinner isProcessing={isLoading}/>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
