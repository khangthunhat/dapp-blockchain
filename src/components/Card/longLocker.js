import BigNumber from "bignumber.js";
import React from "react";
import Countdown from "react-countdown";
import { NavLink } from "react-router-dom";
import { usePoolContext } from "../../context/poolContext";
import * as s from "../../styles/global";
import PoolCountdown from "../Utils/poolCountdown";

const LongLocker = (props) => {
  const { lockerAddress } = props;
  const lockerInfo = usePoolContext().allLocker[lockerAddress];

  // console.log("locker info: ", lockerInfo)
  if (!lockerInfo) {
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
        to={"/locker/" + lockerAddress}
        style={{
          textDecoration: "none",
          color: "white",
          width: "100%",
        }}
      >
        <s.Card
          fd="row"
          p={"20px"}
          style={{ maxWidth: "100%" }}
          jc="space-between"
        >
          <s.Container flex={1}>
            <div className='text-[16px] leading-5'>{lockerInfo.name}</div>
            <s.TextID>{lockerInfo.token.tokenSymbol}</s.TextID>
          </s.Container>

          <s.Container flex={1} ai="flex-end">
            <div className="text-[16px] font-semibold text-[var(--info)] text-center">
              {BigNumber(lockerInfo.balance)
                .dividedBy(
                  BigNumber(10 ** parseInt(lockerInfo.token.tokenDecimals))
                )
                .toFixed(2) +
                " $" +
                lockerInfo.token.tokenSymbol}
            </div>

            {BigNumber(lockerInfo.time).lt(Date.now() / 1000) ? (
              <s.TextID style={{ color: "var(--primary)" }}>UNLOCKED</s.TextID>
            ) : (
              <s.TextID>
                {/* <Countdown date={parseInt(lockerInfo.time) * 1000}></Countdown> */}
                <PoolCountdown date={parseInt(lockerInfo.time) * 1000} />
              </s.TextID>
            )}

          </s.Container>
        </s.Card>
      </NavLink>
    </div>

  );
};
export default LongLocker;
