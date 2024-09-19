import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData, formatDateToAmericanTimezone, requestStatus, formatDateTimeToAmericanTimezone, convertToEasternTime } from "@/components/helpers/helpers";
import Text from "@/components/components/text";

import { useForm} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from "axios";
import { authToken } from "@/components/helpers/authToken";
import toast from "react-hot-toast";

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
  const {site_settings, member, request_chat, request_data}=result

  const [messages, setMessages] = useState(request_chat || []);

  // console.log(result);
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

// ==get member===
const memberRow = useSelector(state => state.user.member);

const handleSubmitMsg = async(frmData) => {
  const request_id = request_data.id;
  const msg = frmData.msg;

  const chatRequest = {
    msg: msg,
    request_id: request_id,
  };
  // console.log("Chat Request Object:", chatRequest);
  try {
    const response = await http.post("/chat-requests", doObjToFormData({...chatRequest,token:authToken()}))
    if (response.data.success) {
      toast.success("Message sent successfully");
      // Get current time
      const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      // Append new message with current time
      setMessages([...messages, { msg, time: currentTime }]);
      reset({ msg: '' });
    } else {
      toast.error("Message sending failed");
    }
  } catch (error) {
    toast.error("Error sending message");
  }
  
};
// Function to handle keydown event and send message on Enter key press
const handleKeyDown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); // Prevents adding a new line in textarea
    handleSubmit(handleSubmitMsg)(); // Trigger form submit
  }
};
  return (
    <>
    <MetaGenerator page_title={"View Request - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="chat_screen dash">
        <div className="contain">
          <div className="barBlk relative">
            <div className="bulk mb">
              <div className="inner">
                <h4>Request ID:</h4>
                <p>#{request_data.id}</p>
              </div>
              <div className="inner">
                <h4>Subject</h4>
                <p>{request_data.subject}</p>
              </div>
              <div className="inner">
                <h4>Status</h4>
                <p>{requestStatus(request_data.status)}</p>
              </div>
              <div className="inner">
                <h4>Created on</h4>
                <p>{formatDateToAmericanTimezone(request_data.created_at)}</p>
              </div>
            </div>
            {/* <div className="bulk mb">
              <div className="head">
                <h4>Invoice ID:</h4>
                <p>#12345</p>
              </div>
              <div className="inner">
                <h4>Date Issued:</h4>
                <p>2024-08-07</p>
              </div>
              <div className="inner">
                <h4>Consultation Fee</h4>
                <p>$50.00</p>
              </div>
              <div className="inner">
                <h4>Prescription Fee</h4>
                <p>$20.00</p>
              </div>
              <div className="inner">
                <h4>Total</h4>
                <p className="strong">$70.00</p>
              </div>
              <Link href="" className="site_btn green sm">
                Pay Now
              </Link>
            </div> */}
          </div>
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
                  <img src="/images/cc1.png"></img>
                </div>
                <div className="txt">
                  <div className="time">{convertToEasternTime(request_data.created_at)}</div>
                  <div className="cntnt">
                    <Text string={site_settings?.generate_questions} />
                  </div>
                </div>
              </div>
              {messages.map((message, index) => (
                <div className="buble you" key={index}>
                  <div className="ico">
                    <img src={cmsFileUrl(memberRow?.mem_image , 'members')} alt={memberRow?.mem_name} />
                  </div>
                  <div className="txt">
                    <div className="time">{message.time}</div>
                    <div className="cntnt">
                    <p>{message.msg}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="write">
              <form className="relative" onSubmit={handleSubmit(handleSubmitMsg)}>
                <div className="btm">
                  <button className="site_btn arrowBtn blank" type="button">
                    <img src="/images/file.svg"></img>
                  </button>
                  <textarea className="input"
                    {...register("msg", {
                        required: "Message is required",
                        pattern: {
                          value: /^[a-zA-Z0-9\s,'-]*$/,
                          message: 'Invalid address format!',
                        }
                    })} onKeyDown={handleKeyDown}></textarea>
                  <button className="site_btn icoBtn" type="submit">
                    <img src="/images/sent.svg"></img>
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
