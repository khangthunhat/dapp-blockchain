// import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
// import { Badge } from "react-bootstrap";
import { ETHER } from "../../constants";
import { useApplicationContext } from "../../context/applicationContext";
import { usePoolContext } from "../../context/poolContext";
import { utils } from "../../utils";
import { TimestampToDateTime, getValidImageUrl, daysDifference } from "../../utils/utils";
import SocialMediaModal from "../Modal/socialmediaModal";
import InfoLine from "../Utils/infoLine";
import YouTubeEmbed from "./youtube";
// import TokenInfo from "./tokenInfo";

const PoolInfoRenderer = (props) => {
  const { idoAddress } = props;
  const [image, setImage] = useState(null);

  // const { library } = useWeb3React();
  const {
    baseCurrencySymbol,
    networkExplorer,
    domainSettings: {
      ipfsInfuraDedicatedGateway
    }
  } = useApplicationContext();

  const poolContext = usePoolContext();

  let idoInfo = poolContext.allPools[idoAddress];
  // console.log("idoInfo===",idoInfo)
  useEffect(() => {
    if (idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash) {
      setImage(getValidImageUrl(idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash, ipfsInfuraDedicatedGateway));
    }
  }, [idoInfo, idoInfo.metadata.image, idoInfo.metadata.imageHash, ipfsInfuraDedicatedGateway]);


  // console.log('idoInfo: ', idoInfo);

  if (!utils.isValidPool(idoInfo)) {
    console.log(idoInfo);
    return null;
  }

  const startDate = new Date(parseInt(idoInfo.start) * 1000);
  const endDate = new Date(parseInt(idoInfo.end) * 1000);
  const claimDate = new Date(parseInt(idoInfo.claim) * 1000);

  const isAddLiquidityEnabled = idoInfo.listingRate > 0 && idoInfo.lpPercentage > 0;

  const weiToBigNumber = (weiValue) => {
    const weiBN = new BigNumber(weiValue);
    const etherValue = weiBN.dividedBy(new BigNumber(10).exponentiatedBy(18));
    return etherValue;
  }

  return (
    <>
      <div className="bg-[var(--card)] rounded-lg p-4 shadow">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/6 mb-4 md:mb-0 md:mr-4">
            {/* Profile Picture */}
            <img
              src={image}
              alt="Profile Picture"
              className="w-full h-auto rounded-full"
            />
          </div>
          <div className="w-full md:w-5/6">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-2">{idoInfo.tokenName}</h2>
              </div>
              <div className="flex w-full md:w-1/3 justify-end">
                {/* <span className="bg-green-500 text-white px-2 py-1 rounded-full">Online</span> */}

                {parseInt(idoInfo.end) < parseInt(Date.now() / 1000) ? (
                  // <Badge bg="secondary">Ended</Badge>
                  <span className="h-[35px] px-2 py-1 bg-[black] text-[12px] text-[#ff3465] font-semibold rounded-md">Ended</span>

                ) : parseInt(idoInfo.start) < parseInt(Date.now() / 1000) ? (
                  // <Badge bg="success">Started</Badge>
                  <span className="h-[35px] px-2 py-1 bg-[var(--success)] text-[12px] font-semibold rounded-md">Sale Live</span>

                ) : (
                  // <Badge bg="secondary">Not started</Badge>
                  <span className="h-[35px] px-2 py-1 bg-[var(--info)] text-[12px] font-semibold rounded-md">
                    Upcoming
                  </span>
                )}

              </div>
            </div>

            <div>
              <SocialMediaModal
                website={idoInfo.metadata.links.website}
                discord={idoInfo.metadata.links.discord}
                telegram={idoInfo.metadata.links.telegram}
                twitter={idoInfo.metadata.links.twitter}
                reddit={idoInfo.metadata.links.reddit}
                facebook={idoInfo.metadata.links.facebook}
                github={idoInfo.metadata.links.github}
              />
            </div>

            {
              idoInfo.metadata.links.youtube && <div className="flex items-center justify-center my-3">
                <YouTubeEmbed videoUrl={idoInfo.metadata.links.youtube} />
              </div>
            }


            <div className="text-[13px]">
              {idoInfo.metadata.description}
            </div>
          </div>
        </div>

        <div className='mt-2' />
        <InfoLine title="IDO pool address" content={idoAddress} url={networkExplorer + '/address/' + idoAddress} />

        <InfoLine title="Token Name" content={idoInfo.tokenName} />

        <InfoLine title="Token Symbol" content={idoInfo.tokenSymbol} />

        <InfoLine title="Token Decimals" content={idoInfo.tokenDecimals} />

        <InfoLine title="Total Supply" content={BigNumber(idoInfo.totalSupply)
          .dividedBy(10 ** parseInt(idoInfo.tokenDecimals))
          .toFormat() + ' ' + idoInfo.tokenSymbol} />

        <InfoLine title="Token Address" content={idoInfo.tokenAddress} url={networkExplorer + '/address/' + idoInfo.tokenAddress} />

        <InfoLine title="Token rate" content={`${ETHER.div(idoInfo.tokenRate).toFixed(0)} ${idoInfo.tokenSymbol}/${baseCurrencySymbol}`} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 my-1 justify-center">
          <div className="flex items-center justify-center ">
            <div className="text-center">
              <div className='text-[14px]'>Soft Cap</div>
              <div className="text-[14px] font-semibold text-[var(--info)]">
                {weiToBigNumber(idoInfo.softCap) + " " + baseCurrencySymbol}
              </div>
            </div>

          </div>
          <div className="flex items-center justify-center text-[14px]">
            <div className="text-center">
              <div className='text-[14px]'>Hard Cap</div>
              <div className="text-[14px] font-semibold text-[var(--info)]">
                {weiToBigNumber(idoInfo.hardCap) + " " + baseCurrencySymbol}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center text-[14px]">
            <div className="text-center">
              <div className='text-[14px]'>Minimum Buy</div>
              <div className="text-[14px] font-semibold text-[var(--info)]">
                {weiToBigNumber(idoInfo.min) + " " + baseCurrencySymbol}

              </div>
            </div>

          </div>
          <div className="flex items-center justify-center text-[14px]">
            <div className="text-center">
              <div className='text-[14px]'>Maximum Buy</div>
              <div className="text-[14px] font-semibold text-[var(--info)]">
                {weiToBigNumber(idoInfo.max) + " " + baseCurrencySymbol}
              </div>
            </div>
          </div>

        </div>
        <hr />

        {isAddLiquidityEnabled && <>
          <InfoLine title="Listing rate" content={`${ETHER.div(idoInfo.listingRate).toFixed(0)} ${idoInfo.tokenSymbol}/${baseCurrencySymbol}`} />
          <InfoLine title="Liquidity Percent" content={idoInfo.lpPercentage/100 + "%"} />
        </>}
        { <>
          <InfoLine title="Vesting First Release %" content={`${idoInfo.percentClaimFisrtTime/100}%`} />
          <InfoLine title="Vesting From Second Release %" content={idoInfo.percentClaimfromSecondTime/100 + "%"} />
          <InfoLine title="Vesting Period" content={idoInfo.claimCycle + " day"} />
          <InfoLine title="Fee Option" content={idoInfo.feeOption == true?"2% ETH raised + 2% token sold":"5% ETH raised only"} />
        </>}
        <InfoLine title="Start time" content={TimestampToDateTime(idoInfo.start * 1000)} />

        <InfoLine title="End time" content={TimestampToDateTime(idoInfo.end * 1000)} />

        <InfoLine title="Lock LP until" content={TimestampToDateTime(idoInfo.claim * 1000) + ' (' + Math.floor(daysDifference(idoInfo.end, idoInfo.claim)) + ' days)'} />

      </div>
    </>

  );
};
export default PoolInfoRenderer;
