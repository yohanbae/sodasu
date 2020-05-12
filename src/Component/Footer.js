import React from "react";
import styled from "styled-components";
import "../App.css";
import logo from "../assets/logo.png";

const TheFooter = styled.div`
  background: #f2f2f2;
  width: 100%;
  height:35px;
  position:fixed;
  left:0; bottom:0;

  font-size:12px;
  display:grid;
  align-items:center;
  justify-content: center;
`;

const TheWrap = styled.div`
  display:none;
  @media only screen and (max-width: 500px) {
    display:block;
  }     
`;

const TheTitle = styled.span`  
`;
const LogoImg = styled.img`
    width: 10px; height:10px;
`;

const FooterContact = styled.span`
  display:block;
  font-family:'GmarketSansMedium';
  font-size:11px;
  letter-spacing: 2px;
  @media only screen and (max-width: 500px) {
    display:none;
  }     
`;

const Footer = () => {
    return (
      <>
      <TheFooter>
        <a href="mailto:hanison.dev@gmail.com?subject=ToHanison">
        <FooterContact>소다수 3초 설문 플랫폼</FooterContact>
        <TheWrap>
          <LogoImg src={logo}/> <TheTitle style={{color:"#454545", marginTop:'0px', marginLeft:'5px', fontSize:'12px', paddingTop:'5px', fontWeight:'100', fontFamily: 'GmarketSansMedium', letterSpacing:'3px'}}>소다수 3초설문 플랫폼</TheTitle>
        </TheWrap>
        </a>
      </TheFooter>
      </>
    );
}

export default Footer;