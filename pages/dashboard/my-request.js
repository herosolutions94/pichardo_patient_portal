import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

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
                    <Link href="" className="site_btn green">
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
                    <span className="green badge"> Status</span>
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
              {/* <div className="lst ">
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
                  <li>Request ID</li>
                  <li>Subject</li>
                  <li>Status</li>
                  <li>Last Updated</li>
                  <li></li>
                </ul>
              </div>
              <div className="lst ">
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
                  <li>Request ID</li>
                  <li>Subject</li>
                  <li>Status</li>
                  <li>Last Updated</li>
                  <li></li>
                </ul>
              </div>
              <div className="lst ">
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
                  <li>Request ID</li>
                  <li>Subject</li>
                  <li>Status</li>
                  <li>Last Updated</li>
                  <li></li>
                </ul>
              </div>
              <div className="lst ">
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
                  <li>Request ID</li>
                  <li>Subject</li>
                  <li>Status</li>
                  <li>Last Updated</li>
                  <li></li>
                </ul>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Request.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
