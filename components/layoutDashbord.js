import SiteMaster from "./sitemaster";
import { useRouter } from "next/router";
import LoggedHeader from "./logged-header";
import { Provider } from "react-redux";
import store from "../redux/store";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getUserData } from "../helpers/userData";
import NextNProgress from "nextjs-progressbar";
import { removeCookies } from 'cookies-next';

export default function LayoutDashboard({ children }) {
  const router = useRouter();
  const [memberRow, setMemberRow] = useState(null);
  const currentPage = router.pathname;
  const segments = currentPage?.split('/');
  const lastSegment = segments[segments.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const member = await getUserData();
        setMemberRow(member);

        if (!member) {
          // If no valid member data, clear auth token and redirect to home
          removeCookies('authToken');
          router.push('/');
        } else if (
          member?.id > 0 &&
          member?.mem_verified !== undefined &&
          member?.mem_verified !== null &&
          parseInt(member?.mem_verified) !== 1 &&
          lastSegment !== 'email-verification'
        ) {
          // Redirect to email verification page if member is not verified
          console.log("Member not verified", member);
          router.push('/dashboard/email-verification');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [router, lastSegment]);

  // No need to perform the redirect check outside the useEffect,
  // it will now be handled within the hook.

  return (
    <>
      <NextNProgress color="#e62254" />
      <Toaster position="bottom-right" containerStyle={{ zIndex: '9999999' }} />
      <Provider store={store}>
        <div className="content">
          {/* <SiteMaster /> */}
          <LoggedHeader />
          {children}
        </div>
      </Provider>
    </>
  );
}
