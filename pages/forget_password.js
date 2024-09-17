import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";
import ForgetForm from "./sections/forgetForm";
import { parse } from "cookie";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookieHeader = req.headers.cookie || '';
  const cookieValue = parse(cookieHeader);
  const authToken = cookieValue['authToken'] !== undefined && cookieValue['authToken'] !== null && cookieValue['authToken'] !== '' ? cookieValue['authToken'] : null;
  if (authToken !== null) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false,
          },
      };
  }
  
  const result = await http
    .post("forget-password-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};
export default function Forget_password({result}) {
  const {content,page_title,site_settings}=result
  return (
    <>
     <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
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
              <Text string={content?.banner_text} />
              <ForgetForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
