import React, { useRef } from "react";
import Link from "next/link";

import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";
import { useState } from "react";
import gsap from "gsap";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("faqs-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Faqs({result}) {
  const {content,faqs,page_title,site_settings}=result

  
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const handleAccordionClick = (index) => {
    console.log(index);
    if (index === openAccordion) {
      gsap.to(
        accordionRefs.current[index].querySelector(".accordion__details"),
        {
          height: 0,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => setOpenAccordion(null),
        }
      );
     
    } else {
      if (openAccordion !== null) {
        gsap.to(
          accordionRefs.current[openAccordion].querySelector(
            ".accordion__details"
          ),
          {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          }
        );
      }
      setOpenAccordion(index);
      gsap.fromTo(
        accordionRefs.current[index].querySelector(".accordion__details"),
        { height: 0 },
        {
          height: "auto",
          duration: 0.5,
          ease: "power1.inOut",
        }
      );
    }
  };

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
        <section className="faq_pg p_b_0">
            <div className="contain">
                <div className="outer_blk_faq">
                    <div className="faq_blk">
                        {faqs.map((val, i) => {
                        return (
                            <div
                            className={`outer_faq  ${
                                openAccordion === i ? "open" : ""
                            }`}
                            key={i}
                            ref={(el) => (accordionRefs.current[i] = el)}
                            >
                            <div
                                className="accordion__header"
                                onClick={() => handleAccordionClick(i)}
                            >
                                <h4>
                                <Text string={val.question} />
                                </h4>
                            </div>
                            <div className="accordion__details">
                                <Text string={val.answer} />
                            </div>
                            </div>
                        );
                        })}
                    </div>
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
