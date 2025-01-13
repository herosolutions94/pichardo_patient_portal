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
    .post("testimonials-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Testimonials({result}) {
  const {content,testimonials, page_title,site_settings}=result
//   console.log(result);
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
        <section className="testimonials_pg p_b_0">
            <div className="contain">
                <div className="flex">
                    {testimonials.map((val) => {
                        return (
                        <div className="col">
                            <div className="inner">
                                <div className="quotes">
                                    <img src="images/quotes.svg"></img>
                                </div>
                                <Text string={val?.message} />
                                <div className="testi_footer">
                                    <h5>{val.name}</h5>
                                    <h6>{val.designation}</h6>
                                </div>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
        <section id="cta">
          <div className="contain">
            <div className="outer">
              <div className="text">
                <Text string={content?.section4_text} />
                <div className="bTn">
                <Link className="site_btn" href={content?.section4_link_url_1}>
                {content?.section4_link_text_1}
                </Link>
                <Link className="site_btn white" href={content?.section4_link_url_2}>
                {content?.section4_link_text_2}
                </Link>
                </div>
              </div>
              <div className="image">
              <img src={cmsFileUrl(content?.image5 , 'images')} alt={short_text(content?.section4_text)}/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
