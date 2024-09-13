import SiteMaster from "./sitemaster";
import Header from "./header";
import Footer from "./footer";
import { useRouter } from "next/router";
export default function Layout({ children, siteSettings }) {
  const router = useRouter();
  const path = router.pathname;
  if (
    path == "/signup" ||
    path == "/login" ||
    path == "/forget_password" ||
    path == "/reset_password"
  ) {
    return (
      <div className="content">
        <SiteMaster siteSettings={siteSettings}/>
        {children}
      </div>
    );
  } else {
    return (
      <div className="content">
        <SiteMaster siteSettings={siteSettings}/>
        <Header siteSettings={siteSettings}/>
        {children}
        <Footer siteSettings={siteSettings}/>
      </div>
    );
  }
}
