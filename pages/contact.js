import React from "react";
import Link from "next/link";

export default function Contact() {
  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data);
  }
  return (
    <div>
      <main>
        <section
          id="smbanner"
          style={{
            backgroundImage: 'url("/images/con_pg.png")',
          }}>
          <div className="contain">
            <div className="content_center">
              <h1>Medical Services</h1>
              <p>
                Every single journey of your life starts with a healthy mind and
                a healthy journey
              </p>
            </div>
          </div>
        </section>

        <section id="cnt" className="pb">
          <div className="contain">
            <div className="flex">
              <div className="col">
                <h2>Let’s discuss on something cool together</h2>
                <p>
                  For all medical inquiries, please fill out the form below to
                  get started and I will get back to you. If you want to jump
                  right in, <a href="">Create an Account</a> to Chat with a
                  Provider
                </p>
              </div>
              <div className="colr">
                <div className="flex">
                  <div className="coll">
                    <div className="inner">
                      <div className="icon">
                        <img src="images/Phone.svg"></img>
                      </div>
                      <p>+323-4321-3435</p>
                    </div>
                  </div>
                  <div className="coll">
                    <div className="inner">
                      <div className="icon">
                        <img src="images/Envelope.svg"></img>
                      </div>
                      <p>care@PichardoMedical.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cnt_form">
          <div className="contain">
            <div className="outer">
              <h2>Have a Quick Question?</h2>

              <form onSubmit={handleSubmit}>
                <div className="flex">
                  <div className="form_blk">
                    <input
                      id="frm-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="First Name"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Last Name"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-phone"
                      type="text"
                      name="phone"
                      autoComplete="tel"
                      placeholder="Phone Number"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk">
                    <input
                      id="frm-email"
                      type="email"
                      name="email"
                      autoComplete="tel"
                      placeholder="Email Address"
                      className="input"
                      required
                    />
                  </div>
                  <div className="form_blk col-xs-12">
                    <textarea
                      id="frm-message"
                      name="message"
                      className="input"
                      placeholder="Enter Your Message Here"></textarea>
                  </div>
                  <div className="have_check form_blk">
                    <p>What services are you interested in?</p>
                    <div className="flx">
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Semaglutide</label>
                      </div>
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Tirzepatide</label>
                      </div>
                      <div className="lbl_btn">
                        <input type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form_blk col-xs-12">
                    <input
                      id=""
                      type="text"
                      name=""
                      autoComplete=""
                      placeholder="How did you hear about us?"
                      className="input"
                      required
                    />
                  </div>
                  <div className="btn_blk">
                    <button type="submit" className="site_btn">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
