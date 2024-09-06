import React, { useState } from "react";
import Link from "next/link";
import Popup from "@/components/components/popup";
import Team_info from "../components/team-info-popup";

export default function About() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <div>
      <main>
        <section id="smbanner">
          <div className="contain">
            <div className="content_center">
              <h1>About Pichardo Medical</h1>
              <p>Dedicated to Your Health and Well-being</p>
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <h2>Our Story</h2>
                <p>
                  Pichardo Medical was founded with a mission to provide
                  compassionate, patient-centered healthcare. Our clinic has
                  grown over the years, but our commitment to excellence remains
                  the same. We are proud to serve our community and strive to be
                  a trusted partner in your health journey.
                </p>
              </div>
              <div className="colr">
                <div className="image">
                  <img src="/images/story.png"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mission_value" className="p0">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="flex">
                  <div className="left_col mt ">
                    <div className="inner">
                      <div className="image">
                        <img src=" /images/m1.svg" alt="" />
                      </div>
                      <h4> Compassion</h4>
                      <p>We treat every patient with kindness and empathy.</p>
                    </div>
                    <div className="inner">
                      <div className="image">
                        <img src=" /images/m3.svg" alt="" />
                      </div>
                      <h4> Integrity</h4>
                      <p>We treat every patient with kindness and empathy.</p>
                    </div>
                  </div>
                  <div className="left_col right_col">
                    <div className="inner">
                      <div className="image">
                        <img src=" /images/m2.svg" alt="" />
                      </div>
                      <h4> Excellence</h4>
                      <p>We treat every patient with kindness and empathy.</p>
                    </div>
                    <div className="inner">
                      <div className="image">
                        <img src=" /images/m4.svg" alt="" />
                      </div>
                      <h4> Innovation</h4>
                      <p>We treat every patient with kindness and empathy.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="colr">
                <h2>Our Mission & Values</h2>
                <p>
                  Pichardo Medical was founded with a mission to provide
                  compassionate, patient-centered healthcare. Our clinic has
                  grown over the years, but our commitment to excellence remains
                  the same. We are proud to serve our community and strive to be
                  a trusted partner in your health journey.
                </p>
                <div className="btn_blk">
                  <Link href="" className="site_btn">
                    Get Started
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
                <h2>Why Choose Us</h2>
                <p>
                  Pichardo Medical was founded with a mission to provide
                  compassionate, patient-centered healthcare. Our clinic has
                  grown over the years, but our commitment to excellence remains
                  the same. We are proud to serve our community and strive to be
                  a trusted partner in your health journey.
                </p>
              </div>
              <ul className="list">
                <li>Experienced and compassionate medical professionals</li>
                <li>Patient-centered approach to healthcare</li>
                <li>Reliable recommendations and online services</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="team" className="p0">
          <div className="contain">
            <div className="text">
              <h2>Our Team</h2>
              <p>
                Pichardo Medical was founded with a mission to provide
                compassionate, patient-centered healthcare. Our clinic has grown
                over the years, but our commitment to excellence remains the
                same. We are proud to serve our community and strive to be a
                trusted partner in your health journey.
              </p>
            </div>
            <div className="flex">
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team1.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Marlo Pichardo
                        </a>
                      </h4>
                      <p>PA-C, MPAS</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team2.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Edwin Pichardo
                        </a>
                      </h4>

                      <p>Director of Operations</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team3.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Katrina Pichardo
                        </a>
                      </h4>
                      <p>Digital Marketing Director</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team4.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Olivia Pichardo
                        </a>
                      </h4>

                      <p>Office Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team5.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Maggie Scott
                        </a>
                      </h4>
                      <p>Office Administrator</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="coll">
                <div className="inner">
                  <div className="image">
                    <img src="/images/team6.png"></img>
                    <div className="t_text">
                      <h4>
                        {" "}
                        <a href="javascript:void(0)" onClick={handleOpenPopup}>
                          Koa, Koemi, & Duke
                        </a>
                      </h4>
                      <p>Chief Emotional Support Office</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="contain">
            <div className="outer">
              <div className="text">
                <h2>Be on Your Way to Feeling Better with Us</h2>
                <p>
                  Manage your health online with our secure patient portal.
                  Access your dashboard, create tickets, view prescriptions,
                  make payments, and update your profile settings.
                </p>
                <div className="bTn">
                  <Link className="site_btn" href="/">
                    Book an Appointment
                  </Link>
                  <Link className="site_btn white" href="/">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="image">
                <img src="images/dr.png"></img>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
        <Team_info onClose={handleClosePopup} />
      </Popup>
    </div>
  );
}
