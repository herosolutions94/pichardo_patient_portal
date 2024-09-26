import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { doObjToFormData, format_amount } from "@/components/helpers/helpers";
import { useSelector } from "react-redux";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { useRouter } from "next/router";

export const getServerSideProps = async (context) => {
  const { req, res } = context;
  const cookieHeader = req.headers.cookie || '';
  const cookieValue = parse(cookieHeader);
  const authToken =
    cookieValue['authToken'] !== undefined &&
    cookieValue['authToken'] !== null &&
    cookieValue['authToken'] !== ''
      ? cookieValue['authToken']
      : null;
  const result = await http
    .post("dashboard-data", doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Dashboard({result}) {
  const {activity, invoices,member, prescriptions, requests}=result
  // console.log(member?.mem_fullname);
  const site_settings = useSelector(state => state.user.site_settings);
  return (
    <>
    <MetaGenerator page_title={"Dashboard- " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="heading">
              <h3>Welcome, {member?.mem_fullname}</h3>
              <p>We're here to assist you with your healthcare needs.</p>
            </div>
            <div className="flex boxes">
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <h5>{requests}</h5>
                  </div>
                  <h4>Requests</h4>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <h5>{prescriptions}</h5>
                  </div>
                  <h4>Prescriptions</h4>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <h5>{invoices}</h5>
                  </div>
                  <h4>Invoices</h4>
                </div>
              </div>
            </div>
            {activity?.content?.length > 0 ? 
            <>
              <div className="heading mt">
                <h3>Recent Activity</h3>
              </div>
              <div className="flex boxes new_boxes">
              {activity?.content?.map((activityItem, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="inner">
                      <div className="text">
                        <p>{activityItem?.time}</p>
                        <h4>{activityItem?.text}</h4>
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </>
            :
            ""
            }
          </div>
        </section>
      </main>
    </>
  );
}
Dashboard.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
