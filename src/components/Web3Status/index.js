import { useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  NetworkContextName,
  //   ZERO_ADDRESS,
} from '../../constants';

import WalletModal from '../WalletModal';


import * as s from "../../styles/global";
import { shortenAddress } from '../../utils/utils';


export function Web3Status() {
  const {
    active,
    // chainId,
    account,
    // connector,
    // error,
  } = useWeb3React();

  const [isWaleltModalOpen, setIsWaleltModalOpen] = useState(false);

  const contextNetwork = useWeb3React(NetworkContextName);

  // const toggleWalletModal = useWalletModalToggle()

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <s.Container ai="center">
        {account == null ? (
          <button className="bg-[var(--primary)] text-white text-[16px] px-3 rounded-full h-[36px]"
            onClick={() => {
              setIsWaleltModalOpen(true);
            }}>
            Connect
          </button>

          // <s.button
          //   onClick={() => {
          //     setIsWaleltModalOpen(true);
          //   }}
          // >
          //   Connect
          // </s.button>
        ) : (

          <button className="bg-[var(--primary)] text-white text-[16px] px-3 rounded-full h-[36px]"
            onClick={() => {
              setIsWaleltModalOpen(true);
            }}
          >
            {shortenAddress(account)}
          </button>

          // <s.button
          //   className="address text-collapse"
          //   onClick={() => {
          //     setIsWaleltModalOpen(true);
          //   }}
          // >
          //   {shortenAddress(account)}
          // </s.button>
        )}
      </s.Container>
      <WalletModal isOpen={isWaleltModalOpen} closeModal={() => setIsWaleltModalOpen(false)} />
    </>
  );
}