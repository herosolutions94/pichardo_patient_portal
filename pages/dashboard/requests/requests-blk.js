import React, { useEffect, useState } from "react";
import Link from "next/link";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector, useDispatch } from 'react-redux';
import PopupSmall from "@/components/components/popupSmall";
import Create_Request_info from "@/components/components/create-request-popup";

export default function RequestsBlk({onSubmit, isPopupOpen, handleClosePopup, handleOpenPopup, result}) {
  const { requests } = result;
  console.log(requests);

  const [toggleStates, setToggleStates] = useState([]);
  const [dropdownStates, setDropdownStates] = useState([]);

  const handleToggle = (index) => {
    setToggleStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  // Updated function to only open one dropdown at a time
  const toggleDropdown = (index) => {
    setDropdownStates((prevState) => {
      const updatedStates = prevState.map((state, i) => i === index ? !state : false);
      return updatedStates;
    });
  };

  const memberRow = useSelector(state => state.user.member);
  const preferred_pharmacy = useSelector(state => state.user.preferred_pharmacy) || [];

  
  

  return (
    <>
        <main className="dash">
          <section id="dashboard">
            <div className="contain">
              <div className="inner sp">
                <h3>My Requests</h3>
                <div className="btn_blk">
                  <Link
                    href="javascript:void(0)"
                    onClick={handleOpenPopup}
                    className="site_btn green">
                    Create New Request
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section id="listing">
            <div className="contain">
              <div className="outer">
                <div className="lst head">
                  <ul>
                    <li>Request ID</li>
                    <li>Subject</li>
                    <li>Status</li>
                    <li>Last Updated</li>
                    <li></li>
                  </ul>
                </div>
                {
                  requests?.map((request, index) => (
                    <div className="lst" key={request.id}>
                      <ul>
                        <li>#{request.id}</li>
                        <li>{request.subject}</li>
                        <li>
                            <span className="green badge">
                              {request.status}
                            </span>
                        </li>
                        <li>{new Date(request.updated_at).toLocaleDateString()}</li>
                        <li className="bTn action_drop_lease">
                            <div className="action_drop _dropDown">
                              <div
                                className="_dropBtn action_dots"
                                onClick={() => toggleDropdown(index)}>
                                <img src="/images/dots.svg" alt="" />
                              </div>
                              <ul
                                className={`_dropCnt dropLst ${
                                  dropdownStates[index] ? "show" : "hide"
                                }`}>
                                <li><a href="#">View</a></li>
                                <li><a href="#">Edit</a></li>
                                <li><a href="#">Reopen</a></li>
                              </ul>
                            </div>
                        </li>
                      </ul>
                    </div>
                  ))
                }
              </div>
            </div>
          </section>
        </main>
        <PopupSmall isOpen={isPopupOpen} onClose={handleClosePopup}>
          <Create_Request_info onClose={handleClosePopup} preferred_pharmacy={preferred_pharmacy} memberRow={memberRow} onSubmit={onSubmit}/>
        </PopupSmall>
    </>
  );
}
