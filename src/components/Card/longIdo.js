import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { usePoolContext } from "../../context/poolContext";
import { useApplicationContext } from "../../context/applicationContext";
import { getValidImageUrl } from "../../utils/utils";
import * as s from "../../styles/global";
import ProgressBar from "../Modal/ProgressBar";
import PoolCountdown from "../Utils/poolCountdown";

import imageSolid from "../../assets/images/image-solid.png"

const LongIdo = (props) => {
  const {
    domainSettings: {
      ipfsInfuraDedicatedGateway
    }
  } = useApplicationContext();
  const [image, setImage] = useState("");
  const { idoAddress } = props;

  const idoInfo = usePoolContext().allPools[idoAddress];

  useEffect(() => {
    if (idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash) {
      setImage(getValidImageUrl(idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash, ipfsInfuraDedicatedGateway));
    }
  }, [idoInfo, idoInfo.metadata.image, idoInfo.metadata.imageHash, ipfsInfuraDedicatedGateway]);

  if (!idoInfo) {
    return (
      <s.Card
        ai="center"
        style={{ maxWidth: 500, margin: 20, minWidth: 400 }}
      ></s.Card>
    );
  }

  return (
    <div>
      <NavLink
        to={"/launchpad/" + idoAddress}
        style={{
          textDecoration: "none",
          color: "white",
          width: "100%",
        }}
      >
        <div className="bg-[var(--card)] rounded-lg px-4 py-3 shadow">
          <div className="flex flex-col md:flex-row">
            <s.Container
              flex={3}
              fd={"row"}
              ai="center"
              style={{ flexWrap: "nowrap" }}
            >
              <img
                style={{ width: 70, height: 70, borderRadius: 50, borderColor: "white", borderWidth: 2}}
                src={image}
                onError={(e) => {
                  setImage(imageSolid);
                }}
              ></img>

              <s.Container flex={1} ai="flex-start" style={{ paddingLeft: 20 }}>
                <s.TextDescription>{idoInfo.tokenName}</s.TextDescription>
                <s.TextID>${idoInfo.tokenSymbol}</s.TextID>
              </s.Container>
            </s.Container>

            <s.Container flex={1} ai="flex-end">
              <div className="min-w-[200px]">
                <PoolCountdown start={idoInfo.start} end={idoInfo.end} showTitle={true} />
                <div className="mt-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-[14px]">Progress</span>
                    <span className="text-[14px]">{idoInfo.progress + "%"}</span>
                  </div>

                  <div className="relative h-1.5 rounded-full bg-gray-500 mt-1">
                    <div className="absolute left-0 top-0 h-full bg-[#48c774] rounded-full" style={{ width: idoInfo.progress + '%' }} ></div>
                  </div>
                </div>
              </div>

            </s.Container>
          </div>
        </div>

      </NavLink >
    </div >

  );
};
export default LongIdo;
