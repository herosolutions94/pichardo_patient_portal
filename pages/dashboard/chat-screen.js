import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Chat_screen() {
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
              <h4>Dr. John Smith</h4>
            </div>
            <div className="chat scrollbar active">
              <div className="buble you">
                <div className="ico">
                  <img src="/images/cc2.png"></img>
                </div>
                <div className="txt">
                  <div className="time">Apr 29, 2024, 11:40 pm</div>
                  <div className="cntnt">
                    <p>Hi, how are you?</p>
                  </div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/cc3.png"></img>
                </div>
                <div className="txt">
                  <div className="time">Apr 29, 2024, 11:40 pm</div>
                  <div className="cntnt">
                    <p>
                      Hi Dr. Smith, I have a question about my recent
                      prescription.
                    </p>
                  </div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/cc2.png"></img>
                </div>
                <div className="txt">
                  <div className="time">Apr 29, 2024, 11:40 pm</div>
                  <div className="cntnt">
                    <p>Hello! Sure, what would you like to know?</p>
                  </div>
                </div>
              </div>
              <div className="buble you">
                <div className="ico">
                  <img src="/images/cc3.png"></img>
                </div>
                <div className="txt">
                  <div className="time">Apr 29, 2024, 11:40 pm</div>
                  <div className="cntnt">
                    <p>
                      I've been feeling a bit dizzy after taking the medication.
                      Is this normal?
                    </p>
                  </div>
                </div>
              </div>
              <div className="document">
                <div className="ico">
                  <img src="/images/file1.svg"></img>
                </div>
                <div className="tex">
                  <h5>Previous Prescription</h5>
                  <p>pdf</p>
                </div>
                <div className="downlaod">
                  <img src="/images/download1.svg"></img>
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
Chat_screen.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
