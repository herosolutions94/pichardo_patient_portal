import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const site_settings = useSelector(state => state.user.site_settings);
  return (
    <>
    <MetaGenerator page_title={"Dashboard- " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="heading">
              <h3>Welcome,</h3>
              <p>We're here to assist you with your healthcare needs.</p>
            </div>
            <div className="flex boxes">
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <h5>05</h5>
                  </div>
                  <h4>Open Requests</h4>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <h5>06</h5>
                  </div>
                  <h4>Prescriptions</h4>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="text">
                    <p>Aug 15, 2024</p>
                    <h4>Next Appointment</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="heading mt">
              <h3>Recent Activity</h3>
            </div>
            <div className="flex boxes">
              <div className="col">
                <div className="inner">
                  <div className="text">
                    <p>Aug 1, 2024</p>
                    <h4>Submitted a new request about medication dosage</h4>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="text">
                    <p>Jul 28, 2024</p>
                    <h4>
                      Received a new prescription for cholesterol medication
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="text">
                    <p>Jul 25, 2024</p>
                    <h4>Updated profile information</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Dashboard.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
