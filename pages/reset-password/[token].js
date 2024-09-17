import React, { useState } from "react";
import Link from "next/link";
import http from "../../helpers/http";
import { doObjToFormData , cmsFileUrl} from "../../helpers/helpers";
import MetaGenerator from "../../components/meta-generator";
import Text from "../../components/text";
import { useRouter } from "next/router";
import { postReset } from "@/components/redux/reducers/auth";
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { useSelector, useDispatch } from "react-redux";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import { parse } from "cookie";

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { token } = context.query;
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
    .post("reset-password-page", doObjToFormData({ token: token }))
    .then((response) => response.data)
    .catch((error) => error.response.data.message);

  return { props: { result } };
};
export default function Reset_password({result}) {
  const[pass,setPass] = useState(false);
  const[confirmPass,setConfirmPass] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const {content,page_title,site_settings}=result

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    reset
  } = useForm();
  const watchAllFields = watch();
  const dispatch = useDispatch();
  const handleForgot = (formData) => {
    let newFormData = { ...formData, token: token };
    dispatch(postReset(newFormData));
  };
  const isFormProcessing = useSelector(state => state.auth.isFormProcessing);

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

              <form  method="POST" onSubmit={handleSubmit(handleForgot)}>
                <div className="form_blk">
                  <label>New Password</label>
                  <input
                   type={pass ? "text" : "password"}
                    autoComplete="name"
                    placeholder="Enter new password"
                    className="input"
                    {...register("password", {
                      required: 'Required', pattern: {
                          value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z0-9\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\>\=\?\@\[\]\{\}\\\\\^\_\`\~]{8,}$/,
                          message: 'The password should contain at least 8 characters, that contain at least one lowercase letter, one uppercase letter and one numeric digit.'
                      }
                  })}
                  />
                  {
                    pass ? 
                    <img className="eye" src="/images/eye-slash.svg" onClick={() => setPass(false)}/>
                    :
                    <img className="eye" src="/images/eye.svg" onClick={() => setPass(true)}/>
                  }
                  <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                  />
                </div>
                <div className="form_blk">
                  <label>Confirm New Password</label>
                  <input
                    placeholder="Confirm new password"
                    className="input"
                    type={confirmPass ? "text" : "password"}
                    {...register("confirm_password", {
                      required: 'Required',
                      validate: (val) => {
                          if (watch('password') != val) {
                              return 'Your passwords do no match';
                          }
                      },
                  })}
                  />
                  {
                    confirmPass ? 
                    <img className="eye" src="/images/eye-slash.svg" onClick={() => setConfirmPass(false)} />
                    :
                    <img className="eye" src="/images/eye.svg" onClick={() => setConfirmPass(true)}/>
                  }
                  
                </div>
                <ErrorMessage
                      errors={errors}
                      name="confirm_password"
                      render={({ message }) => <p className='error'><i className="warning"></i> {message}</p>}
                  />
                <div className="btn_blk">
                  <button type="submit" className="site_btn block" disabled={isFormProcessing}>Reset Password <IsFormProcessingSpinner isProcessing={isFormProcessing} /></button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
