import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Main_checkout() {
  return (
    <>
      <main className="dash">
        <section id="dashboard" className="main_checkout">
          <div className="contain">
            <div className="outer">
              <h2>Checkout</h2>
              <div className="bulk">
                <h4 class="red_heading">Order Summary</h4>
                <div className="order_tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>Item Description</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Consultation Fee</td>
                        <td>1</td>
                        <td>$150.00</td>
                        <td>$150.00</td>
                      </tr>
                      <tr>
                        <td>Lab Test</td>
                        <td>1</td>
                        <td>$200.00</td>
                        <td>$200.00</td>
                      </tr>
                      <tr>
                        <td>X-Ray</td>
                        <td>1</td>
                        <td>$100.00</td>
                        <td>$100.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="total_bloc">
                    <tbody>
                      <tr class="subtotal">
                        <td width="80%">Subtotal</td>
                        <td width="20%">$450.00</td>
                      </tr>
                      <tr class="tax">
                        <td width="80%">Tax (8.5%)</td>
                        <td width="20%">$38.25</td>
                      </tr>
                      <tr class="total">
                        <td width="80%">Total</td>
                        <td width="20%">$488.25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <form className="checkout">
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
                            Securely Pay with Your Card – Effortless
                            Transactions Await!
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
        </section>
      </main>
    </>
  );
}
Main_checkout.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
