import React, { useRef } from "react";
import Link from "next/link";
import LayoutDashboard from "@/components/components/layoutDashbord";

export default function Profile_settings() {
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
            <div className="flex">
              <div className="col">
                <div className="inner sp">
                  <h3>Profile Settings</h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="create_request">
          <div className="contain">
            <div className="bulk outer">
              <form>
                <h3>Profile Information</h3>
                <div className="form_blk">
                  <div className="flex upl ddp">
                    <div className="image">
                      <img src="/images/ddp.png"></img>
                    </div>
                    <div className="text">
                      <label htmlFor="file-upload">
                        <img src="/images/upload.png" alt="Upload Image" />
                        <p>Upload now</p>
                      </label>
                      <input
                        type="file"
                        id="file-upload"
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xs-12 head">
                  <h3>Basic information</h3>
                </div>
                <div className="flex">
                  <div className="form_blk col-xs-6">
                    <label>First Name</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Last Name</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Email</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Phone</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-12">
                    <label>Address</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      placeholder="Sydney Olympic Park"
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Preferred Pharmacy</label>
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option value="">PureWell Pharmacy</option>
                    </select>
                  </div>
                  <div className="col-xs-12 head">
                    <h3>Other information</h3>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Gender</label>
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option value="">Male</option>
                      <option value="">Female</option>
                    </select>
                  </div>
                  <div className="form_blk col-xs-12">
                    <label>Allergies</label>
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
                  <div className="form_blk col-xs-12">
                    <label>Surgical History</label>
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
                  <div className="form_blk col-xs-6">
                    <label>Pregnancy Status</label>
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option value="">Not Pregnant</option>
                      <option value="">Pregnant</option>
                    </select>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Smoking History</label>
                    <select
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required>
                      <option value="">Former Smoker</option>
                    </select>
                  </div>

                  <div className="col-xs-12 head">
                    <h3>
                      Upload Photo Identification (Drivers License, State ID, or
                      Passport)
                    </h3>
                  </div>

                  <div className="form_blk">
                    <div className="flex upl">
                      <div className="image">
                        <img src="/images/cnic.png"></img>
                      </div>
                      <div className="text">
                        <label htmlFor="file-upload">
                          <img src="/images/upload.png" alt="Upload Image" />
                          <p>Upload now</p>
                        </label>
                        <input
                          type="file"
                          id="file-upload"
                          style={{ display: "none" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 head">
                    <h3>Update Password</h3>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Current Password</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>New Password</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                  <div className="form_blk col-xs-6">
                    <label>Repeat Password</label>
                    <input
                      id=""
                      type=""
                      name=""
                      autoComplete=""
                      className="input"
                      required></input>
                  </div>
                </div>
                <div className="btn_blk">
                  <Link href="" className="site_btn green">
                    Update Information
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
Profile_settings.getLayout = function (page) {
  return <LayoutDashboard>{page}</LayoutDashboard>;
};
