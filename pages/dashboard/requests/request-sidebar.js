import { format_amount, format_date, invoiceStatus, requestStatus } from "@/components/helpers/helpers";
import Link from "next/link";
import React from "react";

export default function RequestSidebar({request_data,checkout_link=false,invoice=null,site_settings,invoice_block=false}) {
  const subtotal = invoice?.invoice_items?.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
  const taxPercentage = site_settings?.site_percentage || 0;
  const taxAmount = (subtotal * taxPercentage) / 100;

  // const total = subtotal + taxAmount;
  const total = subtotal;

  console.log(invoice)
  return <>
  
  <div className="barBlk relative">
    {
      invoice?.id > 0 && (request_data===undefined || request_data===null || request_data==='') ?
<div className="bulk mb">
              <div className="inner">
                <h4>Invoice ID:</h4>
                <p>#{invoice?.invoice_no}</p>
              </div>
              {
                invoice?.request_row?.id > 0 ?
              <div className="inner">
                <h4>Subject</h4>
                <p>{invoice?.request_row?.subject}</p>
              </div>
              :
              ""
}
              <div className="inner">
                <h4>Status</h4>
                <p>{invoiceStatus(invoice?.status)}</p>
              </div>
              <div className="inner">
                <h4>Created on</h4>
                <p>{(invoice?.created_date)}</p>
              </div>
            </div>
            :
            <div className="bulk mb">
              <div className="inner">
                <h4>Request ID:</h4>
                <p>#{request_data?.request_no}</p>
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
    }
            
            {
              invoice?.id > 0 && invoice_block===true  ?
            <div className="bulk mb">
              <div className="head">
                <h4>Invoice ID:</h4>
                <p>#{invoice?.invoice_no}</p>
              </div>
              <div className="inner">
                <h4>Date Issued:</h4>
                <p>{invoice?.created_date}</p>
              </div>
              {
                invoice?.invoice_items?.map((invoice_item,index)=>{
                  return(
                    <div className="inner" key={index}>
                    <h4>{invoice_item.description}</h4>
                    <p>{format_amount((invoice_item.qty * invoice_item.price).toFixed(2))}</p>
                  </div>
                  )
                })
              }
              
              <div className="inner">
                <h4>Sub Total</h4>
                <p className="strong">{format_amount(subtotal)}</p>
              </div>
              {/* <div className="inner">
                <h4>Tax ({site_settings?.site_percentage}%)</h4>
                <p className="strong">{format_amount(taxAmount)}</p>
              </div> */}
              <div className="inner">
                <h4>Total</h4>
                <p className="strong">{format_amount(total)}</p>
              </div>
              {
                checkout_link && invoice?.status=='pending' ?
              <Link href={"/dashboard/checkout/"+invoice?.encoded_id} className="site_btn green sm">
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
