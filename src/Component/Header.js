import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import useDebounce from "../useDebounceSearch";
import "../App.css";
import logo from "../assets/logo.png";

const HeaderWrap = styled.div`
    background: #f2f2f2;
    font-size:12px;
    display:grid;
    grid-template-columns: 1fr 60vw 1fr;
    position: absolute;
    left:0; top:0;
    width:100vw;
    height:40px;
    align-items:center;

    opacity:0.8;
    z-index:99;

    @media only screen and (max-width: 768px) {
        grid-template-columns: 1fr 80% 1fr;
      }    
    @media only screen and (max-width: 500px) {
        grid-template-columns: 1fr 90vw 1fr;
        overflow:hidden;
    }    

`;

const HeaderMiddle = styled.div`
    display:grid;
    grid-template-columns: 30% 70%;
    align-items:center;
    height:100%;
    @media only screen and (max-width: 500px) {
        grid-template-columns: 25px 1fr;
    }    
`;

const LoginWrap = styled.div`
    text-align: right;
    width:100%;
    display:grid;
    grid-template-columns: 1fr 100px 100px;
    align-items:center;
    justify-content: flex-end;
    grid-gap:10px;
    @media only screen and (max-width: 500px) {
        grid-template-columns: 1fr 100px 100px;
    }    
`;
const SearchBar = styled.input`
    border-radius:3px;
    background: #fff;
    border:none;
    height:20px;
    font-size:12px;
    color:#454545;
    width:calc(100%);
    text-align:center;
    cursor:pointer;
    padding:2px 0;
    font-family: 'GmarketSansMedium';
    font-weight:100;
    padding-top:5px;
    &:hover::placeholder{
        color:black;
    }

    @media only screen and (max-width: 500px) {
        font-size:10px;
    }     
`;

const CreateSpan = styled.button`
      font-size:12px;
      background: #3464eb;
      color:#fff;
      font-weight:100;
      border:none;
      border-radius:3px;
      padding:3px;
      padding-top:5px;
      cursor:pointer;
      font-family: 'GmarketSansMedium';
      @media only screen and (max-width: 500px) {
        font-size:10px;
    }     

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

const Header = ({ShowClick, ShowPersonClick, ParentSearch, ParentSearchEmpty}) => {
    const [search, setSearch] = useState("");
    const debouncedSearchTerm = useDebounce(search, 500);

    useEffect(() => {
        if(debouncedSearchTerm || debouncedSearchTerm == ""){
            if(debouncedSearchTerm == ""){
                ParentSearchEmpty();
            }else {
                ParentSearch(debouncedSearchTerm);
            }
        }
    }, [debouncedSearchTerm]);

    function goTest() {
        Array.prototype.print = function() {
            console.log(this);
        }
        [4,2].print();
        console.log("HOIDODIOD");
    }

    return (
        <HeaderWrap>
            <div></div>
            <HeaderMiddle>
                {/* <FaUser style={{color:"#454545", marginTop:'3px', fontSize:'14px'}} onClick={ShowPersonClick} /> */}
                <Link to={'/'}>
                <>
                    <LogoImg src={logo}/> <TheTitle style={{color:"#454545", marginTop:'0px', fontSize:'15px', marginLeft:'10px', paddingTop:'10px', fontWeight:'300', fontFamily: 'GmarketSansMedium', letterSpacing:'5px'}}>소다수</TheTitle>
                </>
                </Link>
                <LoginWrap>
                    <SearchBar placeholder="더 보기 및 검색" onClick={ShowClick} value={search} onChange={e => setSearch(e.target.value)} />
                    <CreateSpan onClick={ShowPersonClick}>나의 성향보기</CreateSpan>
                    <CreateSpan>
                        <Link to={'/create'}>
                        설문 만들기
                        </Link>
                        <button onClick={goTest}>Test</button>
                    </CreateSpan>
                </LoginWrap>
            </HeaderMiddle>
            <div></div>

        </HeaderWrap>
    )
}

export default Header;