import React from "react";
import Link from "next/link";

export default function Service() {
  return (
    <div>
      <main>
        <section
          id="smbanner"
          style={{
            backgroundImage: 'url("/images/serbg.png")',
          }}>
          <div className="contain">
            <div className="content_center">
              <h1>Medical Services</h1>
              <p>
                Every single journey of your life starts with a healthy mind and
                a healthy journey
              </p>
            </div>
          </div>
        </section>

        <section id="ser_pg" className="pb">
          <div className="contain">
            <div className="flex">
              <div className="coll">
                <div className="image">
                  <img src="images/sp1.png"></img>
                </div>
                <div className="text">
                  <h3>General Medical Care</h3>
                  <p>
                    If you find yourself in a bind and cannot see your regular
                    provider or just moved, we can help! We can refill routine
                    medications, update labs, or care for your minor urgent
                    illnesses that arise and need more immediate attention.
                  </p>
                </div>
              </div>
              <div className="coll">
                <div className="image">
                  <img src="images/sp2.png"></img>
                </div>
                <div className="text">
                  <h3>Travel Preparation</h3>
                  <p>
                    We would love to help you prepare for your next adventure.
                    Whether you need patches to prevent motion sickness,
                    medication to combat altitude sickness or medications, such
                    as malaria prevention, to prepare for travel out of the
                    country.
                  </p>
                </div>
              </div>
              <div className="coll">
                <div className="image">
                  <img src="images/sp3.png"></img>
                </div>
                <div className="text">
                  <h3>Weight Loss Consults</h3>
                  <p>
                    We would be happy to answer any questions you have about
                    utilizing compounded Semaglutide or Tirzepatide. These
                    medications are made with B12 and mailed to your home.
                  </p>
                </div>
              </div>
              <div className="coll">
                <div className="image">
                  <img src="images/sp4.png"></img>
                </div>
                <div className="text">
                  <h3>Lab Request</h3>
                  <p>
                    We are here to make getting lab tests done easier! Saving
                    you the hassle of going to your general provider to get
                    routine labs done. Whether it is an MRI or a blood test, we
                    can send those requests in for you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="image">
                  <img src="/images/trusted.png"></img>
                </div>
              </div>
              <div className="colr">
                <h2>Trusted referrals and online services</h2>
                <p>
                  We provide trusted referrals to help you find the best local
                  services, such as labs and blood work, ensuring you receive
                  top-quality care. Our online services are designed to support
                  you every step of the way, offering convenience and peace of
                  mind.
                </p>
                <div className="btn_blk">
                  <Link href="" className="site_btn">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="par_bg">
          <div className="contain">
            <div className="outer">
              <div className="text">
                <h2>Comprehensive Healthcare for Your Well-being</h2>
                <p>
                  At Pichardo Medical, we offer a wide range of healthcare
                  services to meet the needs of our patients. From routine
                  check-ups to specialized treatments, our experienced team is
                  here to provide exceptional care every step of the way.
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
            </div>
          </div>
        </section>

        <section id="whoweare" className="pb">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <h2>Comprehensive Healthcare Services</h2>
                <p>
                  We offer reliable recommendations to connect you with top
                  providers for essential services like lab work and blood
                  tests. Alongside our expert referrals, our online services are
                  designed to make accessing the care and information you need
                  as convenient as possible, no matter where you are.
                </p>
                <div className="btn_blk">
                  <Link href="" className="site_btn">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="colr">
                <div className="image">
                  <img src="/images/comp.png"></img>
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
    </div>
  );
}
