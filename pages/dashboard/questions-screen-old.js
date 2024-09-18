import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Questions_screen() {
  return (
    <>
      <main className="chat_screen dash">
        <div className="contain">
          <div className="barBlk relative">
            <div className="bulk mb">
              <div className="inner">
                <h4>Request ID:</h4>
                <p>#12345</p>
              </div>
              <div className="inner">
                <h4>Subject</h4>
                <p>Prescription Refill</p>
              </div>
              <div className="inner">
                <h4>Status</h4>
                <p className="badge green">Open</p>
              </div>
              <div className="inner">
                <h4>Created on</h4>
                <p>2024-08-07</p>
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
