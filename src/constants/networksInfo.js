export const networks = {
  11155111: {
    name: "Sepolia",
    rpc: "https://sepolia.infura.io/v3/",
    webSocketRPC: 'wss://goerli.infura.io/ws/v3/e7623498a258462eb08e9ab4a2e50c82',
    chainId: 11155111,
    explorer: "https://sepolia.etherscan.io",
    color: "#f6c343",
    fromBlock: 7879624,
    baseCurrency: {
      decimals: 18,
      name: "ETH",
      symbol: "ETH"
    },
    wrappedToken: {
      address: "0x48f6D7dAE56623Dde5a0D56B283165cAE1753D70",
      name: "Wrapped Ether",
      symbol: "WETH",
      decimals: 18
    },
    IDOFactoryAddress: "0x4Ce72Ee3d2250C0A3eE7FfE9628bE95Dc05c5270",
    TokenLockerFactoryAddress: "0x5581b06DEDD8ad2d851651a7d9B2b25eF280B71b"
  },
}

export const publicSettings = {
  ipfsInfuraProjectId: '2TPbHoUnyAv4Jt2PTpO66Q9odyB',
  ipfsInfuraProjectSecret: '9cb775d2b490764777e64c1630806b68',
  ipfsInfuraDedicatedGateway: 'https://cbase-launchpad.infura-ipfs.io',
  isLockerEnabled: true,
  disableSourceCopyright: false,
  projectName: 'CBASE',
  logoUrl: '',
  socialLinks: [],
  defaultNetworkId: 11155111, //84531
}

export const chainRouter = {
  11155111: [
    {
      name: "CbaseSwap",
      FACTORY: "0x8e917Fc5993D1E659A2d64386B46B84Eeab90419",
      WETH: "0x4200000000000000000000000000000000000006",
      ROUTER: "0x315B6d7f27D5AF979878B1673d9675bd713a52CF",
    },
  ],
};


export default {
  chainRouter,
  networks,
  publicSettings
}
