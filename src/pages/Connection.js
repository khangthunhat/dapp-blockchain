import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaWallet } from 'react-icons/fa';
// import { networks } from '../constants/networksInfo';
import { SUPPORTED_NETWORKS, SUPPORTED_CHAIN_IDS } from '../connectors';
import { Web3Status } from '../components/Web3Status';
import * as s from "../styles/global";
import { networks } from "../constants/networksInfo";
import Option from '../components/WalletModal/Option';
import { CURRENCY } from '../assets/images';
import { switchInjectedNetwork } from '../utils/utils';

const Title = styled.h4`
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: 0 0 0.6rem;
  padding: 0;
`;


const WalletIconWrapper = styled.div`
  padding: 0.6rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.text2};

  .icon {
    color: white;
  }
`;


const NetworkStatus = styled.div`
  width: 80%;
`;

const SupportedNetworksWrapper = styled.div`
  padding: 0.7rem 1.4rem;
`;

// const SupportedNetworksList = styled.ul`
//   margin: 0;
//   padding: 0.6rem 0;
//   list-style: none;

//   li {
//     margin: 0.4rem 0;
//     padding: 0.4rem 0.8rem;
//     border-radius: 0.4rem;
//     background-color: ${({ theme }) => theme.bg2};
//   }
// `;

const Options = styled.div`
  // display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  max-height: 23rem;
  padding: 0.6rem;
  border-radius: 0.8rem;
  border: 1px solid #232227;
  box-shadow: inset 0 0 0.2rem #232227;

  ${({ disabled }) => (disabled ? 'pointer-events: none; opacity: 0.6' : '')};
`;


// const unavailableOrZeroAddr = value => !value || value === ZERO_ADDRESS;

export default function Connection() {
  // const [currentChainId, setCurrentChainId] = useState(0);
  const [availableNetworks, setAvailableNetworks] = useState([]);

  useEffect(() => {
    const networks = Object.values(SUPPORTED_NETWORKS).filter(({ chainId }) => {
      return true;
    });

    setAvailableNetworks(networks);
  }, []);

  function getNetworkOptions() {
    return availableNetworks.map(({ chainId }) => (
      <Option
        onClick={() => switchInjectedNetwork(chainId)}
        id={`connect-network-${chainId}`}
        key={chainId}
        // active={currentChainId === Number(chainId)}
        color={networks[chainId]?.color || ''}
        header={networks[chainId].name}
        subheader={null}
        icon={CURRENCY[chainId] ?? ''}
        size={45}
      />
    ))
  }

  const networkOptions = getNetworkOptions()

  return (
    <s.Wrapper>

        <s.BodyWrapper>
          <s.ContentWrapper>
            <WalletIconWrapper>
              <FaWallet size="2.4rem" className="icon" />
            </WalletIconWrapper>
            <Title>Connect your wallet to get started</Title>
            <NetworkStatus>
              <Web3Status />
            </NetworkStatus>
          </s.ContentWrapper>
        </s.BodyWrapper>
    </s.Wrapper>
  );
}
