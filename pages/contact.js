import React, { useState } from "react";
import Link from "next/link";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl } from "../helpers/helpers";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import toast from "react-hot-toast";

export const getServerSideProps = async (context) => {

  const result = await http
    .post("contact-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};
export default function Contact({ result }) {

  const { content, page_title, site_settings } = result
  // console.log(result);
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
      .post("/save-contact-message", doObjToFormData({ ...frmData, services: JSON.stringify(frmData?.services) }))
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
  return (
    <>
      <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <section
          id="smbanner"
          style={{ background: `url(${cmsFileUrl(content?.image1)})` }}>
          <div className="contain">
            <div className="content_center">
              <Text string={content?.banner_text} />
            </div>
          </div>
        </section>

        <section id="cnt" className="pb">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <Text string={content?.section2_text} />
              </div>
              <div className="colr">
                <div className="flex">
                  {
                    site_settings?.site_phone ?
                      <div className="coll">
                        <Link href={"tel:" + site_settings?.site_phone} className="inner">
                          <div className="icon">
                            <img src="images/Phone.svg"></img>
                          </div>
                          <p>{site_settings?.site_phone}</p>
                        </Link>
                      </div>
                      :
                      ""
                  }

                  {
                    site_settings?.site_email ?

                      <div className="coll">
                        <Link href={"mailto:" + site_settings?.site_email} className="inner">
                          <div className="icon">
                            <img src="images/Envelope.svg"></img>
                          </div>
                          <p>{site_settings?.site_email}</p>
                        </Link>
                      </div>
                      :
                      ""
                  }
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cnt_form">
          <div className="contain">
            <div className="outer">
              <Text string={content?.section3_text} />

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                  <div className="form_blk">
                    <input
                      id="fname"
                      type="text"
                      name="fname"
                      placeholder="First Name"
                      className="input"
                      {...register("fname", {
                        pattern: {
                          value: /^[a-zA-Z][a-zA-Z ]*$/,
                          message: 'Invalid Value!',
                        },
                        required: 'Required'
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="fname"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="lname"
                      type="text"
                      name="lname"
                      autoComplete="name"
                      placeholder="Last Name"
                      className="input"
                      {...register("lname", {
                        pattern: {
                          value: /^[a-zA-Z][a-zA-Z ]*$/,
                          message: 'Invalid Value!',
                        },
                        required: 'Required'
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="lname"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="phone"
                      type="text"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Phone Number"
                      className="input"
                      {...register("phone", {
                        required: "Required", pattern: {
                          value: /^[0-9-]+$/,
                          message: "Phone format is not valid!"
                        }
                      })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="phone"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="tel"
                      placeholder="Email Address"
                      className="input"
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
                  <div className="form_blk col-xs-12">
                    <textarea
                      id="comments"
                      name="comments"
                      className="input"
                      placeholder="Enter Your Message Here" {...register("comments", { required: "Required" })}></textarea>
                    <ErrorMessage
                      errors={errors}
                      name="comments"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                    />
                  </div>
                  <div className="have_check form_blk">
                    <p>What services are you interested in?</p>
                    <div className="flx">
                      <div className="lbl_btn">
                        <input
                          type="checkbox"
                          id="semaglutide"
                          name="services"
                          {...register("services", { required: "Please select at least one service" })}
                          value="Semaglutide"
                        />
                        <label htmlFor="semaglutide">Semaglutide</label>
                      </div>
                      <div className="lbl_btn">
                        <input
                          type="checkbox"
                          id="tirzepatide"
                          name="services"
                          {...register("services", { required: "Please select at least one service" })}
                          value="Tirzepatide"
                        />
                        <label htmlFor="tirzepatide">Tirzepatide</label>
                      </div>
                      <div className="lbl_btn">
                        <input
                          type="checkbox"
                          id="other"
                          name="services"
                          {...register("services", { required: "Please select at least one service" })}
                          value="Other"
                        />
                        <label htmlFor="other">Other</label>
                      </div>
                    </div>
                    <ErrorMessage
                      errors={errors}
                      name="services"
                      render={({ message }) => (
                        <p className="error">
                          <i className="warning"></i> {message}
                        </p>
                      )}
                    />
                  </div>

                  <div className="form_blk col-xs-12">
                    <input
                      id="hear_about"
                      type="text"
                      name="hear_about"
                      placeholder="How did you hear about us?"
                      className="input"
                      {...register("hear_about", { required: "Required" })}
                    />
                    <ErrorMessage
                      errors={errors}
                      name="hear_about"
                      render={({ message }) => (
                        <p className="error">
                          <i className="warning"></i> {message}
                        </p>
                      )}
                    />
                  </div>
                  <div className="btn_blk">
                    <button type="submit" className="site_btn" disabled={isProcessing}>Send Message <IsFormProcessingSpinner isProcessing={isProcessing} />

                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
