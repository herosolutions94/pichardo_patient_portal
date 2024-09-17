import React, { useEffect, useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

import MetaGenerator from "@/components/components/meta-generator";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { fetchMemberData } from "@/components/redux/reducers/user";
import ProfileSettingsForm from "./sections/profile-settings-form";
import IsPAgeLoadingSec from "@/components/components/isPAgeLoadingSec";
import UpdatePasswordForm from "./sections/update-password-form";

export default function Profile_settings() {

  const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(fetchMemberData())
    }, []);
    const isFetching = useSelector(state => state.user.isFetching);
    const memberRow = useSelector(state => state.user.member);
    const site_settings = useSelector(state => state.user.site_settings);
  return (
    <>
    <MetaGenerator page_title={"Profile Setings- " + site_settings?.site_name} site_settings={site_settings} />
    <IsPAgeLoadingSec isProcessing={isFetching} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>Profile Settings</h3>
            </div>
          </div>
        </section>

        <section id="create_request">
          <div className="contain">
            <div className="bulk outer">
              <ProfileSettingsForm/>
              <UpdatePasswordForm memberRow={memberRow} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Profile_settings.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
