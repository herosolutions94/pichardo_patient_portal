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
    .post(`/view-prescription/${encodedId}`, doObjToFormData({ token: authToken }))
    .then((response) => response.data)
    .catch((error) => error.response?.data?.message || 'Error occurred');

  return { props: { result } };
};


export default function View_prescription({result}) {
  const {site_settings, prescription}=result
  const medication = prescription?.medications;
  const request = prescription?.requests;
  const memberRow = prescription?.member_row;
  if(prescription?.id == undefined || prescription?.id == null || prescription?.id == "")
    return (<h1>notfound</h1>);
  return (
    <>
    <MetaGenerator page_title={"View Prescription - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>#{prescription?.prescription_id}</h3>
              <div className="bTn">
                <img src="/images/printer.svg"></img>
                <ExportTransactionPdf prescrption_id={prescription?.id}/>
              </div>
            </div>
          </div>
        </section>

        <section id="listing" className="prescription">
          <div className="contain">
            <div className="outer">
              <div className="bg_head">
                <h4>Prescription ID: #{prescription?.prescription_id}</h4>
              </div>
              <div className="box_inn">
                <h4 className="green_heading">Patient Information</h4>
                <div className="flex">
                  <div className="coll">
                    <div className="inner">
                      <h5>Patient Name</h5>
                      <div className="box">{memberRow?.mem_fullname}</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Gender</h5>
                      <div className="box">{memberRow?.gender}</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Allergies</h5>
                      <div className="box"><Text string={memberRow?.allergies}/></div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Surgical History</h5>
                      <div className="box"><Text string={memberRow?.surgical_history}/></div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Preffered Pharmacy</h5>
                      <div className="box">{request?.preferred_pharmacy}</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Contact #</h5>
                      <div className="box">{memberRow?.mem_phone}</div>
                    </div>
                  </div>
                </div>
                <div className="text">
                  <h4>Doctor’s Note</h4>
                  <p>{formatDateToNewYorkTimezone(prescription?.created_at)}</p>
                  <Text string={prescription?.doctor_note}/>
                </div>
                <h4 className="green_heading">Medication Information</h4>
                <table className="info_tbl">
                  <thead>
                    <tr>
                      <th>Medication</th>
                      <th>Dosage</th>
                      <th>Instructions</th>
                    </tr>
                  </thead>
                  <tbody>
                  {medication?.map((medicine, index) => {
                    return (
                      <tr key={index}>
                        <td>{medicine?.medication}</td>
                        <td>{medicine?.dosage}</td>
                        <td>
                          <Text string={medicine?.instructions} />
                        </td>
                      </tr>
                    );
                  })}
                    
                  </tbody>
                </table>
                <div className="text">
                  <h4 className="green_heading">{prescription?.doctor_name}</h4>
                  <h5 className="red_heading mt">Additional Notes</h5>
                  <Text string={prescription?.additional_note} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
View_prescription.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};