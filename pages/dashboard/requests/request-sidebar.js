import { format_amount, format_date, requestStatus } from "@/components/helpers/helpers";
import Link from "next/link";
import React from "react";

export default function RequestSidebar({request_data,checkout_link=false}) {
  return <>
  <div className="barBlk relative">
            <div className="bulk mb">
              <div className="inner">
                <h4>Request ID:</h4>
                <p>#{request_data?.id}</p>
              </div>
              <div className="inner">
                <h4>Subject</h4>
                <p>{request_data?.subject}</p>
              </div>
              <div className="inner">
                <h4>Status</h4>
                <p>{requestStatus(request_data?.status)}</p>
              </div>
              <div className="inner">
                <h4>Created on</h4>
                <p>{(request_data?.created_date)}</p>
              </div>
            </div>
            {
              request_data?.invoice?.id > 0  ?
            <div className="bulk mb">
              <div className="head">
                <h4>Invoice ID:</h4>
                <p>{request_data?.invoice?.invoice_no}</p>
              </div>
              <div className="inner">
                <h4>Date Issued:</h4>
                <p>{request_data?.invoice?.created_date}</p>
              </div>
              {/* <div className="inner">
                <h4>Consultation Fee</h4>
                <p>$50.00</p>
              </div> */}
              <div className="inner">
                <h4>Prescription Fee</h4>
                <p>{format_amount(request_data?.invoice?.amount)}</p>
              </div>
              <div className="inner">
                <h4>Total</h4>
                <p className="strong">{format_amount(request_data?.invoice?.amount)}</p>
              </div>
              {
                checkout_link && request_data?.invoice?.status=='pending' ?
              <Link href={"/dashboard/checkout/"+request_data?.encoded_id} className="site_btn green sm">
                Pay Now
              </Link>
              :
              request_data?.invoice?.status==='paid' ?
              <div className="alert alert-success">Invoice Paid</div>
              :
              ""
}
            </div>
            :
            ""
}
          </div>
  </>;
}
