import React, { useState } from "react";
import Link from "next/link";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });
import Testimonials from "../components/testimonials";

export default function Home() {
  const testi = [
    {
      id: "testi1",
      image: "/images/testi7.png",
      name: "Jane Doe",
      designation: "University of Tokyo",
      comment:
        "Pichardo Medical provided exceptional care and support during my treatment. Highly recommended! Pichardo Medical provided exceptional care and support during my treatment.",
    },
    {
      id: "testi2",
      image: "/images/testi9.png",
      name: "Maria Garcia",
      designation: "MIT",
      comment:
        "Pichardo Medical provided exceptional care and support during my treatment. Highly recommended! Pichardo Medical provided exceptional care and support during my treatment.",
    },
    {
      id: "testi3",
      image: "/images/testi8.webp",
      name: "John Desoza",
      designation: "CEO-Marketing Agnecy",
      comment:
        "Pichardo Medical provided exceptional care and support during my treatment. Highly recommended! Pichardo Medical provided exceptional care and support during my treatment.",
    },
  ];
  return (
    <>
      <main>
        <section id="banner">
          <div className="contain">
            <div className="text">
              <h1>Medical Care by Marlo Pichardo PA-C, MPAS</h1>
              <p>
                Providing quality healthcare services with compassion and care.
                Pichardo Medical is dedicated to providing top-notch healthcare
                services to our community. Our experienced team of professionals
                is here to ensure you receive the best care possible.
              </p>
              <div className="bTn">
                <Link className="site_btn" href="/">
                  Get Started
                </Link>
                <Link className="site_btn white" href="/">
                  Contact Us
                </Link>
              </div>
              <p>
                Licensed in : AZ, CA, CO, DE, FL, GA, ID, IL, MI, MT, ND, NY,
                OH, TN, UT, WI, WV, WY
              </p>
              <p>Pending licensure : NJ, NV</p>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="image">
                  <img src="/images/about.png"></img>
                </div>
              </div>
              <div className="colr">
                <h2>About Us</h2>
                <p>
                  Pichardo Medical is dedicated to providing top-notch
                  healthcare services to our community. Our experienced team of
                  professionals is here to ensure you receive the best care
                  possible. Pichardo Medical is dedicated to providing top-notch
                  healthcare services to our community.
                </p>
                <p>
                  Our experienced team of professionals is here to ensure you
                  receive the best care possible. Pichardo Medical is dedicated
                  to providing top-notch healthcare services to our community.
                  Our experienced team of professionals is here to ensure you
                  receive the best care possible. Pichardo Medical is dedicated
                  to providing top-notch healthcare services to our community.
                  Our experienced team of professionals is here to ensure you
                  receive the best care possible.
                </p>
                <div className="btn_blk">
                  <Link href="" className="site_btn">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features">
          <div className="contain">
            <div className="content_center">
              <h2>Our Features</h2>
              <p>
                Pichardo Medical is dedicated to providing top-notch healthcare
                services to our community. Our experienced team of professionals
                is here to ensure you receive the best care possible.
              </p>
            </div>
            <div className="flex">
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <img src="/images/f1.svg"></img>
                  </div>
                  <div className="text">
                    <h4>Online Appointments</h4>
                    <p>Book and manage your appointments online with ease.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <img src="/images/f2.svg"></img>
                  </div>
                  <div className="text">
                    <h4>Secure Portal</h4>
                    <p>
                      Access your medical records and communicate with your
                      doctor securely.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <img src="/images/f3.svg"></img>
                  </div>
                  <div className="text">
                    <h4>Telemedicine</h4>
                    <p>
                      Consult with our doctors from the comfort of your home.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="icon">
                    <img src="/images/f4.svg"></img>
                  </div>
                  <div className="text">
                    <h4>Quick Response</h4>
                    <p>Book and manage your appointments online with ease.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="whoweare">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <h2>Who We Are</h2>
                <p>
                  Pichardo Medical is committed to delivering exceptional
                  healthcare with a patient-centric approach. Our team of
                  dedicated medical professionals is here to provide
                  comprehensive and compassionate care. We believe in building
                  lasting relationships with our patients to support their
                  overall well-being.
                </p>
                <p>
                  Pichardo Medical is dedicated to providing top-notch
                  healthcare services to our community. Our experienced team of
                  professionals is here to ensure you receive the best care
                  possible. Pichardo Medical is dedicated to providing top-notch
                  healthcare services to our community.
                </p>
                <div className="btn_blk">
                  <Link href="" className="site_btn">
                    Read More
                  </Link>
                </div>
              </div>
              <div className="colr">
                <div className="image">
                  <img src="/images/who.png"></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="bg_sec">
          <div className="contain">
            <div className="content_center">
              <h2>Your Health, Our Priority</h2>
              <p>
                Join our community of satisfied patients. Experience top-quality
                healthcare tailored to your needs.
              </p>
            </div>
            <div className="bTn">
              <Link className="site_btn green" href="/">
                Book an Appointment
              </Link>
              <Link className="site_btn white" href="/">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        <section id="services">
          <div className="contain">
            <div className="txt_flx">
              <h2>What We Offer</h2>
              <p>
                Pichardo Medical is committed to delivering exceptional
                healthcare with a patient-centric approach. Our team of
                dedicated medical professionals is here to provide comprehensive
                and compassionate care. We believe in building lasting
                relationships with our patients to support their overall
                well-being.
              </p>
            </div>
            <div className="flex">
              <div className="col">
                <div className="inner">
                  <div className="image">
                    <img src="images/s1.png"></img>
                  </div>
                  <div className="text">
                    <h4>Personalized Care</h4>
                    <p>
                      Tailored healthcare services to meet your individual
                      needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="image">
                    <img src="images/s2.png"></img>
                  </div>
                  <div className="text">
                    <h4>Expert Team</h4>
                    <p>Experienced and compassionate medical professionals.</p>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="inner">
                  <div className="image">
                    <img src="images/s3.png"></img>
                  </div>
                  <div className="text">
                    <h4>Advanced Technology</h4>
                    <p>
                      State-of-the-art medical equipment for accurate
                      diagnostics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial_sec p0">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <div className="text">
                  <h2>What Our Patients Say</h2>
                  <p>
                    Manage your health online with our secure patient portal.
                    Access your dashboard, create tickets, view prescriptions,
                    make payments, and update your profile settings.
                  </p>
                </div>
                <Testimonials data={testi} />
              </div>
              <div className="colr">
                <div className="image">
                  <img src="/images/t1.png"></img>
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
    </>
  );
}
