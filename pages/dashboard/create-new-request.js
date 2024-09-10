import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Create_new_request() {
  const fileInputRef = useRef(null);
  const fileDpRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleDpClick = () => {
    fileDpRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    }
  };
  const handleDpSelected = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
    }
  };
  return (
    <>
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
