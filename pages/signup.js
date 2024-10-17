import React, { useState } from "react";
import Link from "next/link";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { saveSignupQuery } from "../redux/reducers/auth";

import { useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IsFormProcessingSpinner from "../components/isFormProcessingSpinner";
import { parse } from "cookie";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const cookieHeader = req.headers.cookie || '';
  const cookieValue = parse(cookieHeader);
  const authToken = cookieValue['authToken'] !== undefined && cookieValue['authToken'] !== null && cookieValue['authToken'] !== '' ? cookieValue['authToken'] : null;
  if (authToken !== null) {
      return {
          redirect: {
              destination: '/dashboard',
              permanent: false,
          },
      };
  }

  const result = await http
    .post("signup-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};
export default function Signup({result}) {
  const[pass,setPass] = useState(false);
  const[confirmPass,setConfirmPass] = useState(false);
  const {content,page_title,site_settings}=result

  const dispatch = useDispatch();
  const isFormProcessing = useSelector(state => state.auth.isFormProcessing);
  const handleSaveForm = (formData) => {
      if (formData?.type === undefined || formData?.type === null || formData?.type === '') {
          formData = { ...formData, type: "normal" }
      }

      dispatch(saveSignupQuery(formData));
  };
  const {
    register,
    watch,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    reset,
} = useForm();

  return (
    <>
    <MetaGenerator page_title={page_title + " - " + site_settings?.site_name} site_settings={site_settings} meta_info={content} />
      <main>
        <div className="contain">
          <div className="login_header">
            <div className="logon_logo">
              <Link href="/">
              <img src={cmsFileUrl(site_settings?.site_logo, 'images')} alt={site_settings?.site_name} />
              </Link>
            </div>
            <div className="btn_blk">
              <p>
                Already have an account?{" "}
                <Link href="/login" className="strong">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>

        <section id="login">
          <div className="contain">
            <div className="outer">
              <Text string={content?.banner_text} />

              <form onSubmit={handleSubmit(handleSaveForm)}>
                <div className="form_blk">
                  <label>Name</label>
                  <input
                    id="full_name"
                    type=""
                    autoComplete="name"
                    name="name"
                    placeholder="Full name"
                    className="input"
                    {...register("name", {
                      pattern: {
                          value: /^[a-zA-Z][a-zA-Z ]*$/,
                          message: 'Invalid Value!',
                      },
                      validate: {
                          atLeastTwoWords: value => {
                              const words = value.split(' ').filter(word => word !== '');
                              return words.length >= 2 || 'Please enter full name';
                          }
                      },
                      required: 'Required'
                  })}
                  />
                  <ErrorMessage
                        errors={errors}
                        name="name"
                        render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                    />
                </div>
                <div className="form_blk">
                  <label>Email</label>
                  <input
                    id="frm-email"
                    type="email"
                    name="email"
                    autoComplete="name"
                    placeholder="hi@example.com"
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
                <div className="form_blk">
                  <label>Password</label>
                  <input
                    id="frm-password"
                    type={pass ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="input"
                    {...register("password", {
                        required: 'Required', pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]{8,}$/,
                            message: 'Password must contain at least 8 characters, including minimum one lowercase letter, one uppercase letter and one digit.'
                        }
                    })}
                  />
                  {
                    pass ? 
                    <img className="eye" src="images/eye-slash.svg" onClick={() => setPass(false)}/>
                    :
                    <img className="eye" src="images/eye.svg" onClick={() => setPass(true)}/>
                  }
                </div>
                <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                  />
                <div className="form_blk">
                  <label>Confirm Password</label>
                  <input
                    id="frm-password"
                    name="confirm_password"
                    type={confirmPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="input"
                    {...register("confirm_password", {
                        required: 'Required',
                        validate: (val) => {
                            if (watch('password') != val) {
                                return 'Your passwords do not match';
                            }
                        },
                    })}
                  />
                  {
                    confirmPass ? 
                    <img className="eye" src="images/eye-slash.svg" onClick={() => setConfirmPass(false)} />
                    :
                    <img className="eye" src="images/eye.svg" onClick={() => setConfirmPass(true)}/>
                  }
                </div>
                <ErrorMessage
                    errors={errors}
                    name="confirm_password"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
                <div className="have_check form_blk">
                  <div className="lbl_btn">
                    <input type="checkbox" name="confirm" id="remember" {...register("confirm", { required: 'Required' })}/>
                    <label htmlFor="remember">
                      By creating an account you confirm that you agree to our
                      website <Link href="privacy_policy" target="_blank">privacy notice</Link>.
                    </label>
                  </div>
                  <ErrorMessage
                    errors={errors}
                    name="confirm"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
                </div>
                <div className="btn_blk">
                  <button className="site_btn block" disabled={isFormProcessing}
                >Signup <IsFormProcessingSpinner isProcessing={isFormProcessing} /></button>
                </div>
                {/* <div className="btn_blk">
                  <button className="site_btn white block">
                    <img src="images/google.svg"></img> Signup with Google
                  </button>
                </div> */}
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
