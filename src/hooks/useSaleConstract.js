import { useEffect, useState } from "react";
import { useContractSaleContract, useTokenContract } from "./useContract"
import { useWeb3React } from "@web3-react/core";
import { utils } from "../utils";

export const InfoSale = () => {
    const constract = useContractSaleContract("0x7a39B6b5cFB9707F7EE9Dcbf6bAb001B32c310a5");
    console.log("=====constca", constract)
}

export const TokenInfo = () => {
    const [tokenName, setTokenName] = useState("");
    const [totalSupply, setTotalSupply] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [tokenPrice, setTokenPrice] = useState("");
    const [tokenApprove, setTokenApprove] = useState("0");
    const [decimals, setDecimals] = useState(-1);
    const [tokenLoading, setTokenLoading] = useState(false);
    const { account, library } = useWeb3React();
    const tokenContract = useTokenContract("0x27f1bf88EFe402bEF1C27fB5bb02E22264cB91d1");
    const constract = useContractSaleContract("0x7a39B6b5cFB9707F7EE9Dcbf6bAb001B32c310a5");
    useEffect(() => {
        const checkAndSetTokensDetails = async () => {
            setTokenLoading(true);
            try {
                const tokenDecimals = await tokenContract?.decimals();
                if (tokenDecimals) {
                    setDecimals(tokenDecimals.toString());
                    setTokenName(await tokenContract?.name());
                    setTotalSupply(Number(await tokenContract?.totalSupply()));
                    setTokenSymbol(await tokenContract?.symbol());
                    setTokenApprove(Number(await tokenContract?.allowance(account, "0x7a39B6b5cFB9707F7EE9Dcbf6bAb001B32c310a5")));
                    const tokenPrice = await constract?.tokenPrice();
                    setTokenPrice(tokenPrice.toString());
        
                } else {
                    setDecimals(-1);
                    await utils.timeout(100);
                }
            } catch (error) {
                console.log('checkAndSetTokensDetails Error: ', error);
                setDecimals(-1);
            } finally {
                setTokenLoading(false)
            }
        };

        if (tokenContract && constract) {
            checkAndSetTokensDetails()
        }
    }, [account, tokenContract, constract])

    return {
        tokenApprove,
        tokenName,
        totalSupply,
        tokenSymbol,
        decimals,
        tokenLoading,
        tokenPrice
    }
}