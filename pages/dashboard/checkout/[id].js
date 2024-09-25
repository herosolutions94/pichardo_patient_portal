import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { cmsFileUrl, doObjToFormData, formatDateToAmericanTimezone, requestStatus, formatDateTimeToAmericanTimezone, convertToEasternTime, format_amount } from "@/components/helpers/helpers";
import MetaGenerator from "@/components/components/meta-generator";
import RequestSidebar from "../requests/request-sidebar";
import CheckoutForm from "./form";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

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
    .post(`/view-invoice/${encodedId}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response?.data?.message || 'Error occurred');

  return { props: { result } };
};
export default function Checkout({ result }) {
  console.log(result)
  const {site_settings, invoice, member,countries}=result
  let stripePromise = "";
    if (parseInt(site_settings?.site_sandbox) === 1 || member?.mem_email === process.env.NEXT_PUBLIC_TESTING_USER) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TESTING_KEY);
    } else if (parseInt(site_settings?.site_sandbox) === 0
    ) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_LIVE_KEY);
    }
  return (
    <>
      <MetaGenerator page_title={"Request Checkout - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="chat_screen dash check_screen">
        <div className="contain">
          <RequestSidebar invoice={invoice} site_settings={site_settings} />
          <div className="checkout">
            <div className="bulk">
              <h4 className="red_heading">BILLING INFORMATION</h4>
              <Elements stripe={stripePromise}>
              <CheckoutForm invoice={invoice} member={member} countries={countries} />
              </Elements>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
Checkout.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
