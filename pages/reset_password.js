import React from "react";
import Link from "next/link";
export default function Reset_password() {
  return (
    <div>
      <main>
        <div className="contain">
          <div className="login_header">
            <div className="logon_logo">
              <Link href="/">
                <img src="/images/logo.png" alt="" />
              </Link>
            </div>
            <div className="btn_blk">
              <p>
                Don’t have an account?{" "}
                <Link href="/signup" className="strong">
                  Get started today
                </Link>
              </p>
            </div>
          </div>
        </div>

        <section id="login">
          <div className="contain">
            <div className="outer">
              <h3>Rest your Password</h3>

              <form>
                <div className="form_blk">
                  <label>New Password</label>
                  <input
                    id=""
                    type=""
                    name=""
                    autoComplete="name"
                    placeholder="Enter new password"
                    className="input"
                    required
                  />
                </div>
                <div className="form_blk">
                  <label>Confirm New Password</label>
                  <input
                    id=""
                    type=""
                    name=""
                    autoComplete="name"
                    placeholder="Confirm new password"
                    className="input"
                    required
                  />
                </div>

                <div className="btn_blk">
                  <button className="site_btn block">Reset Password</button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
