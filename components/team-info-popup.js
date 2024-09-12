import React from "react";
import Text from "./text";
import { cmsFileUrl } from "../helpers/helpers";
import Image from "next/image";

export default function Team_info({teamMember, onClose}) {
  if (!teamMember) return null;
  return (
    <div className="team_info">
      <div className="flex">
        <div className="col">
          <div className="image">
            <img src={cmsFileUrl(teamMember?.image, 'team',true)} alt={teamMember?.name}/>
          </div>
        </div>
        <div className="colr">
          <h4>{teamMember.name}</h4>
          <h5 className="red_heading">{teamMember.designation}</h5>
          <Text string={teamMember?.description} />
        </div>
      </div>
    </div>
  );
}
