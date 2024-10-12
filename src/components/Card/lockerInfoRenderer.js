import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useApplicationContext } from "../../context/applicationContext";
import { usePoolContext } from "../../context/poolContext";
import { useLockerContract } from "../../hooks/useContract";
import * as s from "../../styles/global";
import Loader from "../Loader";
import InfoLine from "../Utils/infoLine";
import { TimestampToDateTime } from "../../utils/utils";
import PoolCountdown from "../Utils/poolCountdown";

const LockerInfoRenderer = (props) => {
  const { lockerAddress } = props;
  const [loading, setLoading] = useState(false);
  const {
    triggerUpdateAccountData,
    networkExplorer
  } = useApplicationContext();

  const { account } = useWeb3React();

  const LockerContract = useLockerContract(lockerAddress, true)

  const poolContext = usePoolContext();
  let lockerInfo = poolContext.allLocker[lockerAddress];

  if (!lockerInfo) {
    return null;
  }

  const time = new Date(parseInt(lockerInfo.time) * 1000);

  const withdraw = async () => {
    setLoading(true);

    try {
      const tx = await LockerContract.withdrawTokenAll({
        from: account,
      });

      await tx.wait();

      triggerUpdateAccountData();
      // TODO: add trigger for update lockerInfo after withdraw
    } catch (error) {
      console.log('locker withdraw Error',)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--card)] rounded-lg p-4 shadow">
      <InfoLine title="Locker name" content={lockerInfo.name} />

      <InfoLine title="Locker address" content={lockerAddress} url={networkExplorer + '/address/' + lockerAddress} />

      <InfoLine title="Token name" content={lockerInfo.token.tokenName} />

      <InfoLine title="Token address" content={lockerInfo.token.tokenAddress} url={networkExplorer + '/address/' + lockerInfo.token.tokenAddress} />

      <InfoLine title="Locker balance" content={BigNumber(lockerInfo.balance)
        .dividedBy(
          BigNumber(10 ** parseInt(lockerInfo.token.tokenDecimals))
        )
        .toFixed(2) +
        " " +
        lockerInfo.token.tokenSymbol} />

      <InfoLine title="Withdrawer" content={lockerInfo.withdrawer} url={networkExplorer + '/address/' + lockerInfo.withdrawer} />

      <InfoLine title="Unlock time" content={TimestampToDateTime(time)} />

      <s.Container style={{ marginTop: 10 }} fd="row" jc="space-between">
        <div className="col-span-1 md:col-span-1 justify-start text-[14px]">Status</div>

        {BigNumber(lockerInfo.time).lt(Date.now() / 1000) ? (
          <s.TextID style={{ color: "var(--primary)" }}>UNLOCKED</s.TextID>
        ) : (
          <div>
            <div className='text-[14px] text-center'>
              Unlock in
            </div>

            {/* <Countdown date={parseInt(lockerInfo.time) * 1000}></Countdown> */}
            <PoolCountdown date={parseInt(lockerInfo.time) * 1000} />
          </div>

        )}
      </s.Container>
      <s.SpacerSmall />
      {account ? (
        <s.Container flex={1} ai="center">
          <s.button
            disabled={
              loading ||
              BigNumber(lockerInfo.balance).lte(0) ||
              !BigNumber(lockerInfo.time).lt(Date.now() / 1000) ||
              account.toLowerCase() !== lockerInfo.withdrawer.toLowerCase()
            }
            onClick={(e) => {
              e.preventDefault();
              withdraw();
            }}
          >
            {loading ? <div className="my-2"><Loader /></div> : "WITHDRAW"}
          </s.button>
        </s.Container>
      ) : null}

    </div>
  );
};
export default LockerInfoRenderer;
