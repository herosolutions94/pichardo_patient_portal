import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Checkout() {
  return (
    <>
      <main className="chat_screen dash check_screen">
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
          <div className="checkout">
            <div className="bulk">
              <h4 className="red_heading">BILLING INFORMATION</h4>
              <form>
                <div className="flex">
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="First name"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="Last name"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="Email"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="Phone number"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-12">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="Address"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="City"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option>Country</option>
                    </select>
                  </div>
                  <div className="form_blk col-xs-6">
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option>State</option>
                    </select>
                  </div>
                  <div className="form_blk col-xs-6">
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      placeholder="Zip Code"
                      required></input>
                  </div>
                </div>
                <div className="col-xs-12">
                  <h4 className="red_heading">PAYMENT METHOD</h4>
                </div>
                <div className="bulk green_border">
                  <div className="head_">
                    <div className="checkbox">
                      <input type="radio"></input>
                      <label>
                        <h4>Credit Card</h4>
                        <p>
                          Securely Pay with Your Card – Effortless Transactions
                          Await!
                        </p>
                      </label>
                    </div>
                    <div className="images">
                      <img src="/images/ca1.png"></img>
                      <img src="/images/ca2.png"></img>
                      <img src="/images/ca3.png"></img>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="form_blk col-xs-6">
                      <input
                        id=""
                        type=""
                        name=""
                        autoComplete=""
                        className="input"
                        placeholder="Card number"
                        required></input>
                    </div>
                    <div className="form_blk col-xs-6">
                      <input
                        id=""
                        type=""
                        name=""
                        autoComplete=""
                        className="input"
                        placeholder="Card holder name"
                        required></input>
                    </div>
                    <div className="form_blk col-xs-6">
                      <input
                        id=""
                        type=""
                        name=""
                        autoComplete=""
                        className="input"
                        placeholder="Expiry Date(mm/dd/yy)"
                        required></input>
                    </div>
                    <div className="form_blk col-xs-6">
                      <input
                        id=""
                        type=""
                        name=""
                        autoComplete=""
                        className="input"
                        placeholder="CVC?"
                        required></input>
                    </div>
                  </div>
                  <div className="btn_blk">
                    <button className="site_btn green">Check Out</button>
                  </div>
                </div>
              </form>
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
