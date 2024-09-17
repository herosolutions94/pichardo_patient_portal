import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";
import MetaGenerator from "@/components/components/meta-generator";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/router";
import { fetchMemberData } from "@/components/redux/reducers/user";

export default function Create_new_request() {
  const router = useRouter();
  const { mem_address1, preferred_pharmacy } = router.query;

  const [address, setAddress] = useState("");
  const [pharmacy, setPharmacy] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setAddress(mem_address1);
      setPharmacy(preferred_pharmacy);
    }
  }, [router.isReady, mem_address1, preferred_pharmacy]);

  const site_settings = useSelector(state => state.user.site_settings);
  const memberRow = useSelector(state => state.user.member);
  return (
    <>
    <MetaGenerator page_title={"Create New Request - " + site_settings?.site_name} site_settings={site_settings} />
      <main className="dash">
        <section id="dashboard">
          <div className="contain">
            <div className="inner sp">
              <h3>Create Request</h3>
            </div>
          </div>
        </section>

        <section id="create_request">
          <div className="contain">
            <div className="bulk outer">
              <form>
                <div className="form_blk col-xs-6">
                  <label>Subject</label>
                  <select
                    id=""
                    type=""
                    name=""
                    autoComplete=""
                    className="input"
                    required>
                    <option value="">Choose Subject</option>
                  </select>
                </div>
                <div className="form_blk">
                  <label>Symptoms</label>
                  <textarea
                    id=""
                    type=""
                    name=""
                    autoComplete=""
                    placeholder=""
                    className="input"
                    required
                  />
                </div>
                <div className="form_blk">
                  <label>Requested Medication</label>
                  <input
                    id=""
                    type=""
                    name=""
                    autoComplete=""
                    placeholder=""
                    className="input"
                    required
                  />
                </div>
                <div className="form_blk">
                  <div className="input up_banner">
                    <label htmlFor="file-upload">
                      <img src="/images/upload.png" alt="Upload Image" />
                      <p>Upload your document</p>
                    </label>
                    <input
                      type="file"
                      id="file-upload"
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
                <div className="btn_blk">
                  <Link href="" className="site_btn green">
                    Submit
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
Create_new_request.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
