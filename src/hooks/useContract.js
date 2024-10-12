import { useMemo } from 'react';
import TokenLockerFactory from '../contracts/TokenLockerFactory.json';
import Locker from "../contracts/TokenLocker.json";
import IDOFactory from '../contracts/IDOFactory.json';
import IDOPool from "../contracts/IDOPool.json";
import ERC20 from '../contracts/ERC20.json';
import SALE from '../contracts/contractsale.json';

import { getContract, isAddress } from '../utils/utils';
import { useActiveWeb3React } from './index';


// returns null on errors
function useContract(address, ABI, withSignerIfPossible = true) {
  const { library, account } = useActiveWeb3React()

  return useMemo(() => {
    if (!address || !isAddress(address) || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useLockerFactoryContract(address, withSignerIfPossible) {
  return useContract(address, TokenLockerFactory.abi, withSignerIfPossible)
}

export function useLockerContract(address, withSignerIfPossible) {
  return useContract(address, Locker.abi, withSignerIfPossible)
}

export function useIDOFactoryContract(address, withSignerIfPossible) {
  return useContract(address, IDOFactory.abi, withSignerIfPossible)
}

export function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20.abi, withSignerIfPossible)
}

export function useIDOPoolContract(IDOAddress, withSignerIfPossible) {
  return useContract(IDOAddress, IDOPool.abi, withSignerIfPossible)
}


export function useContractSaleContract(SaleAddress, withSignerIfPossible) {
  return useContract(SaleAddress, SALE, withSignerIfPossible)
}
