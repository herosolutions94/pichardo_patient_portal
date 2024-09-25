import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux';
import PopupSmall from "@/components/components/popupSmall";
import Create_Request_info from "@/components/components/create-request-popup";
import { doObjToFormData, formatDateToAmericanTimezone, requestStatus } from "@/components/helpers/helpers";
import { Modal, ModalBody } from 'reactstrap';
import { authToken } from "@/components/helpers/authToken";
import http from "@/components/helpers/http";
import { useRouter } from "next/router";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";

export default function RequestsBlk({onSubmit, isPopupOpen, handleClosePopup, handleOpenPopup, result}) {
  const { requests } = result;
  // console.log(result);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [reOpenPopup, setReOpenPopup] = useState(null);
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
  const handleReOpenRequest=(request)=>{
    setReOpenPopup(request)
    setActiveDropdown(null);
  }
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleReOpenRequestAction = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const frmData = { days: extendBooking?.days };
    const result = await http
      .post(
        '/reopen-request/' + reOpenPopup?.encoded_id,
        doObjToFormData({ ...frmData, token: authToken() })
      )
      .then((response) => response.data)
      .catch((error) => error);
    setIsProcessing(false);
    if (result?.status) {
      setReOpenPopup(null);
      toast.success(result?.msg);
      router.replace(router.asPath);
    } else {
      toast.error(result?.msg);
    }
    // router.push("/dashboard/extend-pay-now/" + query?.id + "?days=" + extendBooking?.days)
  };

  const closeModel = () => {
    setReOpenPopup(null);
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
              {requests?.length > 0 ? 
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
                      <div className="lst" key={request?.id}>
                        <ul>
                          <li>#{request?.prescription_no}</li>
                          <li>{request?.subject}</li>
                          <li>
                            {requestStatus(request?.status)}
                          </li>
                          <li>{formatDateToAmericanTimezone(request?.updated_at)}</li>
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
                                  {
                                    request?.status==='completed' ?
                                  <li><a href="#" onClick={()=>handleReOpenRequest(request)}>Reopen</a></li>
                                  :
                                  ""
}

                                </ul>
                              </div>
                          </li>
                        </ul>
                      </div>
                    ))
                  }
                </div>
                :
                <div className="error_msg_blk">
                  <h4>No request found</h4>
                </div>
                }
              
            </div>
            {
          reOpenPopup!==null ?
          <Modal toggle={closeModel} isOpen={reOpenPopup!==null ? true : false} className="deleteModel">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Are you sure you want to Re-Open this Request?
          </h5>
          <button
            aria-label="Close"
            className=" close"
            type="button"
            onClick={() => setReOpenPopup(null)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <ModalBody>
          <p>
            Once you click on Yes, this request status will be changed from completed to pending and your request will be reopened.
          </p>
          <div className="btn_blk question_status_action justify-content-center">
            <button
              type="button"
              className="site_btn accept"
              onClick={handleReOpenRequestAction}
              disabled={isProcessing}
            >
              <img src="/images/accept.png" alt="accept" /> Yes{' '}
              {isProcessing ? (
                <IsFormProcessingSpinner isProcessing={isProcessing} />
              ) : (
                ''
              )}
            </button>
            <button
              type="button"
              className="site_btn reject"
              onClick={() => setReOpenPopup(null)}
            >
              <img src="/images/reject.png" alt="reject" />
              No
            </button>
          </div>
        </ModalBody>
      </Modal>
      :
      ""
        }
          </section>
        </main>
        <PopupSmall isOpen={isPopupOpen} onClose={handleClosePopup}>
          <Create_Request_info onClose={handleClosePopup} preferred_pharmacy={preferred_pharmacy} memberRow={memberRow} onSubmit={onSubmit}/>
        </PopupSmall>
        
    </>
  );
}
