import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import PopupSmall from "@/components/components/popupSmall";
import Create_Request_info from "@/components/components/create-request-popup";
import { formatDateToAmericanTimezone, requestStatus } from "@/components/helpers/helpers";

export default function RequestsBlk({onSubmit, isPopupOpen, handleClosePopup, handleOpenPopup, result}) {
  const { requests } = result;
  // console.log(result);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside any of the dropdown elements
      if (!dropdownRefs.current.some(ref => ref?.contains(event.target))) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [requests]);


  const handleActionClick = () => {
    setActiveDropdown(null); // Close all dropdowns
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
                          {requestStatus(request.status)}
                        </li>
                        <li>{formatDateToAmericanTimezone(request.updated_at)}</li>
                        <li className="bTn action_drop_lease">
                            <div className="action_drop _dropDown" ref={(el) => dropdownRefs.current[index] = el}>
                              <div
                                className="_dropBtn action_dots"
                                onClick={() => toggleDropdown(index)}>
                                <img src="/images/dots.svg" alt="" />
                              </div>
                              <ul
                                className={`_dropCnt dropLst ${
                                   activeDropdown === index ? "show" : "hide"
                                }`}>
                                <li><Link href={`/dashboard/requests/view/${request.encoded_id}`} onClick={handleActionClick}>View</Link></li>
                                <li><Link href="#" onClick={handleActionClick}>Reopen</Link></li>
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
