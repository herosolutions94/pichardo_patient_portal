import React, { useEffect, useState } from "react";
import LayoutDashboard from "@/components/components/layoutDashbord";

import MetaGenerator from "@/components/components/meta-generator";
import { useSelector } from "react-redux";
import RequestsBlk from "./requests-blk";
import NewRequest from "./new-request";
import { parse } from 'cookie';
import http from "@/components/helpers/http";
import { doObjToFormData } from "@/components/helpers/helpers";

export const getServerSideProps = async (context) => {
    const { req, res } = context;
    const cookieHeader = req.headers.cookie || '';
    const cookieValue = parse(cookieHeader);
    const authToken =
      cookieValue['authToken'] !== undefined &&
      cookieValue['authToken'] !== null &&
      cookieValue['authToken'] !== ''
        ? cookieValue['authToken']
        : null;
    const result = await http
      .post("user-requests", doObjToFormData({ token: authToken }))
      .then((response) => response.data)
      .catch((error) => error.response.data.message);
  
    return { props: { result } };
  };

export default function Requests({result}) {
  const[request , setRequest] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState({});

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handlePopupSubmit = (formData) => {
    setPopupData(formData);
    setRequest(false);
    setIsPopupOpen(false);
    // console.log(formData);
  };

 
  const site_settings = useSelector(state => state.user.site_settings);
  return (
    <>
        {
            request ?
            <>
                <MetaGenerator page_title={"My Requests- " + site_settings?.site_name} site_settings={site_settings} />
                <RequestsBlk result={result} onSubmit={handlePopupSubmit} isPopupOpen={isPopupOpen} handleClosePopup={handleClosePopup} handleOpenPopup={handleOpenPopup}/>
            </>
            :
            <>
                <MetaGenerator page_title={"Create New Request- " + site_settings?.site_name} site_settings={site_settings} />
                <NewRequest popupData={popupData}/>
            </>
        }
    </>
  );
}
Requests.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
