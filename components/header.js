import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from "react";
import { fetchMemberData, fetchSiteSettings } from "../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { cmsFileUrl } from "../helpers/helpers";
import * as links from "../constants/link";
import { deleteCookie } from "cookies-next";

export default function Header({siteSettings}) {
  // console.log(siteSettings);
  const [toggle, setToggle] = useState(false);
  const ToggleAction = () => {
    setToggle(!toggle);
  };
  const [userDrop, setUserDrop] = useState(false);
  const ToggleUserDrop = () => {
    setUserDrop(!userDrop);
  };

  const router = useRouter();
  const path = router.pathname;
  const dispatch = useDispatch();
  const mem_image = useSelector(state => state.user.mem_image);
  const mem_name = useSelector(state => state.user.mem_name);
  const mem_email = useSelector(state => state.user.mem_email);
  useEffect(() => {
    dispatch(fetchSiteSettings());
  }, []);

  useEffect(() => {
    dispatch(fetchMemberData());
  }, []);

  const site_settings = useSelector(state => state.user.site_settings);
  // console.log(site_settings?.member?.id);
  const logout = (e) => {
    e.preventDefault();
    let url = path
    deleteCookie("authToken");
    router.push(links.SIGNIN_PAGE + "?from=" + url);
  };

  return (
    <header className={site_settings?.member?.id > 0 ? "logged_header_front" : ""}>
      <div className="contain">
        <div className="outer">
          <div className="logo">
            <Link href="/">
            <img src={cmsFileUrl(siteSettings?.site_logo, 'images')} alt={siteSettings?.site_name} />
            </Link>
          </div>
          <div
            className={toggle ? "toggle active" : "toggle"}
            onClick={ToggleAction}>
            <span></span>
          </div>
          <nav id="nav" className={toggle ? "active" : ""}>
            <ul>
              <li>
                <Link href="/" onClick={ToggleAction}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={ToggleAction}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service" onClick={ToggleAction}>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={ToggleAction}>
                  Contact Us
                </Link>
              </li>
              {
              site_settings?.member?.id > 0 ?
              ""
              :
              <li>
                <Link className="site_btn" href="/login" onClick={ToggleAction}>
                  Login
                </Link>
              </li>
              }
            </ul>
          </nav>
          {/* =========user no login====== */}
          {
          site_settings?.member?.id > 0 ?
          <div className="logged_side">
            <ul>
              <li className="logged_drop">
                <button className="logged_drop_btn" onClick={ToggleUserDrop}>
                  <div className="user_img">
                  <img src={cmsFileUrl(mem_image, 'members')} alt={mem_name} />
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"}>
                  <li>
                    <Link
                      href="/dashboard"
                      onClick={ToggleUserDrop}>
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/profile-settings"
                      onClick={ToggleUserDrop}>
                      <span>My Profile settings</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/requests"
                      onClick={ToggleUserDrop}>
                      <span>My Requests</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/prescriptions"
                      onClick={ToggleUserDrop}>
                      <span>My Prescription</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#!"
                      onClick={logout}>
                      <span>Log Out</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          :
          ""
          }
          <div className="clearfix"></div>
        </div>
      </div>
    </header>
  );
}
