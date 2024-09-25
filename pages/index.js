import React, { useEffect, useState } from "react";
import Link from "next/link";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
import Testimonials from "../components/testimonials";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("home-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};


export default function Home({result}) {
  
  const {content, testimonials, page_title,site_settings}=result

  const sec2_arr=generateContentArray(content, 3, 6, 2)
  const sec5_arr=generateContentArray(content, 9, 11, 5)
  return (
    <>
    <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <section id="banner" style={{ background: `url(${cmsFileUrl(content?.image1)})` }}>
          <div className="contain">
            <div className="text">
              <Text string={content?.banner_text} />
              <div className="bTn">
                <Link className="site_btn" href={content?.banner_link_url_1}>
                  {content?.banner_link_text_1}
                </Link>
                <Link className="site_btn white" href={content?.banner_link_url_2}>
                {content?.banner_link_text_2}
                </Link>
              </div>
              <Text string={content?.banner_bottom_text} />
            </div>
          </div>
        </section>

        <section id="about">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="image">
                  <img src={cmsFileUrl(content?.image2 , 'images')} alt={short_text(content?.section1_text)}/>
                </div>
              </div>
              <div className="colr">
                <Text string={content?.section1_text} />
                <div className="btn_blk">
                  <Link href={content?.section1_link_url} className="site_btn">
                  {content?.section1_link_text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="contain">
            <div className="content_center">
              <Text string={content?.section2_text} />
            </div>
            <div className="flex">
              {
                sec2_arr?.map((sec2_obj,index)=>{
                  return(
                    <div className="col">
                      <div className="inner">
                        <div className="icon">
                          <Image
                              src={cmsFileUrl(sec2_obj?.image, 'images')}
                              alt={sec2_obj?.heading}
                              width={300}
                              height={300}
                          />
                        </div>
                        <div className="text">
                          <h4>{sec2_obj?.heading}</h4>
                          <p>{sec2_obj?.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <Text string={content?.section3_text} />
                <div className="btn_blk">
                  <Link href={content?.section3_link_url} className="site_btn">
                  {content?.section3_link_text}
                  </Link>
                </div>
              </div>
              <div className="colr">
                <div className="image">
                  <img src={cmsFileUrl(content?.image7 , 'images')} alt={short_text(content?.section3_text)}/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bg_sec" style={{ background: `url(${cmsFileUrl(content?.image8)})` }}>
          <div className="contain">
            <div className="content_center">
              <Text string={content?.section4_text} />
            </div>
            <div className="bTn">
              <Link className="site_btn green" href={content?.section4_link_url_1}>
              {content?.section4_link_text_1}
              </Link>
              <Link className="site_btn white" href={content?.section4_link_url_2}>
              {content?.section4_link_text_2}
              </Link>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="contain">
            <div className="txt_flx">
              <h2><Text string={content?.sec5_heading} /></h2>
              <Text string={content?.section5_text} />
            </div>
            <div className="flex">
              {
                sec5_arr?.map((sec5_obj,index)=>{
                  return(
                    <div className="col">
                      <div className="inner">
                        <div className="image">
                            <img src={cmsFileUrl(sec5_obj?.image, 'images')} alt={sec5_obj?.heading}/>
                        </div>
                        <div className="text">
                          <h4>{sec5_obj?.heading}</h4>
                          <p>{sec5_obj?.text}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </section>

        <section className="testimonial_sec p0">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="text">
                <Text string={content?.section6_text} />
                </div>
                <Testimonials data={testimonials} />
              </div>
              <div className="colr">
                <div className="image">
                  {/* <img src={cmsFileUrl(content?.image12 , 'images')} alt={short_text(content?.section6_text)}/> */}
                  <Image
                      src={cmsFileUrl(content?.image12 , 'images')}
                      alt={short_text(content?.section6_text)}
                      width={1200}
                      height={1000}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="contain">
            <div className="outer">
              <div className="text">
                <Text string={content?.section7_text} />
                <div className="bTn">
                <Link className="site_btn" href={content?.section7_link_url_1}>
                {content?.section7_link_text_1}
                </Link>
                <Link className="site_btn white" href={content?.section7_link_url_2}>
                {content?.section7_link_text_2}
                </Link>
                </div>
              </div>
              <div className="image">
                <img src={cmsFileUrl(content?.image13 , 'images')} alt={short_text(content?.section7_text)}/>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
