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
    .post("contact-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};
export default function Contact({result}) {
  const {content, page_title,site_settings}=result
  console.log(result);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
  }
  return (
    <>
    <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <section
          id="smbanner"
          style={{ background: `url(${cmsFileUrl(content?.image1)})` }}>
          <div className="contain">
            <div className="content_center">
            <Text string={content?.banner_text} />
            </div>
          </div>
        </section>

        <section id="cnt" className="pb">
          <div className="contain">
            <div className="flex">
              <div className="col">
              <Text string={content?.section2_text} />
              </div>
              <div className="colr">
                <div className="flex">
                {
                    site_settings?.site_phone ?
                        <div className="coll">
                          <Link href={"tel:" + site_settings?.site_phone} className="inner">
                            <div className="icon">
                              <img src="images/Phone.svg"></img>
                            </div>
                            <p>{site_settings?.site_phone}</p>
                          </Link>
                        </div>
                        :
                        ""
                }

                {
                  site_settings?.site_email ?
                  
                  <div className="coll">
                    <Link href={"mailto:" + site_settings?.site_email} className="inner">
                      <div className="icon">
                        <img src="images/Envelope.svg"></img>
                      </div>
                      <p>{site_settings?.site_email}</p>
                    </Link>
                  </div>
                  :
                  ""
                }
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cnt_form">
          <div className="contain">
            <div className="outer">
              <Text string={content?.section3_text} />

              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="form_blk">
                    <input
                      id="frm-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="First Name"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Last Name"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-phone"
                      type="text"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Phone Number"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-email"
                      type="email"
                      name="email"
                      autoComplete="tel"
                      placeholder="Email Address"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk col-xs-12">
                    <textarea
                      id="frm-message"
                      name="message"
                      className="input"
                      placeholder="Enter Your Message Here"></textarea>
                  </div>
                  <div className="have_check form_blk">
                    <p>What services are you interested in?</p>
                    <div className="flx">
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Semaglutide</label>
                      </div>
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Tirzepatide</label>
                      </div>
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form_blk col-xs-12">
                    <input
                      id=""
                      type="text"
                      name=""
                      autoComplete=""
                      placeholder="How did you hear about us?"
                      className="input"
                      required
                    />
                  </div>
                  <div className="btn_blk">
                    <button type="submit" className="site_btn">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
