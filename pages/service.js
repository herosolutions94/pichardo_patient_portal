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
    .post("services-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Service({result}) {
  const {content,services, page_title,site_settings}=result
  console.log(result);
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

        <section id="ser_pg" className="pb">
          <div className="contain">
            <div className="flex">
            {services.map((val) => {
              return (
                <div className="coll" key={val.id}>
                  <div className="image">
                    <Image
                        src={cmsFileUrl(val?.image, 'services')}
                        alt={val.name}
                        width={1000}
                        height={800}
                    />
                  </div>
                  <div className="text">
                    <h3>{val.name}</h3>
                    <Text string={val?.description}/>
                  </div>
                </div>
              );
            })}
              
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="image">
                    <Image
                      src={cmsFileUrl(content?.image2 , 'images')}
                      alt={short_text(content?.section1_text)}
                      width={1000}
                      height={500}
                    />
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

        <section id="par_bg" style={{ background: `url(${cmsFileUrl(content?.image3)})` }}>
          <div className="contain">
            <div className="outer">
              <div className="text">
                <Text string={content?.section2_text} />
                <div className="bTn">
                <Link className="site_btn" href={content?.section2_link_url_1}>
                {content?.section2_link_text_1}
                </Link>
                <Link className="site_btn white" href={content?.section2_link_url_2}>
                {content?.section2_link_text_2}
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="whoweare" className="pb">
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
                  <Image
                      src={cmsFileUrl(content?.image4 , 'images')}
                      alt={short_text(content?.section3_text)}
                      width={1000}
                      height={500}
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
