import React, { useState } from "react";
import Link from "next/link";
import http from "../helpers/http";
import { doObjToFormData, generateContentArray, short_text } from "../helpers/helpers";
import MetaGenerator from "../components/meta-generator";
import Text from "../components/text";
import { cmsFileUrl} from "../helpers/helpers";
import Image from "next/image";
import IsFormProcessingSpinner from "../components/isFormProcessingSpinner";
import { useSelector, useDispatch } from 'react-redux';
import { saveLoginQuery } from "../redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import IsPAgeLoadingSec from "../components/isPAgeLoadingSec";

export const getServerSideProps = async (context) => {
  
  const result = await http
    .post("login-page", doObjToFormData({ token: "" }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};

export default function Login({result}) {
  const {content,page_title,site_settings}=result

  const router=useRouter()
  const {query}=router;
  const prev_ul=query?.from
  const [accessToken, setAccessToken] = useState('');
  const[confirmPass,setConfirmPass] = useState(false);

  const isFormProcessing = useSelector(state => state.auth.isFormProcessing);
    const dispatch = useDispatch();

    const handleLoginForm = (formData) => {
        formData = { ...formData, type: "normal"}
        dispatch(saveLoginQuery(formData));
    };
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit,
        setValue,
        reset
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
                Don’t have an account?{" "}
                <Link href="/signup" className="strong">
                  Get started today
                </Link>
              </p>
            </div>
          </div>
        </div>

        <section id="login">
          <div className="contain">
            <div className="outer">
              <Text string={content?.banner_text} />
              <Toaster position="bottom-right" />
              <IsPAgeLoadingSec isProcessing={isFormProcessing} text={"Please wait..."} />
              <form method="POST" onSubmit={handleSubmit(handleLoginForm)}>
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
                    type={confirmPass ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    className="input"
                    {...register("password", {
                      required: 'Required'
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
                    name="password"
                    render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                />
                <div className="form_blk blk_link">
                  <Link className="link" href="/forget_password">
                    Forgot Password?
                  </Link>
                </div>
                <div className="btn_blk">
                  <button className="site_btn block" disabled={isFormProcessing}>Login <IsFormProcessingSpinner isProcessing={isFormProcessing} /></button>
                </div>
                <div className="btn_blk">
                  <button className="site_btn white block">
                    <img src="images/google.svg"></img> Continue with Google
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
