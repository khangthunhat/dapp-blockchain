import BigNumber from "bignumber.js";
import React, { createContext, useState, useEffect } from "react";

export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const [error, setError] = useState("");
  const [icon, setIcon] = useState("");
  // const [cover, setCover] = useState("");
  const [address, setAddress] = useState("");
  const [wethInformation, setWETHInformation] = useState("");
  const [tokenRate, setTokenRate] = useState("");
  const [softCap, setSoftCap] = useState("");
  const [hardCap, setHardCap] = useState("");
  const [router, setRouter] = useState(-1);
  const [minETH, setMinETH] = useState("");
  const [maxETH, setMaxETH] = useState("");
  const [feeIDO, setFee] = useState("0");
  const [ticksrange, setTickrange] = useState(null);
  const [isAddLiquidityEnabled, setIsAddLiquidityEnabled] = useState(false);
  const [liquidityPercentage, setLiquidityPercentage] = useState("");
  const [liquidityPercentageBL, setLiquidityPercentageBL] = useState("");
  const [listingRate, setListingRate] = useState("");

  const [isVestingEnabled, setIsVestingEnabled] = useState(false);
  const [vestingfirstReleasePercentage, setVestingfirstReleasePercentage] =
    useState("");
  const [vestingPeriod, setVestingPeriod] = useState("");
  const [
    vestingReleasePerCyclePercentage,
    setVestingReleasePerCyclePercentage,
  ] = useState("");

  const [start, setStart] = useState(Date.now());
  const [end, setEnd] = useState(Date.now());
  const [unlock, setUnlock] = useState(Date.now());
  const [youtube, setYoutube] = useState("");
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [github, setGithub] = useState("");
  const [reddit, setReddit] = useState("");
  const [description, setDescription] = useState("");

  const [tokenError, setTokenError] = useState({});
  const [idoError, setIdoError] = useState({});

  const [tokenInformation, setTokenInformation] = useState(null);
  const [idoInformation, setIdoInformation] = useState(null);
  const [account, setAccount] = useState(null);
  const [ticksPrevious, setTicksPrevious] = useState(null);
  const [sqrtRatioX96, setSqrtRatioX96] = useState(null);
  const tokenFormValidate = () => {
    let errors = {};
    let formIsValid = true;
    if (!tokenInformation) {
      formIsValid = false;
      errors["token"] = "Contract is not valid";
    }
    setTokenError(errors);
    return formIsValid;
  };

  useEffect(() => {
    setTokenError({});
  }, [address]);
  const getTimestamp = (time) => {
    if (typeof time === "number") {
      return time;
    } else {
      return time.getTime();
    }
  };

  const idoFormValidate = () => {
    console.log({
      start,
      end,
      unlock,
    });
    let errors = {};
    let formIsValid = true;
    if (BigNumber(softCap).gte(BigNumber(hardCap))) {
      formIsValid = false;
      errors["softCap"] = "Soft cap cannot less than Hard cap";
    }
    if (BigNumber(minETH).gt(BigNumber(softCap))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot greater than Soft cap";
    }
    if (BigNumber(maxETH).gt(BigNumber(hardCap))) {
      formIsValid = false;
      errors["maxETH"] = "Maximum buy cannot greater than Hard cap";
    }
    if (BigNumber(minETH).gte(BigNumber(maxETH))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot less than Maximum buy";
    }
    if (BigNumber(tokenRate).lte(BigNumber(0))) {
      formIsValid = false;
      errors["tokenRate"] = "Token rate cannot be zero";
    }
    if (BigNumber(minETH).lte(BigNumber(0))) {
      formIsValid = false;
      errors["minETH"] = "Minimum buy cannot be zero";
    }
    if (BigNumber(softCap).lte(BigNumber(0))) {
      formIsValid = false;
      errors["softCap"] = "Soft cap cannot be zero";
    }
    if (BigNumber(hardCap).lte(BigNumber(0))) {
      formIsValid = false;
      errors["hardCap"] = "Hard cap cannot be zero";
    }

    if (!start) {
      formIsValid = false;
      errors["start"] = "Field cannot empty";
    }
    if (!end) {
      formIsValid = false;
      errors["end"] = "Field cannot empty";
    }
    if (!unlock) {
      formIsValid = false;
      errors["unlock"] = "Field cannot empty";
    }

    if (BigNumber(getTimestamp(start)).gte(BigNumber(getTimestamp(end)))) {
      formIsValid = false;
      errors["start-end"] = "Start date cannot less than End date";
    }
    if (BigNumber(getTimestamp(end)).gte(BigNumber(getTimestamp(unlock)))) {
      formIsValid = false;
      errors["unlock"] = "Unlock date cannot less than End date";
    }
    if (tokenRate == "") {
      formIsValid = false;
      errors["tokenRate"] = "Field cannot empty";
    }
    if (softCap == "") {
      formIsValid = false;
      errors["softCap"] = "Field cannot empty";
    }
    if (hardCap == "") {
      formIsValid = false;
      errors["hardCap"] = "Field cannot empty";
    }
    if (minETH == "") {
      formIsValid = false;
      errors["minETH"] = "Field cannot empty";
    }
    if (maxETH == "") {
      formIsValid = false;
      errors["maxETH"] = "Field cannot empty";
    }

    if (BigNumber(liquidityPercentage).lte(BigNumber(50))) {
      formIsValid = false;
      errors["liquidityPercentage"] = "Liquidity should more than 50%";
    }
    if (BigNumber(liquidityPercentage).gt(BigNumber(100))) {
      formIsValid = false;
      errors["liquidityPercentage"] =
        "Liquidity should less than or equal 100%";
    }
    if (BigNumber(listingRate).lte(BigNumber(0))) {
      formIsValid = false;
      errors["listingRate"] = "Listing rate cannot be zero";
    }
    if (liquidityPercentage == "") {
      formIsValid = false;
      errors["liquidityPercentage"] = "Field cannot empty";
    }
    if (listingRate == "") {
      formIsValid = false;
      errors["listingRate"] = "Field cannot empty";
    }

    if (isVestingEnabled) {
      console.log({
        vestingfirstReleasePercentage,
        vestingPeriod,
        vestingReleasePerCyclePercentage,
      });
      if (vestingfirstReleasePercentage == "") {
        formIsValid = false;
        errors["vestingfirstReleasePercentage"] = "Field cannot empty";
      }
      if (vestingPeriod == "") {
        formIsValid = false;
        errors["vestingPeriod"] = "Field cannot empty";
      }
      if (vestingReleasePerCyclePercentage == "") {
        formIsValid = false;
        errors["vestingReleasePerCyclePercentage"] = "Field cannot empty";
      }

      if (
        vestingfirstReleasePercentage &&
        parseFloat(vestingfirstReleasePercentage) <= 0
      ) {
        formIsValid = false;
        errors["vestingfirstReleasePercentage"] =
          "First release must be greater than zero";
      }
      if (vestingPeriod && parseFloat(vestingPeriod) < 0) {
        formIsValid = false;
        errors["vestingPeriod"] = "Vesting period must be >= zero";
      }
      if (
        vestingReleasePerCyclePercentage &&
        parseFloat(vestingReleasePerCyclePercentage) < 0
      ) {
        formIsValid = false;
        errors["vestingReleasePerCyclePercentage"] =
          "Token release each cycle percent must be greater than zero";
      }

      // if (BigNumber(vestingfirstReleasePercentage).gte(BigNumber(100))) {
      //   formIsValid = false;
      //   errors["vestingfirstReleasePercentage"] =
      //     "First release should less than 100%";
      // }

      if (
        parseFloat(vestingfirstReleasePercentage) +
          parseFloat(vestingReleasePerCyclePercentage) >
        100
      ) {
        formIsValid = false;
        errors["vestingfirstReleasePercentage"] =
          "First release for presale and Presale token release each cycle must be equal 100%";
        errors["vestingReleasePerCyclePercentage"] =
          "First release for presale and Presale token release each cycle must be less than 100%";
      }
    }
    // if (router < 0) {
    //   formIsValid = false;
    //   errors["router"] = "Field cannot empty";
    // }

    setIdoError(errors);
    return formIsValid;
  };

  const store = {
    address: [address, setAddress],
    tokenRate: [tokenRate, setTokenRate],
    softCap: [softCap, setSoftCap],
    hardCap: [hardCap, setHardCap],
    router: [router, setRouter],
    minETH: [minETH, setMinETH],
    maxETH: [maxETH, setMaxETH],
    isAddLiquidityEnabled: [isAddLiquidityEnabled, setIsAddLiquidityEnabled],
    ticksPrevious: [ticksPrevious, setTicksPrevious],
    sqrtRatioX96: [sqrtRatioX96, setSqrtRatioX96],
    ticksrange:[ticksrange, setTickrange],
    isVestingEnabled: [isVestingEnabled, setIsVestingEnabled],
    vestingfirstReleasePercentage: [
      vestingfirstReleasePercentage,
      setVestingfirstReleasePercentage,
    ],
    vestingPeriod: [vestingPeriod, setVestingPeriod],
    vestingReleasePerCyclePercentage: [
      vestingReleasePerCyclePercentage,
      setVestingReleasePerCyclePercentage,
    ],
    liquidityPercentage: [liquidityPercentage, setLiquidityPercentage],
    liquidityPercentageBL: [liquidityPercentageBL, setLiquidityPercentageBL],
    listingRate: [listingRate, setListingRate],

    start: [start, setStart],
    end: [end, setEnd],
    unlock: [unlock, setUnlock],
    tokenInformation: [tokenInformation, setTokenInformation],
    wethInformation: [wethInformation, setWETHInformation],
    idoInformation: [idoInformation, setIdoInformation],
    account: [account, setAccount],
    error: [error, setError],
    tokenFormValidate,
    tokenError: tokenError,
    idoFormValidate,
    idoError: idoError,
    icon: [icon, setIcon],
    // cover: [cover, setCover],
    description: [description, setDescription],
    youtube: [youtube, setYoutube],
    discord: [discord, setDiscord],
    telegram: [telegram, setTelegram],
    twitter: [twitter, setTwitter],
    website: [website, setWebsite],
    facebook: [facebook, setFacebook],
    reddit: [reddit, setReddit],
    github: [github, setGithub],
    feeIDO: [feeIDO, setFee],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStoreContext = () => React.useContext(StoreContext);
