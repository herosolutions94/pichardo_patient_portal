import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { fetchMemberData } from "@/components/redux/reducers/user";

import { useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import FileAttachment from "@/components/components/file-attachment";

export default function Create_new_request() {
  const[attachmentFile , setAttachmentFile] = useState(false);
  const[isImageLoading , setIsImageLoading] = useState(false);

  const router = useRouter();
  const { mem_address1, preferred_pharmacy } = router.query;

  const site_settings = useSelector(state => state.user.site_settings);
  const isFormProcessing = useSelector(state => state.user.isFormProcessing);
  const memberRow = useSelector(state => state.user.member);

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
} = useForm();

  return (
    <>
    <MetaGenerator page_title={"Create New Request - " + site_settings?.site_name} site_settings={site_settings} />
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
              <form>
                <div className="form_blk col-xs-6">
                  <label>Subject</label>
                  <select
                    className="input"
                    {...register("subject", {
                      required: "Subject is required",
                  })}
                  >
                    <option value="">Choose Subject</option>
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
                        minLength: {
                            value: 5,
                            message: "Symptoms information must be at least 5 characters long",
                        },
                        maxLength: {
                            value: 200,
                            message: "Symptoms information must be less than 200 characters long",
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9\s,'-]*$/,
                            message: "Invalid format for symptoms information",
                        }
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
                        pattern: {
                            value: /^[a-zA-Z][a-zA-Z ]*$/,
                            message: 'Invalid Value!',
                        },
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
                  <button type="submit" href="" className="site_btn green">
                    Submit
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
