import React, { useEffect, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

import { useSelector, useDispatch } from 'react-redux';
import { fetchMemberData, verifyOtp, resendOtpCode } from "@/components/redux/reducers/user";
import { useRouter } from "next/router";
import IsFormProcessingSpinner from "@/components/components/isFormProcessingSpinner";
import Timer from "@/components/components/timer";
import MetaGenerator from "@/components/components/meta-generator";
import ReactInputCode from 'react-input-code';
import toast from "react-hot-toast";

export default function EmailVerification() {

    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        dispatch(fetchMemberData())
    }, []);
    const memberRow = useSelector(state => state.user.member);
    const isFormProcessing = useSelector(state => state.user.isFormProcessing);
    const isResendFormProcessing = useSelector(state => state.user.isResendFormProcessing);
    const expire_time = useSelector(state => state.user.expire_time);
    const site_settings = useSelector(state => state.user.site_settings);
    console.log(expire_time)
    useEffect(() => {
        if (parseInt(memberRow?.mem_verified) === 1) {
            router.push('/dashboard'); return;
        }
    }, [memberRow]);
    const [OTP, setOTP] = useState("");
    const handleOTPChange = (code) => setOTP(code);
    const handleVerifySubmit = async (e) => {
        e.preventDefault();
        if (OTP === '') {
            toast.error("please enter OTP to continue!!")
        }
        else {
            let newData = { otp: OTP }
            dispatch(verifyOtp(newData));

        }
    };
    async function handleResendOtpCode(e) {
        e.preventDefault();
        setOTP("")
        let newData = { type: 'normal' }
        dispatch(resendOtpCode(newData));
    }


  return (
    <>
    <MetaGenerator page_title={"Email Verification - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="cntnt verify_mail">
                <h5>You are almost there! We sent an email to <a href={"mailto:" + memberRow?.mem_email}>{memberRow?.mem_email}</a>. </h5>
                <p>A verification email has been sent to your email address. Please enter the code below to verify your email address.</p>
                <form action="" method="POST" onSubmit={handleVerifySubmit}>
                    <div className="txtGrp">
                        <h6>Please enter the code below to verify your email address.</h6>

                        <div className="otp_fields">
                            <ReactInputCode
                                value={OTP}
                                onChange={handleOTPChange}
                                type="text"
                                className="my-input-code"
                                itemClassName="my-code-item"
                                nItems={6}
                                autoFocus={true}
                                placeholder={''}
                                disabled={false} />
                        </div>
                    </div>
                    {
                        expire_time !== null && expire_time !== undefined ?
                            <div className="txtGrp">
                                <Timer deadline={expire_time} />
                            </div>
                            :
                            ""
                    }
                    <div className="btn_blk text-center">
                        <button type="button" className="site_btn color" disabled={isResendFormProcessing} onClick={handleResendOtpCode}>
                            Resend
                            <IsFormProcessingSpinner isProcessing={isResendFormProcessing} />
                        </button>
                        <button type="submit" className="site_btn" disabled={isFormProcessing}>
                            Verify
                            <IsFormProcessingSpinner isProcessing={isFormProcessing} />
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
EmailVerification.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
