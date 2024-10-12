import { Web3Status } from "../Web3Status";

const ConnectWallet = ({ header }) => {

  return (
    <div className="bg-[var(--card)] rounded-lg p-4 shadow">
      <div className="flex items-center justify-center mb-2">
        <div className='text-[16px] font-semibold'>{header}</div>
      </div>
      <Web3Status />
    </div>

  );
};
export default ConnectWallet;
