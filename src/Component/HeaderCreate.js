import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import useDebounce from "../useDebounceSearch";
import '../App.css';
import logo from "../assets/logo.png";

const HeaderWrap = styled.div`
    background: #f2f2f2;
    font-size:12px;
    display:grid;
    grid-template-columns: 1fr 60% 1fr;
    position: absolute;
    left:0; top:0;
    width:100%;
    height:40px;
    align-items:center;

    opacity:0.8;
    z-index:99;

    @media only screen and (max-width: 768px) {
    }    
    @media only screen and (max-width: 500px) {
        grid-template-columns: 1fr 90vw 1fr;
    }
`;

const HeaderMiddle = styled.div`
    display:grid;
    grid-template-columns: 30% 70%;
    align-items:center;
`;

const LoginWrap = styled.div`
    text-align: right;
    width:100%;
    display:grid;
    grid-template-columns: 1fr 100px 100px;
    align-items:center;
    grid-gap:10px;
`;

const TheTitle = styled.span`
    @media only screen and (max-width: 500px) {
        display:none;
    }     
`;
const LogoImg = styled.img`
    width: 10px; height:10px;
    @media only screen and (max-width: 500px) {
        width: 15px; height:15px;
    }     
`;

const Header = () => {

    return (
        <HeaderWrap>
            <div></div>
            <HeaderMiddle>
                {/* <FaUser style={{color:"#454545", marginTop:'3px', fontSize:'14px'}} onClick={ShowPersonClick} /> */}
                <Link to={'/'}>
                <>
                    <LogoImg src={logo}/> <TheTitle style={{color:"#454545", marginTop:'0px', fontSize:'15px', paddingTop:'10px', fontWeight:'300', fontFamily: 'RecipeKorea', letterSpacing:'5px'}}>소다수</TheTitle>
                </>
                </Link>
            </HeaderMiddle>
            <div></div>

        </HeaderWrap>
    )
}

export default Header;