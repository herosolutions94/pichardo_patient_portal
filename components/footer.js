import Link from "next/link";
import React from "react";

export default function Footer() {
  const data = {
    list_02: [
      {
        id: 1,
        text: "Home",
        link: "/",
      },
      {
        id: 2,
        text: "About Us",
        link: "/about",
      },
      {
        id: 3,
        text: "Services",
        link: "/",
      },
      {
        id: 4,
        text: "Contact Us",
        link: "/contact",
      },
    ],
    list_03: [
      {
        id: 1,
        text: "My Account",
        link: "/",
      },
      {
        id: 3,
        text: "My Account",
        link: "/",
      },
      {
        id: 4,
        text: "Terms & Conditions",
        link: "/terms-conditions",
      },
    ],
  };
  return (
    <footer>
      <div className="contain">
        <div className="flex_row main_row row">
          <div className="col-lg">
            <div className="in_col">
              <h4>Company</h4>
              {/* <ul className="lst contact_lst">
                <li>
                  <Link href="tel:347-919-5222">
                    <img src="/images/phone.svg" alt="" />
                    <span>347-919-5222</span>
                  </Link>
                </li>
                <li>
                  <Link href="mailto:contact@info.com">
                    <img src="/images/email.svg" alt="" />
                    <span>contact@info.com</span>
                  </Link>
                </li>
              </ul> */}
              <p>Manage your health online with our secure patient portal.</p>
              <div className="social_logon">
                <Link href="/" target="_blank" rel="noreferrer">
                  <img src="/images/Facebook.svg" alt="" />
                </Link>
                <Link href="/" target="_blank" rel="noreferrer">
                  <img src="/images/Instagram.svg" alt="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg mid_col">
            <div className="in_col">
              <h4>Short Links</h4>
              <ul className="list">
                {data.list_02.map((val) => {
                  return (
                    <li key={val.id}>
                      <Link href={val.link}>{val.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-lg mid_col">
            <div className="in_col">
              <h4>Other Links</h4>
              <ul className="list">
                {data.list_03.map((val) => {
                  return (
                    <li key={val.id}>
                      <Link href={val.link}>{val.text}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="in_col">
              <h4>Join Our Mailing List</h4>
              <div className="subscribe">
                <p>Stay up to date with the latest news and deals!</p>
                <form>
                  <input
                    type="text"
                    className="input"
                    name=""
                    placeholder={"@ email address"}
                  />
                  <button className="site_btn green" type="submit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p className="text-center">
            © 2023 By Pichardo Medical All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
