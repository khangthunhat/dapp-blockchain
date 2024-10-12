import React, { useState } from "react";
import { Input } from "@mui/material";
import { TokenInfo } from "../hooks/useSaleConstract";
import Loader from "../components/Loader";
import { useContractSaleContract } from "../hooks/useContract";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as s from "../styles/global";
import WalletModal from "../components/WalletModal";

const Home = () => {
  const [amount, setAmount] = useState('');
  const tokenInfo = TokenInfo();
  const constract = useContractSaleContract("0x7a39B6b5cFB9707F7EE9Dcbf6bAb001B32c310a5");
  const [loading, setLoading] = useState(false);
  const [erorrAmount, setErorrAmount] = useState(false);
  const { account } = useWeb3React();
  const [isWaleltModalOpen, setIsWaleltModalOpen] = useState(false);
  // const toast = Toast()
  const buyToken = async () => {
    setLoading(true);
    try {

      const token_price = BigNumber(tokenInfo.tokenPrice).dividedBy(10 ** tokenInfo.decimals);
      const result = BigNumber(Number(amount) * Number(token_price)).times(10 ** tokenInfo.decimals).toFixed(0);
      // console.log(token, result.toString(), token_price.toString())
      const tx = await constract.buyTokens(
        amount,
        {
          from: account,
          value: result,
        }
      );

      const receipt = await tx.wait();
      toast.success(`Buy ${amount} ${tokenInfo.tokenSymbol} successfully`)
      setLoading(false);
    } catch (error) {
      console.log("====", error)
      setLoading(false);
      toast.error(error.reason)
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ToastContainer />
      <WalletModal isOpen={isWaleltModalOpen} closeModal={() => setIsWaleltModalOpen(false)} />
      <div className="w-full max-w-screen-xl mx-auto home-page mb-16 p-3">
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="grid justify-center">
            <div >
              {tokenInfo.tokenLoading ? <Loader size="2.8rem" /> : <>
                <div>
                  Token Name: {tokenInfo.tokenSymbol}
                </div>
                <div className="flex gap-3 mt-4">
                  <div>
                    <Input placeholder="Enter amount token " type="number" onChange={(e) => {
                      if (e.target.value <= 0) {
                        setErorrAmount(true)
                      } else {
                        setAmount(e.target.value)
                        setErorrAmount(false)
                      }

                    }} />
                  </div>
                  {account == null ? (
                    <button className="bg-[var(--primary)] text-white text-[16px] px-3 rounded-full h-[36px]"
                      onClick={() => {
                        setIsWaleltModalOpen(true);
                      }}>
                      Connect
                    </button>
                  ) : (
                    <s.button
                      disabled={
                        loading || amount === "" || Number(amount) === 0 || erorrAmount
                      }
                      onClick={() => buyToken()}
                      variant="outlined"
                      type="button"
                      style={{ margin: 5 }}
                    >
                      {loading ? `Pending ...` : "Buy Token"}
                    </s.button>)}
                </div>
                {erorrAmount && <p className="mb-2 text-danger text-errormt-2">amount not less than or equal to 0 </p>}
              </>}
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Home;
