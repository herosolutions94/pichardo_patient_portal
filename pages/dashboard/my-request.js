import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import Create_Request_info from "@/components/components/create-request-popup";
import PopupSmall from "@/components/components/popupSmall";

export default function Request() {
  const [toggleStates, setToggleStates] = useState([]);
  const [dropdownStates, setDropdownStates] = useState(false);

  const handleToggle = (index) => {
    setToggleStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  const toggleDropdown = (index) => {
    setDropdownStates((prevState) => {
      const updatedStates = [...prevState];
      updatedStates[index] = !updatedStates[index];
      return updatedStates;
    });
  };

  // popup

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <>
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="flex">
              <div className="col">
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
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="green badge"> Open</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12346</li>
                  <li>Appointment Reschedule</li>
                  <li>
                    <span className="red badge"> Closed</span>
                  </li>
                  <li>Jul 28, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12344</li>
                  <li>Lab Results</li>
                  <li>
                    <span className="green badge"> Open</span>
                  </li>
                  <li>Jul 20, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12346</li>
                  <li>Billing Inquiry</li>
                  <li>
                    <span className="yellow badge"> Pending</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="blue badge"> Awaiting Payment</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="red badge"> Closed</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="yellow badge"> Pending</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="green badge">open</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Prescription Refill</li>
                  <li>
                    <span className="blue badge"> Awaiting Payment</span>
                  </li>
                  <li>Aug 1, 2024</li>
                  <li className="bTn action_drop_lease">
                    <div className="action_drop _dropDown">
                      <div
                        className="_dropBtn action_dots"
                        onClick={() => setDropdownStates(!dropdownStates)}>
                        <img src="/images/dots.svg" alt="" />
                      </div>
                      <ul
                        className={`_dropCnt dropLst ${
                          dropdownStates ? "show" : "hide"
                        }`}>
                        <li>
                          <a href="">View</a>
                        </li>
                        <li>
                          <a href="">Edit</a>
                        </li>
                        <li>
                          <a href="/">Reopen</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PopupSmall isOpen={isPopupOpen} onClose={handleClosePopup}>
        <Create_Request_info onClose={handleClosePopup} />
      </PopupSmall>
    </>
  );
}
Request.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
