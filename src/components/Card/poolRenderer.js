import BigNumber from "bignumber.js";
import React, { useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { daysDifference, getValidImageUrl } from "../../utils/utils";
import { ETHER } from "../../constants"
// import imageSolid from "../../assets/images/image-solid.png"
import { useApplicationContext } from "../../context/applicationContext";
import { convertWeiToEth } from "../../utils/utils";

const PoolRenderer = (props) => {
  const contract = useSelector((state) => state.contract);
  const [image, setImage] = useState("");
  const [imageExists, setImageExists] = useState(true);

  const handleImageError = () => {
    setImageExists(false);
  };

  const {
    pool: idoInfo,
    pool: {
      start,
      end,
      metadata,
      idoAddress,
      tokenName,
      tokenSymbol,
      softCap,
      hardCap,
      tokenRate,
      progress,
      totalInvestedETH,
      listingRate,
      lpPercentage,
      claim,
    }
  } = props;

  const {
    baseCurrencySymbol,
    domainSettings: {
      ipfsInfuraDedicatedGateway
    },
  } = useApplicationContext();

  const card = useRef(null);

  const isStarted = parseInt(start) < (parseInt(Date.now() / 1000));
  const hasEnded = parseInt(end) < (parseInt(Date.now() / 1000));

  const formatTwoDigits = (number) => {
    return String(number).padStart(2, '0');
  }

  useEffect(() => {
    if (idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash) {
      setImage(getValidImageUrl(idoInfo?.metadata?.image || idoInfo?.metadata?.imageHash, ipfsInfuraDedicatedGateway));
    }
  }, [idoInfo, idoInfo.metadata.image, idoInfo.metadata.imageHash, ipfsInfuraDedicatedGateway]);

  // if (!utils.isValidPool(idoInfo) || !idoInfo) {
  //   return (
  //     <s.Card
  //       ref={card}
  //       ai="center"
  //       style={{ maxWidth: 500, margin: 20, minWidth: 400 }}
  //     >
  //       Loading
  //     </s.Card>
  //   );
  // }
  if (!idoAddress || !metadata || !tokenName || !tokenSymbol) return null;

  // console.log('idoInfo: ', idoInfo, props)

  // Random component
  const Finished = () => (
    <span style={{ color: 'blue' }}>You are good to go!</span>
  );

  // Renderer callback
  const renderer = ({ total, days, hours, minutes, seconds }) => {
    if (total) {
      // Render a countdown
      return (
        <span style={{ fontSize: '16px', fontWeight: "600", color: 'var(--info)' }}>
          {formatTwoDigits(days)}:{formatTwoDigits(hours)}:{formatTwoDigits(minutes)}:{formatTwoDigits(seconds)}
        </span>
      );
    } else {
      // Render a finished state
      return <Finished />;
    }
  };

  // https://codepen.io/pella/pen/qoMyKq
  return (
    <>
      <div className="leading-tight bg-[var(--card)] rounded-lg">
        <div className="rounded-lg shadow-lg">
          {/* <div className="bg-cover h-[130px] bg-[url('https://images.unsplash.com/photo-1522093537031-3ee69e6b1746?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=a634781c01d2dd529412c2d1e2224ec0&auto=format&fit=crop&w=2098&q=80')]" ></div> */}

          <div className="grid grid-cols-2 gap-1 pt-1 px-4 pt-4">
            <div className="flex justify-start">
              {imageExists && (
                <img className="h-[90px] w-[90px] rounded-full border-2 border-white" src={image} onError={handleImageError} />
              )}
            </div>
            <div className="flex justify-end">
              <div>
                {hasEnded ? (
                  <span className="px-2 py-1 bg-[black] text-[12px] text-[#ff3465] font-semibold rounded-md">Ended</span>
                ) : isStarted ? (
                  <span className="px-2 py-1 bg-[var(--success)] text-[12px] font-semibold rounded-md">Sale Live</span>
                ) : (
                  <span className="px-2 py-1 bg-[var(--info)] text-[12px] font-semibold rounded-md">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          </div>


          <div className="px-4 pb-3">
            <div className="grid grid-cols-2 gap-1 pt-1">
              <div className="flex justify-start">
                <div className="rounded-full bg-blue text-white antialiased font-bold hover:bg-blue-dark">
                  {tokenName}
                  {/* <span className="text-[var(--secondary-color)]">${tokenSymbol}</span> */}
                </div>
              </div>
              <div className="flex justify-end">
                {/* NOTHING HERE */}
              </div>
            </div>
            <div className="text-[16px] font-semibold -mt-2 text-[var(--secondary-color)]">
              {`1 ${baseCurrencySymbol} = ${ETHER.div(idoInfo.tokenRate).toFixed(1)} ${idoInfo.tokenSymbol}`}
            </div>


            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="flex justify-start text-[14px]">Soft cap</div>
              <div className="flex justify-end text-[14px] font-semibold text-[var(--info)]">
                {
                // BigNumber(contract.web3.utils.fromWei(softCap)).toFormat() +
                convertWeiToEth(softCap) + 
                  " " +
                  baseCurrencySymbol}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1">
              <div className="flex justify-start text-[14px]">Hard cap</div>
              <div className="flex justify-end text-[14px] font-semibold text-[var(--info)]">
                {
                // BigNumber(contract.web3.utils.fromWei(hardCap)).toFormat() + ": " + 
                convertWeiToEth(hardCap) + 
                  " " +
                  baseCurrencySymbol}
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[14px]">Progress</span>
                <span className="text-[14px]">{BigNumber(progress).toFixed(1) + "%"}</span>
              </div>

              {/* <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className={`bg-[#48c774] h-1.5 rounded-full w-[3%]`}></div>
              </div> */}

              <div className="relative h-1.5 rounded-full bg-gray-500">
                <div className="absolute left-0 top-0 h-full bg-[#48c774] rounded-full" style={{ width: progress+ '%' }} ></div>
              </div>

              <div className="flex justify-between mb-1 mt-1">
                <span className="text-[12px]">{BigNumber(convertWeiToEth(totalInvestedETH)).toFixed(4)+ ' ' + baseCurrencySymbol}</span>
                <span className="text-[12px]">
                  {
                  // BigNumber(contract.web3.utils.fromWei(hardCap)).toFormat() +
                  convertWeiToEth(hardCap) + 
                    " " +
                    baseCurrencySymbol}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-start text-[14px]">Liquidity Percent</div>
                <div className="flex justify-end text-[14px] font-semibold text-[var(--secondary-color)]">
                  {/* {BigNumber(contract.web3.utils.fromWei(liquidityPercentage)).toFormat()}% */}
                  {lpPercentage/100 + "%"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-start text-[14px]">Lockup Time</div>
                <div className="flex justify-end text-[14px] font-semibold text-[var(--secondary-color)]">
                  {daysDifference(claim, end)} days
                </div>
              </div>

            </div>

            <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className="grid grid-cols-2 gap-1">
              <div className="flex justify-start text-[14px]">
                <div>
                  {
                    !hasEnded && (
                      <div className='items-center justify-center'>
                        <div className="text-[12px]">End in</div>
                        <div className="-mt-[8px] countdown-div">
                          <Countdown
                            renderer={renderer}
                            zeroPadTime={2}
                            date={
                              isStarted
                                ? parseInt(end) * 1000
                                : parseInt(start) * 1000
                            }
                          />
                        </div>

                      </div>
                    )
                  }
                </div>
              </div>
              <div className="flex justify-end text-[14px] font-semibold text-[var(--info)] items-center my-2">
                <NavLink
                  to={"/launchpad/" + idoAddress}
                  style={{
                    whiteSpace: "nowrap",
                    backgroundColor: "var(--primary)",
                    padding: 5,
                    // height: 40,
                    borderRadius: 20,
                    fontSize: 14,
                    // fontWeight: 700,
                    paddingLeft: 25,
                    paddingRight: 25,
                    // textDecoration: "none",
                    color: "var(--card)",
                  }}
                >
                  View
                </NavLink>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* <div>
        {idoInfo.metadata && (
          <div>{JSON.stringify(idoInfo)}</div>
        )}
      </div> */}
      {/* <s.Card ref={card}>
        <NavLink
          to={"/launchpad/" + idoAddress}
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
          }}
        >
          <s.UpperCard fd="row" jc="space-between" ai="center">
            <s.Container flex={1} ai="center">
              <img
                style={{ width: 100, height: 100, borderRadius: 20 }}
                src={image}
                onError={(e) => {
                  setImage(imageSolid);
                }}
              ></img>
            </s.Container>
            <s.SpacerSmall />
            <s.Container flex={3} ai="center" style={{ paddingLeft: 5 }}>
              <s.TextDescriptionEllipsis
                style={{ textAlign: "center" }}
                fs={"26px"}
              >
                {tokenName}
              </s.TextDescriptionEllipsis>
              <s.TextID>${tokenSymbol}</s.TextID>
            </s.Container>
          </s.UpperCard>
          <s.SpacerSmall />
          <s.Container fd="row" jc="flex-start">
            {hasEnded ? (
              <Badge bg="secondary">Ended</Badge>
            ) : isStarted ? (
              <Badge bg="success">Started</Badge>
            ) : (
              <Badge bg="secondary">Not started</Badge>
            )}
          </s.Container>
          <s.SpacerXSmall />
          <s.TextID>Description</s.TextID>
          <s.TextField>
            <s.TextDescription>{metadata.description}</s.TextDescription>
            <s.BlurTextField></s.BlurTextField>
          </s.TextField>
          <s.SpacerSmall />
          <s.Container fd="row">
            <s.Container ai="center" flex={1}>
              <s.TextID fullWidth>Soft cap</s.TextID>
              {BigNumber(contract.web3.utils.fromWei(softCap)).toFormat(
                2
              ) +
                " " +
                baseCurrencySymbol}
            </s.Container>
            <s.Container ai="center" flex={1}>
              <s.TextID fullWidth>Hard cap</s.TextID>
              {BigNumber(contract.web3.utils.fromWei(hardCap)).toFormat(
                2
              ) +
                " " +
                baseCurrencySymbol}
            </s.Container>
          </s.Container>
          <s.SpacerSmall />
          {
            !hasEnded && (
              <>
                <s.TextID>
                  {isStarted
                    ? "End in"
                    : "Start in"}
                </s.TextID>
                <Countdown
                  date={
                    isStarted
                      ? parseInt(end) * 1000
                      : parseInt(start) * 1000
                  }
                />
              </>
            )
          }
          <s.TextID>Progress</s.TextID>
          <ProgressBar now={progress} />

        </NavLink>
      </s.Card> */}
    </>

  );
};
export default PoolRenderer;
