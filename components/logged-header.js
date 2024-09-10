import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function LoggedHeader() {
  const [userDrop, setUserDrop] = useState(false);
  const [envelopeDrop, setEnvelopeDrop] = useState(false);
  const [notifyDrop, setNotifyDrop] = useState(false);
  const ToggleUserDrop = () => {
    setUserDrop(!userDrop);
  };
  const ToggleEnvelopeDrop = () => {
    setEnvelopeDrop(!envelopeDrop);
  };
  const ToggleNotifyDrop = () => {
    setNotifyDrop(!notifyDrop);
  };
  return (
    <>
      <header className="logged_header">
        <div className="contain">
          <div className="logo">
            <Link href="/">
              <img src="/images/logo.png" alt="" />
            </Link>
          </div>

          <div className="logged_side">
            <ul className="dash_headd">
              <li>
                <Link href="/">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/my-request">My Requests</Link>
              </li>
              <li>
                <Link href="/dashboard/my-prescription">My Prescriptions</Link>
              </li>
            </ul>
            <ul>
              <li className="logged_drop">
                <button className="logged_drop_btn" onClick={ToggleUserDrop}>
                  <div className="user_img">
                    <img src="/images/dp.png" alt="" />
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"}>
                  <li>
                    <Link
                      href="/professional-dashboard"
                      onClick={ToggleUserDrop}>
                      <span>My Profile settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/professional-dashboard/profile-settings"
                      onClick={ToggleUserDrop}>
                      <span>Payment Methods</span>
                    </Link>
                  </li>
                  <li className="drop_hide_dsk">
                    <Link
                      href="/professional-dashboard/my-account"
                      onClick={ToggleUserDrop}>
                      <span>Log Out</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </header>
    </>
  );
}
