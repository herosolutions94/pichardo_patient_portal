import Link from "next/link";
import React, { useState } from "react";

import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import IsFormProcessingSpinner from "./isFormProcessingSpinner";
import toast from "react-hot-toast";

export default function Footer({siteSettings}) {
  const [isProcessing, setProcessingTo] = useState(false);
  
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
} = useForm();

const onSubmit = async (frmData) => {
  setProcessingTo(true);
  const response = await http
      .post("/save-newsletter", doObjToFormData({...frmData}))
      .then((response) => response.data)
      .catch((error) => error);
  setProcessingTo(false);
  if (response?.status) {
      toast.success(response?.msg)
      setTimeout(() => {
        reset()
      }, 2000);
  }
  else {
      toast.error(response?.msg)
  }
}

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
        link: "/service",
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
        link: "/login",
      },
      {
        id: 3,
        text: "Privacy Policy",
        link: "/privacy_policy",
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
              <p>{siteSettings?.site_about}</p>
              <div className="social_logon">
                {
                    siteSettings?.site_facebook ?
                    <Link href={siteSettings?.site_facebook} target="_blank" rel="noreferrer">
                      <img src="/images/Facebook.svg" alt="" />
                    </Link>
                    :
                    ""
                }
                {
                    siteSettings?.site_instagram ?
                      <Link href={siteSettings?.site_instagram} target="_blank" rel="noreferrer">
                        <img src="/images/Instagram.svg" alt="" />
                      </Link>
                      :
                      ""
                  }
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="foot_relative">
                    <input
                      type="text"
                      className="input"
                      name="email"
                      placeholder={"@ email address"}
                      {...register("email", {
                        required: 'Required', pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
                            message: 'Invalid Email Format'
                        }
                    })}
                    />
                    <ErrorMessage
                          errors={errors}
                          name="email"
                          render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                      />
                  </div>
                  <button className="site_btn green" type="submit" disabled={isProcessing}>
                  <IsFormProcessingSpinner isProcessing={isProcessing} />
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p className="text-center">
            {siteSettings?.site_copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
