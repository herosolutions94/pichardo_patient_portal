import React, { useEffect, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData, formatDateToAmericanTimezone, requestStatus, formatDateTimeToAmericanTimezone, convertToEasternTime,format_amount, currentTimeInAmr, formatDate, format_date } from "@/components/helpers/helpers";
import Text from "@/components/components/text";

import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import { authToken } from "@/components/helpers/authToken";
import toast from "react-hot-toast";
import FilesAttachment from "@/components/components/files-attachment";
import RequestSidebar from "../request-sidebar";

export const getServerSideProps = async (context) => {
  const { req, res, params } = context;
  const cookieHeader = req.headers.cookie || '';
  const cookieValue = parse(cookieHeader);
  const authToken =
    cookieValue['authToken'] !== undefined &&
    cookieValue['authToken'] !== null &&
    cookieValue['authToken'] !== ''
      ? cookieValue['authToken']
      : null;
  
  const encodedId = params.id;  // Extracting encodedId from context

  const result = await http
    .post(`/view-request/${encodedId}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response?.data?.message || 'Error occurred');

  return { props: { result } };
};

export default function Questions_screen({result}) {
  // console.log(result)
  const {site_settings, member, request_data}=result

  const [messages, setMessages] = useState([]);
  
  useEffect(()=>{
    if(request_data?.id > 0){
      setMessages(request_data?.messages);
    }
  },[request_data])
  const [attachmentFiles, setAttachmentFiles] = useState([]);
  const[isImageLoading , setIsImageLoading] = useState(false);

  console.log(result);
  // console.log(site_settings.generate_questions);

  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
} = useForm();
console.log(attachmentFiles)
// ==get member===
const memberRow = useSelector(state => state.user.member);

const handleSubmitMsg = async(frmData) => {
  const request_id = request_data.id;
  const msg = frmData.msg;

  const chatRequest = {
    msg: msg,
    request_id: request_id,
    attachments:JSON.stringify(attachmentFiles)
  };
  // console.log("Chat Request Object:", chatRequest);
  try {
    const response = await http.post("/chat-requests", doObjToFormData({...chatRequest, token:authToken()}))
    if (response.data.status) {
      toast.success(response?.data?.msg);
      const currentTime = currentTimeInAmr();
      console.log(currentTime);
      let newMsg = {
        msg: msg,
        created_at: currentTime,
        attachments: attachmentFiles?.map((fileName, index) => ({
            id: messages.length + index + 1,
            file: fileName,
        })) || []
    };
    
    setMessages(prevMessages => [
        ...prevMessages,
        newMsg
    ]);
    
      resetForm();
    } else {
      toast.error(response?.data?.msg);
    }
  } catch (error) {
    toast.error("Error sending message");
  }
  
};

const resetForm = () => {
  reset({msg:''})
  setAttachmentFiles([]); // Clear file attachments
  document.getElementById('file-upload').value = ''; // Clear file input field
};
// Function to handle keydown event and send message on Enter key press
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevents adding a new line in textarea
    handleSubmit(handleSubmitMsg)(); // Trigger form submit
  }
};
if(request_data?.id == undefined || request_data?.id == null || request_data?.id == "")
  return (<h1>notfound</h1>);
  return (
    <>
    <MetaGenerator page_title={"View Request - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="chat_screen dash">
        <div className="contain">
          <RequestSidebar request_data={request_data} checkout_link={true} />
          <div className="chatBlk relative">
            <div className="text">
              <h4>Please Provide Additional Information</h4>
              <p>
                Your request has been successfully submitted. To help us assist
                you better, please answer the following questions:
              </p>
            </div>
            <div className="chat scrollbar active">
              <div className="buble you">
                <div className="ico">
                <img src={cmsFileUrl(site_settings?.site_icon, 'images')} alt={site_settings?.site_name} />
                </div>
                <div className="txt">
                  <div className="time">{format_date(request_data?.created_at)}</div>
                  <div className="cntnt">
                    <Text string={site_settings?.generate_questions} />
                  </div>
                </div>
              </div>
              {messages?.map((message, index) => (
                <div className="buble you" key={index}>
                  <div className="ico">
                    {message.sender_id == "1" ?
                    <img src={cmsFileUrl(site_settings?.site_icon, 'images')} alt={site_settings?.site_name} />
                    :
                    <img src={cmsFileUrl(memberRow?.mem_image , 'members')} alt={memberRow?.mem_name} />
                    }
                  </div>
                  <div className="txt">
                    <div className="time">{format_date(message?.created_at)}</div>
                    <div className="cntnt">
                      <p>{message?.msg}</p>
                    </div>
                    <div className="files_after_load">
                      {
                        message?.attachments?.length > 0 ?
                        message?.attachments.map((file, index) => (
                            <Link key={index} href={cmsFileUrl(file.file, 'attachments')} className="img_blk_uploaded" target="_blank">
                                <img src="/images/file1.svg" alt="File Attachment" className="file_img"/>
                                <div className="download_img">
                                    <img src="/images/download.svg" alt="Download File"/>
                                </div>
                            </Link>
                        ))
                        : ""
                      }
                      </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={request_data?.status === "closed" ? "write disable_chat" : "write"}>
            <div className="files_after_upload">
            {
                attachmentFiles && attachmentFiles.length > 0 ?
                attachmentFiles?.map((file, index) => (
                    <Link key={index} href={cmsFileUrl(file, 'attachments')} className="img_blk_uploaded" target="_blank">
                        <img src="/images/file1.svg" alt="File Attachment" className="file_img"/>
                        <div className="download_img">
                            <img src="/images/download.svg" alt="Download File"/>
                        </div>
                    </Link>
                ))
                : ""
            } 
            </div>
              <form className="relative" onSubmit={handleSubmit(handleSubmitMsg)}>
                <div className="btm">
                  <FilesAttachment attachmentFiles={attachmentFiles} setAttachmentFiles={setAttachmentFiles} isImageLoading={isImageLoading} setIsImageLoading={setIsImageLoading} />
                  <textarea className="input"
                    {...register("msg", {
                        required: "Message is required",
                        pattern: {
                          value: /^[a-zA-Z0-9\s,'-]*$/,
                          message: 'Invalid address format!',
                        }
                    })} onKeyDown={handleKeyDown}></textarea>
                  <button className="site_btn icoBtn" type="submit">
                    <img src="/images/sent.svg"/>
                  </button>
                </div>
                <ErrorMessage
                    errors={errors}
                    name="msg"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
Questions_screen.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
