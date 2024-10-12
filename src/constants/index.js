import BigNumber from "bignumber.js";
import { injected, newWalletConnect, newWalletlink } from '../connectors';
import { networks } from '../constants/networksInfo';

const Sepolia = 11155111;

// export const STORAGE_NETWORK_ID = process.env.NODE_ENV === 'production' ? BASE_GOERLI_ID : BASE_ID
export const STORAGE_NETWORK_ID = Sepolia
export const STORAGE_NETWORK_NAME = networks[STORAGE_NETWORK_ID.toString()].name;
export const STORAGE = networks[STORAGE_NETWORK_ID.toString()].storage;

export const STORAGE_APP_KEY = 'launchpad';

export const WALLET_NAMES = {
  INJECTED: 'Injected',
  METAMASK: 'MetaMask',
  WALLET_CONNECT: 'WalletConnect',
  COINBASE: 'Coinbase',
  WALLET_LINK: 'Coinbase Wallet',
  TRUST: 'Trust Wallet',
};

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connector: injected,
    name: WALLET_NAMES.METAMASK,
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D',
  },
};

export const NetworkContextName = 'NETWORK';

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const ETHER = BigNumber(10).pow(18);