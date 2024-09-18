import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { doObjToFormData, requestStatus } from "@/components/helpers/helpers";

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
  const {request_data}=result
  // console.log(result);
  const site_settings = useSelector(state => state.user.site_settings);
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
                <p>{request_data.created_at}</p>
              </div>
            </div>
            <div className="bulk mb">
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
            </div>
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
                  <div className="time">Apr 29, 2024, 11:40 pm</div>
                  <div className="cntnt">
                    <p>What is your age?</p>
                    <p> What is your height?</p> <p>What is your weight?</p>{" "}
                    <p>Please describe your current symptoms.</p>{" "}
                    <p>Do you have any relevant medical history?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="write">
              <form className="relative">
                <div className="btm">
                  <button className="site_btn arrowBtn blank">
                    <img src="/images/file.svg"></img>
                  </button>
                  <textarea className="input"></textarea>
                  <button className="site_btn icoBtn">
                    <img src="/images/sent.svg"></img>
                  </button>
                </div>
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
