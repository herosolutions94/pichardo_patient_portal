import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function View_prescription() {
  return (
    <>
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>#123456</h3>
              <div className="bTn">
                <img src="/images/printer.svg"></img>
                <img src="/images/download.svg"></img>
              </div>
            </div>
          </div>
        </section>

        <section id="listing" className="prescription">
          <div className="contain">
            <div className="outer">
              <div className="bg_head">
                <h4>Prescription ID: #98765</h4>
              </div>
              <div className="box_inn">
                <h4 className="green_heading">Patient Information</h4>
                <div className="flex">
                  <div className="coll">
                    <div className="inner">
                      <h5>Patient Name</h5>
                      <div className="box">Josif Stefen</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Gender</h5>
                      <div className="box">Male</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Weight</h5>
                      <div className="box">58 kgs</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Date of Birth</h5>
                      <div className="box">December 29, 1988</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Height</h5>
                      <div className="box">140 cm</div>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <h5>Contact #</h5>
                      <div className="box">032-234-24345</div>
                    </div>
                  </div>
                </div>
                <div className="text">
                  <h4>Doctor’s Note July 20, 2024</h4>
                  <p>July 20, 2024</p>
                  <p>To whom it may concern,</p>
                  <p>
                    It is essential to maintain a healthy lifestyle alongside
                    your prescribed medication. Ensure you follow a balanced
                    diet rich in fruits, vegetables, and lean proteins. Regular
                    physical activity, such as a 30-minute walk daily, can
                    significantly improve your overall health.
                  </p>
                  <p>
                    Avoid smoking and limit alcohol consumption. Monitor your
                    blood pressure and cholesterol levels regularly. Remember to
                    take your medication exactly as prescribed and do not skip
                    doses.
                  </p>
                  <p>
                    These medicine formula must follow for your good health:
                  </p>
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
                    <tr>
                      <td>Atorvastatin</td>
                      <td>20mg Once daily</td>
                      <td>
                        Take one tablet every evening before bedtime. Do not
                        exceed the prescribed dosage.
                      </td>
                    </tr>
                    <tr>
                      <td>Amoxicillin</td>
                      <td>500mg Twice daily</td>
                      <td>
                        Take one tablet every evening before bedtime. Do not
                        exceed the prescribed dosage.
                      </td>
                    </tr>
                    <tr>
                      <td>Abbott Laboratories</td>
                      <td>500mg Twice daily</td>
                      <td>
                        Take one tablet every evening before bedtime. Do not
                        exceed the prescribed dosage.
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text">
                  <h4 className="green_heading">[Dr. Stefen Gilbert Disoza]</h4>
                  <p>[Medical Physician]</p>
                  <h5 className="red_heading mt">Additional Notes</h5>
                  <p>
                    Store at room temperature away from moisture and heat. Do
                    not take with grapefruit juice.
                  </p>
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
