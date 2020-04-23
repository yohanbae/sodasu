import React from "react";
import styled from "styled-components";
import "../App.css";

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

const Footer = () => {
    return (
      <>
      <TheFooter><a href="mailto:hanison.dev@gmail.com?subject=ToHanison">CONTACT HANISON</a></TheFooter>
      </>
    );
}

export default Footer;