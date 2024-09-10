import React, { useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Prescription() {
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
            <div className="inner">
              <h3>My Prescription</h3>
            </div>
          </div>
        </section>

        <section id="listing">
          <div className="contain">
            <div className="outer">
              <div className="lst head">
                <ul>
                  <li>Prescription ID</li>
                  <li>Doctor</li>
                  <li>Instructions</li>
                  <li>Date</li>
                  <li></li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Dr. Smith</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12346</li>
                  <li>Dr. Johnson</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download </a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12344</li>
                  <li>Dr. Smith</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12346</li>
                  <li>Dr. Johnson</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Dr. Smith</li>
                  <li>Take one tablet twice daily</li>
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
                  <li>Dr. Johnson</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Dr. Smith</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="lst ">
                <ul>
                  <li>#12345</li>
                  <li>Dr. Johnson</li>
                  <li>Take one tablet twice daily</li>
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
                          <a href="">Download</a>
                        </li>
                        <li>
                          <a href="/">Print</a>
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
    </>
  );
}
Prescription.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
