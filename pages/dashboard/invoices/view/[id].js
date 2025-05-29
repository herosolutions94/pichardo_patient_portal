import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData, formatDateToAmericanTimezone, requestStatus, formatDateTimeToAmericanTimezone, convertToEasternTime,format_amount, currentTimeInAmr, formatDate, format_date, formatDateToNewYorkTimezone } from "@/components/helpers/helpers";
import Text from "@/components/components/text";

import { authToken } from "@/components/helpers/authToken";
import ExportTransactionPdf from "@/components/components/prescription-download";
import ExportInvoicePdf from "@/components/components/invoice-download";

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
  
  const encodedId = params.id;

  const result = await http
    .post(`/view-invoice/${encodedId}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response?.data?.message || 'Error occurred');

  return { props: { result } };
};


export default function View_invoice({result}) {
  const {site_settings, invoice, member, isDueDatePassed}=result
  // console.log(isDueDatePassed);
  const subtotal = invoice?.invoice_items?.reduce((acc, item) => {
    return acc + item.qty * item.price;
  }, 0);
  const taxPercentage = site_settings?.site_percentage || 0;
  const taxAmount = (subtotal * taxPercentage) / 100;
  // const total = subtotal + taxAmount;
  const total = subtotal;

// console.log(invoice)
  if(member?.id == undefined || member?.id == null || member?.id == "")
    return (<h1>notfound</h1>);
  return (
    <>
    <MetaGenerator page_title={"View Invoice - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>#{invoice?.invoice_id}</h3>
              <div className="bTn">
                <ExportInvoicePdf invoice_id={invoice?.id}/>
              </div>
            </div>
          </div>
        </section>
        <section id="listing" className="invoice_show_blk">
          <div className="contain">
            <div className="outer">
                <h3>MEDICAL BILLING INVOICE</h3>
                <div className="head_top">
                    <p>Invoice Number: #{invoice?.invoice_id}</p>
                    <p>Issue Date: {formatDateToNewYorkTimezone(invoice?.created_at)}</p>
                    <p>Due Date: {formatDateToNewYorkTimezone(invoice?.due_date)}</p>
                    
                </div>
                <div className="flex part_two">
                    <div className="col">
                        <h3>Billing to</h3>
                        <p>{member?.mem_fullname}</p>
                        <p>{invoice?.request_row?.address}</p>
                        <p>{member?.mem_email}</p>
                    </div>
                    <div className="col">
                        <h3>Billing from</h3>
                        <Text string={site_settings?.site_billing_from}/>
                    </div>
                    
                </div>

                <div className="lst head">
                    <ul>
                        <li>Item Description</li>
                        <li>Quantity</li>
                        <li>Price</li>
                        <li>Total</li>
                    </ul>
                </div>
                {invoice?.invoice_items?.map((item, index) => (
                <div className="lst long_lst">
                    <ul>
                        <li>{item.description}</li>
                        <li>{item.qty}</li>
                        <li>${item.price.toFixed(2)}</li>
                        <li>${(item.qty * item.price).toFixed(2)}</li>
                    </ul>
                </div>
                ))}
                <div className="lst long_lst dark_lines final_lines">
                    <ul>
                        <li><strong>Subtotal</strong></li>
                        <li></li>
                        <li></li>
                        <li>${subtotal.toFixed(2)}</li>
                    </ul>
                </div>
                {/* <div className="lst long_lst final_lines">
                    <ul>
                        <li><strong>Tax</strong> ({site_settings?.site_percentage}%)</li>
                        <li></li>
                        <li></li>
                        <li>${taxAmount.toFixed(2)}</li>
                    </ul>
                </div> */}

                <div className="lst long_lst final_row">
                    <ul>
                        <li><strong>Total</strong></li>
                        <li></li>
                        <li></li>
                        <li>${total.toFixed(2)}</li>
                    </ul>
                </div>
                <div className="note">
                    <h3>Notes</h3>
                    {invoice?.additional_note ? 

                    <Text string={invoice?.additional_note}/> 
                    : 
                    "NA" 
                    }
                </div>

                {/* {
                    invoice?.status == "pending" ?
                    <div className="btn_blk text-center">
                        <Link href={"/dashboard/checkout/"+invoice?.encoded_id} className="site_btn">Pay Now</Link>
                    </div>
                    :
                    ""
                } */}

                  {
                      invoice?.status === "pending" ? (
                          !isDueDatePassed ? (
                              <div className="btn_blk text-center">
                                  <Link href={`/dashboard/checkout/${invoice?.encoded_id}`} className="site_btn">Pay Now</Link>
                              </div>
                          ) : (
                              <div className="text-center warning_alert_all">
                                  <p>The due date for this invoice has passed. Please <Link href="/contact">contact support</Link> for further assistance.</p>
                              </div>
                          )
                      ) : null
                  }
                                  
                
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
View_invoice.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};