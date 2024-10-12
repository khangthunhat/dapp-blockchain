import React, { createContext, useEffect, useState } from "react";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { SUPPORTED_CHAIN_IDS } from "../connectors";
import { useTokenContract, useLockerFactoryContract } from "../hooks/useContract";
import { networks, publicSettings } from "../constants/networksInfo";
import useDomainData from "../hooks/useDomainData";

export const Application = createContext({});

export const ApplicationContextProvider = ({ children }) => {
  const { active, account, chainId, library, error } = useWeb3React();
  // console.log('current chainId: ', { active, account, chainId });

  const [targetChainId, setTargetChainId] = useState(chainId ? chainId : publicSettings.defaultNetworkId);

  // console.log('targetChainId: ', targetChainId)
  const [chainName, setChainName] = useState(networks[targetChainId]?.name);
  const [baseCurrencySymbol, setBaseCurrencySymbol] = useState(networks[targetChainId]?.baseCurrency?.symbol);
  const [networkExplorer, setNetworkExplorer] = useState(networks[targetChainId]?.explorer);

  const [isAvailableNetwork, setIsAvailableNetwork] = useState(true);

  const {
    domain,
    isAdmin,
    domainSettings,
    isDomainDataFetching,
    // isDomainDataFetched,
    triggerDomainData,
  } = useDomainData();

  // const [FeeTokenAddress, setFeeTokenAddress] = useState(domainSettings?.contracts?.[targetChainId]?.FeeTokenAddress || '');
  const [IDOFactoryAddress, setIDOFactoryAddress] = useState(domainSettings?.contracts?.[targetChainId]?.IDOFactoryAddress || '');
  const [TokenLockerFactoryAddress, setTokenLockerFactoryAddress] = useState(domainSettings?.contracts?.[targetChainId]?.TokenLockerFactoryAddress || '');
  // const [FeeTokenContract, setFeeTokenContract] = useState(useTokenContract(FeeTokenAddress, true));

  const [isAppConfigured, setIsAppConfigured] = useState(Boolean(
    // domainSettings?.contracts?.[targetChainId]?.FeeTokenAddress
     domainSettings?.contracts?.[targetChainId]?.IDOFactoryAddress
    && domainSettings?.contracts?.[targetChainId]?.TokenLockerFactoryAddress
    && domainSettings?.networks?.[targetChainId]?.webSocketRPC
    // && domainSettings?.admin
    && domainSettings?.ipfsInfuraDedicatedGateway
    && domainSettings?.ipfsInfuraProjectId
    && domainSettings?.ipfsInfuraProjectSecret
  ));


  // const FeeTokenContract = useTokenContract(FeeTokenAddress, true);

  useEffect(() => {

    // alert('chain changed: ', chainId)
    // console.log('domainSettings: ', domainSettings)

    if (chainId) { // default chain id
      setTargetChainId(chainId)
      setChainName(networks[chainId]?.name)
      setBaseCurrencySymbol(networks[chainId]?.baseCurrency?.symbol)
      setNetworkExplorer(networks[chainId]?.explorer)

      // setFeeTokenAddress(domainSettings?.contracts?.[chainId]?.FeeTokenAddress || '');
      setIDOFactoryAddress(domainSettings?.contracts?.[chainId]?.IDOFactoryAddress || '');
      setTokenLockerFactoryAddress(domainSettings?.contracts?.[chainId]?.TokenLockerFactoryAddress || '');

      setIsAppConfigured(Boolean(
        // domainSettings?.contracts?.[chainId]?.FeeTokenAddress
         domainSettings?.contracts?.[chainId]?.IDOFactoryAddress
        && domainSettings?.contracts?.[chainId]?.TokenLockerFactoryAddress
        && domainSettings?.networks?.[chainId]?.webSocketRPC
        // && domainSettings?.admin
        && domainSettings?.ipfsInfuraDedicatedGateway
        && domainSettings?.ipfsInfuraProjectId
        && domainSettings?.ipfsInfuraProjectSecret
      ))


    } else {
      setTargetChainId(publicSettings.defaultNetworkId)
      setChainName(networks[publicSettings.defaultNetworkId]?.name)
      setBaseCurrencySymbol(networks[publicSettings.defaultNetworkId]?.baseCurrency?.symbol)
      setNetworkExplorer(networks[publicSettings.defaultNetworkId]?.explorer)

      // setFeeTokenAddress(domainSettings?.contracts?.[targetChainId]?.FeeTokenAddress || '');
      setIDOFactoryAddress(domainSettings?.contracts?.[targetChainId]?.IDOFactoryAddress || '');
      setTokenLockerFactoryAddress(domainSettings?.contracts?.[targetChainId]?.TokenLockerFactoryAddress || '');

      setIsAppConfigured(Boolean(
        // domainSettings?.contracts?.[targetChainId]?.FeeTokenAddress
         domainSettings?.contracts?.[targetChainId]?.IDOFactoryAddress
        && domainSettings?.contracts?.[targetChainId]?.TokenLockerFactoryAddress
        && domainSettings?.networks?.[targetChainId]?.webSocketRPC
        // && domainSettings?.admin
        && domainSettings?.ipfsInfuraDedicatedGateway
        && domainSettings?.ipfsInfuraProjectId
        && domainSettings?.ipfsInfuraProjectSecret
      ))
    }


  }, [domainSettings, chainId])


  useEffect(() => {
    if (error && error instanceof UnsupportedChainIdError) {
      return setIsAvailableNetwork(false);
    }

    if (chainId) {
      // const lowerAcc = account?.toLowerCase()
      // const appAdmin = wordpressData?.wpAdmin
      //   ? wordpressData?.wpAdmin?.toLowerCase() === lowerAcc
      //   : admin && admin !== ZERO_ADDRESS
      //   ? admin.toLowerCase() === lowerAcc
      //   : true

      // const accessToStorageNetwork = appAdmin && chainId === STORAGE_NETWORK_ID

      // const networkIsFine =
      //   !wordpressData?.wpNetworkIds?.length
      //   || accessToStorageNetwork
      //   || wordpressData.wpNetworkIds.includes(chainId);

      setIsAvailableNetwork(
        Boolean(SUPPORTED_CHAIN_IDS.includes(Number(chainId))
          // && networkIsFine
        ))
    }


  }, [
    chainId,
    account,
    error,
  ]);

  const [shouldUpdateAccountData, setShouldUpdateAccountData] = useState(false);
  const triggerUpdateAccountData = () => setShouldUpdateAccountData(!shouldUpdateAccountData);

  const [feeTokenSymbol, setFeeTokenSymbol] = useState('');
  const [feeTokenBalance, setFeeTokenBalance] = useState(0);
  const [feeTokenApproveToFactory, setFeeTokenApproveToFactory] = useState(0);
  const [isFeeTokenDataFetching, setIsFeeTokenDataFetching] = useState(false);

  const [nativeCoinBalance, setNativeCoinBalance] = useState(0);
  const [isNativeCoinBalanceFetching, setIsNativeCoinBalanceFetching] = useState(false);

  useEffect(() => {
    const fetchNativeCoinBalance = async () => {
      setIsNativeCoinBalanceFetching(true);

      try {
        const accountBalance = await library.getBalance(account);
        setNativeCoinBalance(Number(accountBalance));
      } catch (error) {
        console.log('fetchNativeCoinBalance Error: ', error);
      } finally {
        setIsNativeCoinBalanceFetching(false);
      }
    }

    if (account && library && chainId) {
      fetchNativeCoinBalance()
    } else {
      setNativeCoinBalance(0);
    }
  }, [account, library, chainId, shouldUpdateAccountData])


  const value = {
    isAppConfigured,

    domain,
    isAdmin,
    domainSettings,
    isDomainDataFetching,
    triggerDomainData,

    isAvailableNetwork,
    chainName,
    networkExplorer,
    baseCurrencySymbol,

    triggerUpdateAccountData,
    ETHamount: nativeCoinBalance,
    isNativeCoinBalanceFetching,

    FeeTokenamount: feeTokenBalance,
    FeeTokenSymbol: feeTokenSymbol,
    FeeTokenApproveToFactory: feeTokenApproveToFactory,
    isFeeTokenDataFetching,
  };

  return (
    <Application.Provider value={value}>{children}</Application.Provider>
  );
};

export const useApplicationContext = () => React.useContext(Application);
