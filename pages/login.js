import React from "react";
import Link from "next/link";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("login-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Login({result}) {
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

              <form>
                <div className="form_blk">
                  <label>Email</label>
                  <input
                    id="frm-email"
                    type="email"
                    name="email"
                    autoComplete="name"
                    placeholder="hi@example.com"
                    className="input"
                    required
                  />
                </div>
                <div className="form_blk">
                  <label>Password</label>
                  <input
                    id="frm-password"
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="input"
                    required
                  />
                  <img className="eye" src="images/eye.svg"></img>
                </div>
                <div className="form_blk blk_link">
                  <Link className="link" href="/forget_password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="btn_blk">
                  <button className="site_btn block">Login</button>
                </div>
                <div className="btn_blk">
                  <button className="site_btn white block">
                    <img src="images/google.svg"></img> Continue with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
