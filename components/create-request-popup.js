import React from "react";
import Link from "next/link";

export default function Create_Request_info() {
  return (
    <div className="request-popup">
      <h4>Please confirm your address and preferred pharmacy</h4>
      <form>
        <div className="form_blk">
          <label>Address</label>
          <input
            id=""
            type=""
            name=""
            autoComplete=""
            placeholder="Sydney Olympic Park"
            className="input"
            required
          />
        </div>
        <div className="form_blk ">
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
        <div className="btn_blk">
          <Link href="" className="site_btn green">
            Confirm
          </Link>
        </div>
      </form>
    </div>
  );
}
