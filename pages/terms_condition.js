import React from "react";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("terms-conditions-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Terms_condition({result}) {
  const {content,page_title,site_settings}=result
  return (
    <>
    <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <section
          id="smbanner"
          style={{ background: `url(${cmsFileUrl(content?.image1)})` }}
          >
          <div className="contain">
            <div className="content_center">
            <h1>{content?.section1_heading}</h1>
            </div>
          </div>
        </section>

        <section id="policy">
          <div className="contain">
            <div className="outer">
            <Text string={content?.section1_text} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
