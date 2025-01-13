import React from "react";
import Link from "next/link";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";
import Text from "./text";
const OwlCarousel = dynamic(import("react-owl-carousel"), { ssr: false });

export default function Testimonials({ data }) {
  const testiSlider = {
    autoplay: true,
    loop: true,
    dots: true,
    nav: false,
    navText: [
      '<img src="/images/arrow-left.svg" />',
      '<img src="/images/arrow-right.svg" />',
    ],
    smartSpeed: 1000,
    responsiveClass: true,
    margin: 0,
    responsive: {
      0: {
        items: 1,
      },
      580: {
        items: 1,
      },
      991: {
        items: 1,
      },
      1200: {
        items: 1,
      },
      1600: {
        items: 1,
      },
    },
  };

  return (
    <>
      <OwlCarousel className="owl-carousel owl-theme" {...testiSlider}>
        {data.map((val) => {
          return (
            <div className="item" key={val.id}>
              <div className="inner">
                <div className="quotes">
                  <img src="images/quotes.svg"></img>
                </div>
                <Text string={val?.message} />
                <div className="testi_footer">
                  <h5>{val.name}</h5>
                  <h6>{val.designation}</h6>
                </div>
              </div>
            </div>
          );
        })}
      </OwlCarousel>
    </>
  );
}
