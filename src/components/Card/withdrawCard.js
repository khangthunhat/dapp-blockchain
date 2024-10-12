import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import React, { useState } from "react";
import Countdown from "react-countdown";
import { useApplicationContext } from "../../context/applicationContext";
import { usePoolContext } from "../../context/poolContext";
import { useIDOPoolContract } from "../../hooks/useContract";
import * as s from "../../styles/global";
import { utils } from "../../utils";
import PoolCountdown from "../Utils/poolCountdown";


const WithdrawETH = (props) => {
  const { account, library } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const { idoAddress } = props;

  const {
    triggerUpdateAccountData,
    baseCurrencySymbol,
    TokenLockerFactoryContract,
  } = useApplicationContext();

  const idoInfo = usePoolContext().allPools[idoAddress];
  const IDOPoolContract = useIDOPoolContract(idoAddress);

  if (!account || !idoInfo || !library.web3) {
    return null;
  }

  if (!utils.isValidPool(idoInfo)) {
    return null;
  }

  if (idoInfo.owner.toLowerCase() !== account.toLowerCase()) {
    return null;
  }

  const withdrawETH = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
      const isNeedLocker = parseInt(idoInfo.claim) > parseInt(Date.now() / 1000);

      const tx = await IDOPoolContract.withdrawETH({
        from: account,
        value: isNeedLocker ? await TokenLockerFactoryContract.fee() : 0,
      });

      const receipt = await tx.wait();

      triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawETH receipt", receipt);
    } catch (err) {
      console.log("withdrawETH Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const withdrawToken = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
      const tx = await IDOPoolContract.refundTokens({
        from: account,
      });

      const receipt = await tx.wait();

      triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawToken receipt", receipt);
    } catch (err) {
      console.log("withdrawToken Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const withdrawUnsoldToken = async () => {
    setLoading(true); // TODO: add action loader to the appropriate button
    try {
      const tx = await IDOPoolContract.withdrawNotSoldTokens({
        from: account,
      });

      const receipt = await tx.wait();

      triggerUpdateAccountData();
      // TODO: add trigger for update IDOInfo after actions
      console.log("withdrawUnsoldToken receipt", receipt);
    } catch (err) {
      console.log("withdrawUnsoldToken Error: ", err);
    } finally {
      setLoading(false);
    }
  };

  const hasEnded = parseInt(idoInfo.end) < parseInt(Date.now() / 1000);

  return (
    <div className="bg-[var(--card)] rounded-lg p-4 shadow mt-3">
      <s.TextTitle>WITHDRAW</s.TextTitle>
      <div className='text-center text-[var(--info)] font-semibold text-[16px]'>(Pool owner only)</div>
      {
        !hasEnded && (
          <s.Container ai="center">
            <div>
              <span className="text-[14px]">Can withdraw in</span>
            </div>

            <div className='flex items-center'>
              <PoolCountdown start={idoInfo.start} end={idoInfo.end} />
            </div>
            {/* <Countdown date={idoInfo.end * 1000} /> */}
          </s.Container>
        )
      }
      <s.SpacerSmall />
      <s.Container fd="row" ai="center" jc="space-between">
        <s.Container flex={2}>
          <span className="text-[14px]">Total invested</span>

          <span className='text-[16px] text-[var(--info)]'>
            {BigNumber(library.web3.utils.fromWei(idoInfo.balance)).toFixed(2) +
              " " +
              baseCurrencySymbol}
          </span>
        </s.Container>
        <s.button
          disabled={
            !hasEnded ||
            BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ||
            idoInfo.balance == 0
          }
          onClick={(e) => {
            e.preventDefault();
            withdrawETH();
          }}
        >
          WITHDRAW
        </s.button>
      </s.Container>
      <s.Container fd="row" ai="center" jc="space-between">
        <s.Container flex={2}>
          <span className="text-[14px]">Unsold token</span>
          <span className='text-[16px] text-[var(--info)]'>
            {BigNumber(idoInfo.unsold)
              .dividedBy(10 ** idoInfo.tokenDecimals)
              .toFixed(2) +
              " " +
              idoInfo.tokenSymbol}
          </span>
        </s.Container>
        {BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ? (
          <s.button
            disabled={
              !hasEnded ||
              !BigNumber(idoInfo.totalInvestedETH).lt(BigNumber(idoInfo.softCap)) ||
              (!idoInfo.unsold || idoInfo.unsold == "0")
            }
            onClick={(e) => {
              e.preventDefault();
              withdrawToken();
            }}
          >
            WITHDRAW ALL TOKEN
          </s.button>
        ) : (
          <s.button
            disabled={
              !hasEnded ||
              idoInfo.balance > 0 ||
              (!idoInfo.unsold || idoInfo.unsold == "0")
            }
            onClick={(e) => {
              e.preventDefault();
              withdrawUnsoldToken();
            }}
          >
            WITHDRAW UNSOLD TOKEN
          </s.button>
        )}
      </s.Container>
    </div>
  );
};
export default WithdrawETH;
