import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedHeader from "./logged-header";

import { Provider } from "react-redux";
import store from "../redux/store";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUserData } from "../helpers/userData";
import NextNProgress from "nextjs-progressbar";

export default function LayoutDashboard({ children }) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <>
    <NextNProgress color="#e62254" />
    <Toaster position="bottom-right" containerStyle={{
      zIndex: '9999999',
    }} />
    <Provider store={store}>
      <div className="content">
        <SiteMaster />
        <LoggedHeader />
        {children}
      </div>
    </Provider>
    </>
    
  );
}
