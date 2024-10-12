import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Route, Routes } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import "./App.css";
import Web3ReactManager from "./components/Web3ReactManager";
import Connection from "./pages/Connection";
import Footer from "./components/Footer/Footer";
import Navigation from "./components/Navbar";
import Home from "./pages/home.js";
import { fetchContract } from "./redux/contract/contractAction";
import * as s from "./styles/global";
import { useApplicationContext } from "./context/applicationContext";
import Loader from "./components/Loader";
import { publicSettings } from "./constants/networksInfo";

function App() {
  const dispatch = useDispatch();
  const { active, chainId, account } = useWeb3React();

  const {
    isAppConfigured,
    domainSettings: {
      networks,
      contracts,
      isLockerEnabled
    },
    isDomainDataFetching,
    isAvailableNetwork
    // isDomainDataFetched,
  } = useApplicationContext();

  useEffect(() => {
    if (isAppConfigured) {
      let tmpChainId = publicSettings.defaultNetworkId;
      if (chainId) { tmpChainId = chainId; }

      // console.log('start app:', { tmpChainId, networks, contracts, isAvailableNetwork });

      dispatch(fetchContract(tmpChainId, networks, contracts));
    }
  }, [dispatch, account, chainId, isAppConfigured, networks, contracts]);

  return (
    <div class="main-container">
      <Web3ReactManager>
        <s.Screen>
          {!isAvailableNetwork ?
            <Connection /> :
            isDomainDataFetching ? (
              <s.LoaderWrapper>
                <Loader size="2.8rem" />
              </s.LoaderWrapper>
            ) : (
              <>
                <Navigation />
                <div>

                  <Outlet />
                  <Routes>
                    <Route path="/" element={<Home />} />
                  </Routes>

                </div>
                <Footer />
              </>
            )

          }

        </s.Screen>
      </Web3ReactManager >
    </div>

  );
}

export default App;
