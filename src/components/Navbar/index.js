import BigNumber from "bignumber.js";
import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../../App.css";
import { useApplicationContext } from "../../context/applicationContext";
import styled from 'styled-components';
import * as s from "../../styles/global";
import { Web3Status } from "../Web3Status";
import Loader from "../Loader";
import { useWeb3React } from "@web3-react/core";
import { CURRENCY } from '../../assets/images';
import { Paper } from "@mui/material";


const NetworkCard = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 2px 20px;
  font-size: 16px;
  border-radius: 20px !important;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-right: 0.4rem;
  align-items: center;
  justify-content: center;

  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }
`;

const Navigation = () => {
  const {
    domainSettings: {
      isLockerEnabled,
      logoUrl,
    },
    isAdmin,
    chainName,
    networkExplorer,
    baseCurrencySymbol,
    ETHamount,
    isNativeCoinBalanceFetching,
    // FeeTokenAddress,
    // FeeTokenamount,
    // FeeTokenSymbol,
    // isFeeTokenDataFetching,
  } = useApplicationContext();

  const { active, chainId } = useWeb3React();

  // const mockCompanyLogo = 'https://wallet.wpmix.net/wp-content/uploads/2020/07/yourlogohere.png';

  // const hasFeeToken = !isFeeTokenDataFetching && FeeTokenSymbol && FeeTokenAddress;

  const getNetworkInfo = () => {
    // if (!chainId) return null;

    const networkImage = CURRENCY[chainId];

    return (
      chainName && active && (
        // TODO: make some wrapped card
        <NetworkCard elevation={2} title={`${chainName} network`}>
          {!!networkImage && (
            <IconWrapper size={20}>
              <img src={networkImage} alt="network logo" />
            </IconWrapper>
          )}
          {chainName}



          {
            active && (isNativeCoinBalanceFetching ?
              <div class="ml-2 mt-1.5">
                <Loader />
              </div> :
              ` ` +
              BigNumber(ETHamount)
                .dividedBy(10 ** 18)
                .toFormat(5) + ' ' + baseCurrencySymbol
            )
          }

        </NetworkCard>
      )
    )
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ padding: 16 }}>
      <Container style={{ maxWidth: "100%" }}>
        <h2>Demo</h2>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">

          </Nav>
          <Web3Status />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navigation;
