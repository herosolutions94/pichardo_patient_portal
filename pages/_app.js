import 'bootstrap/dist/css/bootstrap.css'
import '../styles/custom.scss'
import Layout from '../components/layout'
import http from '../helpers/http';
import { parse } from 'cookie';
import NextNProgress from "nextjs-progressbar";
import { authToken } from '../helpers/authToken';
import { doObjToFormData } from '../helpers/helpers';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps, siteSettings }) {
  // return <Component {...pageProps} />
  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return (
      <>
      <Toaster position='bottom-right' />
        <NextNProgress color="#e62254" />
        <Layout siteSettings={siteSettings}>{page}</Layout>
      </>
      );
    };

  return renderWithLayout(<Component {...pageProps} />);
}

App.getInitialProps = async ({ ctx }) => {
  const cookies = parse(ctx?.req?.headers?.cookie || "");
  const authToken = cookies?.authToken || "";
  const siteSettings = await http
    .post("site-settings", doObjToFormData({ token: authToken }))
    .then((response) => response?.data?.site_settings)
    .catch((error) => error?.response?.data?.message);
  return { siteSettings };
};