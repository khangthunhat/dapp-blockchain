import { useState, useEffect } from 'react';
import { getCurrentDomain } from '../utils/utils';
import { networks, publicSettings } from "../constants/networksInfo";


const getSettings = (settings) => {
  const contracts = {}
  const networks = {}

  for (const chainId in settings) {
    if (settings.hasOwnProperty(chainId)) {
      contracts[chainId] = {
        IDOFactoryAddress: settings[chainId].IDOFactoryAddress,
        TokenLockerFactoryAddress: settings[chainId].TokenLockerFactoryAddress
      }
      networks[chainId] = {
        webSocketRPC: settings[chainId].webSocketRPC
      }
    }
  }

  const appSettings = {
    contracts, networks,
    ...publicSettings
  }

  return appSettings
}

export default function useDomainData() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [domainSettings, setDomainSettings] = useState({});
  const [isDomainDataFetching, setIsDomainDataFetching] = useState(false);
  const [domainDataTrigger, setDomainDataTrigger] = useState(false);
  const triggerDomainData = () => setDomainDataTrigger(!domainDataTrigger);


  const domain = getCurrentDomain();

  useEffect(() => {
    try {
      const settings = getSettings(networks);
      setDomainSettings(settings);
    } catch (error) {
      console.log('fetchDomainData Error: ', error)
    } finally {
    }
  }, [
    domainDataTrigger,
    domain
  ]);


  return {
    domain,
    isAdmin,
    domainSettings,
    isDomainDataFetching,
    triggerDomainData,
  };
}
