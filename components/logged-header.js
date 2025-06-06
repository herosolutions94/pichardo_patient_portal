import Link from "next/link";
import { useRouter } from 'next/router';
import React, { useState, useEffect, useRef } from "react";
import { fetchMemberData, fetchSiteSettings } from "../redux/reducers/user";
import { useSelector, useDispatch } from "react-redux";
import { cmsFileUrl } from "../helpers/helpers";
import * as links from "../constants/link";
import { deleteCookie } from "cookies-next";

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

  const router = useRouter();
  const path = router.pathname;
  const dispatch = useDispatch();
  const mem_image = useSelector(state => state.user.mem_image);
  const mem_name = useSelector(state => state.user.mem_name);
  const mem_email = useSelector(state => state.user.mem_email);
  const mem_chat_id = useSelector(state => state.user.mem_chat_id);

  useEffect(() => {
    dispatch(fetchSiteSettings());
  }, []);

  useEffect(() => {
    dispatch(fetchMemberData());
  }, []);

  const site_settings = useSelector(state => state.user.site_settings);
  const logout = (e) => {
    e.preventDefault();
    let url = path
    deleteCookie("authToken");
    router.push(links.SIGNIN_PAGE + "?from=" + url);
  };

  const dropdownRef = useRef(null);
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setUserDrop(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="logged_header">
        <div className="contain">
          <div className="logo">
            <Link href="/">
            <img src={cmsFileUrl(site_settings?.site_logo, 'images')} alt={site_settings?.site_name} />
            </Link>
          </div>

          <div className="logged_side">
            <ul className="dash_headd">
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link href="/dashboard/requests">My Requests</Link>
              </li>
              <li>
                <Link href="/dashboard/prescriptions">My Prescriptions</Link>
              </li>
              <li>
                <Link href="/dashboard/invoices">My Invoices</Link>
              </li>

              <li>
                <Link href={`/dashboard/chat/view/${mem_chat_id}`}><img src="/images/msg.png" alt="" width={28} height={28} /></Link>
              </li>
              <li>
                <Link href={`https://pichardomedical.as.me/`} target="_blank" className="site_btn">Book an Appointment</Link>
              </li>
            </ul>
            <ul>
              <li className="logged_drop" ref={dropdownRef}>
                <button className="logged_drop_btn" onClick={ToggleUserDrop}>
                  <div className="user_img">
                  <img src={cmsFileUrl(mem_image, 'members')} alt={mem_name} />
                  </div>
                </button>
                <ul className={userDrop ? "sub active" : "sub"}>
                  <li>
                    <Link
                      href="/dashboard/profile-settings"
                      onClick={ToggleUserDrop}>
                      <span>My Profile settings</span>
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
          <div className="clearfix"></div>
        </div>
      </header>
    </>
  );
}
