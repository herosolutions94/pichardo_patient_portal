import React, { useState } from "react";
import Link from "next/link";
import Popup from "@/components/components/popup";
import Team_info from "../components/team-info-popup";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("about-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function About({result}) {
  const {content,team, page_title,site_settings}=result

  const sec2_arr=generateContentArray(content, 3, 4, 2)
  const sec2_2_arr=generateContentArray(content, 5, 6, 2)

  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const handleOpenPopup = (teamMember) => {
    setSelectedTeamMember(teamMember);
  };

  const handleClosePopup = () => {
    setSelectedTeamMember(null);
  };
  return (
    
    <>
      <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <section id="smbanner" style={{ background: `url(${cmsFileUrl(content?.image1)})` }}>
          <div className="contain">
            <div className="content_center">
              <Text string={content?.banner_text} />
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
              <Text string={content?.section1_text} />
              </div>
              <div className="colr">
                <div className="image">
                    <Image
                      src={cmsFileUrl(content?.image2 , 'images')}
                      alt={short_text(content?.section1_text)}
                      width={1000}
                      height={1000}
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="mission_value" className="p0">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="flex">
                  <div className="left_col mt ">
                  {
                      sec2_arr?.map((sec2_obj,index)=>{
                        return(
                            <div className="inner">
                              <div className="image">
                                <Image
                                    src={cmsFileUrl(sec2_obj?.image, 'images')}
                                    alt={sec2_obj?.heading}
                                    width={300}
                                    height={80}
                                />
                              </div>
                                <h4>{sec2_obj?.heading}</h4>
                                <p>{sec2_obj?.text}</p>
                            </div>
                        )
                      })
                    }
                  </div>
                  <div className="left_col right_col">
                    {
                      sec2_2_arr?.map((sec2_obj,index)=>{
                        return(
                            <div className="inner">
                              <div className="image">
                                <Image
                                    src={cmsFileUrl(sec2_obj?.image, 'images')}
                                    alt={sec2_obj?.heading}
                                    width={300}
                                    height={80}
                                />
                              </div>
                                <h4>{sec2_obj?.heading}</h4>
                                <p>{sec2_obj?.text}</p>
                            </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
              <div className="colr">
              <Text string={content?.section2_text} />
                <div className="btn_blk">
                  <Link href={content?.section2_link_url} className="site_btn">
                  {content?.section2_link_text}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="whychooseus">
          <div className="contain">
            <div className="outer">
              <div className="content_center">
              <Text string={content?.section3_text} />
              </div>
            </div>
          </div>
        </section> */}

        <section id="team" className="p0">
          <div className="contain">
            <div className="text">
              <Text string={content?.section4_text} />
            </div>
            <div className="flex">
                {team.map((val) => {
                  return (
                    <div className="coll" key={val.id}>
                      <div className="inner">
                        <div className="image" onClick={() => handleOpenPopup(val)}>
                          <Image
                              src={cmsFileUrl(val?.image, 'team',true)}
                              alt={val?.name}
                              width={1000}
                              height={1000}
                          />
                          <div className="t_text">
                            <h4>
                              {" "}
                              <a href="javascript:void(0)" onClick={() => handleOpenPopup(val)}>
                              {val.name}
                              </a>
                            </h4>
                            <p>{val.designation}</p>
                          </div>
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
                <Text string={content?.section5_text} />
                <div className="bTn">
                <Link className="site_btn" href={content?.section5_link_url_1}>
                {content?.section5_link_text_1}
                </Link>
                <Link className="site_btn white" href={content?.section5_link_url_2}>
                {content?.section5_link_text_2}
                </Link>
                </div>
              </div>
              <div className="image">
              <img src={cmsFileUrl(content?.image7 , 'images')} alt={short_text(content?.section5_text)}/>
              </div>
            </div>
          </div>
        </section>
      </main>
      {
        selectedTeamMember!==null ?
        <Popup isOpen={selectedTeamMember} onClose={handleClosePopup}>
        <Team_info teamMember={selectedTeamMember} onClose={handleClosePopup} />
      </Popup>
      :
      ""
      }
      
    </>
  );
}
