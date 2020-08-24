import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import firebase from "../base";
import LoadingGif from "../assets/loading.gif";
import useDebounce from "../useDebounceSearch";

// Lets change the icons to "AWESOMEFONTS LATER"
import {IoIosSearch } from "react-icons/io";
import {AiOutlineUser } from "react-icons/ai";
import {MdAddCircleOutline, MdBackspace } from "react-icons/md";

import Logo from "../images/logo1.png"
import Logo2 from "../images/logo2.png"


const TheWrap = styled.div`
    position: absolute;
    left:0; top:0;
    min-height: 100vh;
    z-index:50;
    width:100%;
    background:white;
`

const Header = styled.div`
height:30px;
background:rgba(56, 99, 225, 0.7);
    display:grid;
    grid-template-columns: 1fr 1fr;
    align-items:center;

    font-family: 'Quicksand', sans-serif;
    font-weight:300;
`
const Title = styled.div`
    color:white;
    font-size:12px;
    padding-left:15px;
    font-weight:600;
`

const UL = styled.ul`
    float:right;
    text-align:right;
    padding-right:15px;
`
const LI = styled.li`
    list-style:none;
    display:inline;
    margin-right:20px;
    color:white;
    font-size:15px;
    pointer: cursor;
    &:last-child {
        margin-right:0;
    }
`

// Entire Wrap
const MainBody = styled.div`
    background:white;
    width:400px;
    margin-left:calc((100% - 400px) / 2);
    min-height:calc(100%);    
    overflow:auto;
    padding-bottom:20px;
`

const MainTop = styled.div`
    height: 300px;
    display:grid;
    align-items: center;
    justify-content: center;
`

const MainBelow = styled.div`
    padding:0 20px;
`

const H5 = styled.h5`
    margin:0; padding:0;
    font-weight: 400;
`
const H4 = styled(H5)`
    font-size: 20px;
`

const MainSub = styled.div`
    font-size:12px;
    overflow:hidden;
    margin-top:10px;
    margin-bottom:30px;
`
const Span = styled.span`
    margin-left: 20px;
    float:right;
    color:gray;
`

const MainDesc = styled.div`
    text-align: center; 
    font-weight:400;
    color:gray;
    font-size:14px;
    margin-bottom:30px;
`

const AnswerButton = styled.button`
    border-radius:10px;
    width:100%;
    color:white;
    background: #3863e1;
    padding: 10px 5px;
    border:none;
    margin-bottom:10px;
    font-size:14px;
    font-family: 'Quicksand', sans-serif;
    cursor:pointer;
    &:focus { outline : none; }
    &:last-child {
        border:1px solid #3863e1;
        background:none;
        color:#3863e1;
        font-weight: 600;
    }
`

const BottomButton = styled.button`
    font-size:14px;
    background: none;
    border:none;
    text-align:center;
    width:100%;
    font-family: 'Quicksand', sans-serif;
    font-size:12px;
    padding:15px 0;
    font-weight:600;
    margin-top:20px;
    cursor:pointer;
    &:focus { outline: none; }
`


const HeaderTitle = styled.div`
    text-align:center;
    font-size:16px;
    margin-top:20px;
    font-weight:400;
`

const SearchInput = styled.input`
    width: 90%;
    margin-left:5%;
    background: #ebeae8;
    border-radius: 10px;
    padding: 5px 5px;
    text-align: center;
    border: none;
    margin-top:20px;
    font-family: 'Quicksand', sans-serif;
    &:focus { outline: none; }
    color:black;
    font-weight:bold;
    margin-bottom:10px;
    &::placeholder { color:gray; font-weight:500;}
`

const SearchMenu = styled.div`
    width: 90%;
    margin-left: 5%;
    padding: 0px 0;
    display:grid;
    align-items:center;
    justify-content:center;
    grid-template-columns: 1fr 1fr;
    text-align:center;
    font-size:12px;
    font-weight: 500;
    border-bottom:1px solid lightgray;
    box-sizing:border-box;
`

const SearchList = styled.div`
    display:grid;
    grid-template-columns: 1fr 30px;
    border-bottom:1px solid lightgray;
    padding:10px 0;
    font-size: 15px;
    padding-left:10px;
    color:black;
    font-weight:400;
    cursor:pointer;
    &:hover {
        opacity:0.8;
    }
`

const Search = forwardRef(({props, onClose, ParentSearch, ParentSearchEmpty}, ref) => {

    const [list, setList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRecent, setIsRecent] = useState(true);

    const [search, setSearch] = useState("");
    const debouncedSearchTerm = useDebounce(search, 500);

    const db = firebase.firestore();

    useEffect(() => {
        if(debouncedSearchTerm || debouncedSearchTerm == ""){
            if(debouncedSearchTerm == ""){
                ParentSearchEmpty();
            }else {
                ParentSearch(debouncedSearchTerm);
            }
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        setLoading(false);
        
        let myData;
        if(localStorage.getItem('sosudasu')){
            myData = JSON.parse(localStorage.getItem('sosudasu'))
        }else{
            return null;
        }

        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").get().then(doc => {
            let meme = doc.data();
            let onlyInA = meme.questions.filter(comparer(myData));
            // let onlyInB = myData.filter(comparer(meme.questions));
            // let finalData = onlyInA.concat(onlyInB);
            let finalData = onlyInA;
            setOriginalList(finalData);
            setList(finalData.reverse());
            setLoading(true);
        });
    }, []);

    const comparer = (otherArray) => {
        return function(current){
          return otherArray.filter(function(other){
            return other.id == current.id
          }).length == 0;
        }
    }
      
    const handleClick = () => {
        onClose();
    }

    const handleHot = async () => {
        setIsRecent(false);

        let temp = [];
        originalList.slice(0, 30).map(data => {
            let momo = {id: data.id, question: data.question, total: data.answer_one_count + data.answer_two_count}
            temp.push(momo);
        });
        temp.sort((a, b) => b.total - a.total);

        setLoading(false);
        await setList(temp);
        setLoading(true);
    }

    const handleRecent = async () => {
        setIsRecent(true);
        setLoading(false);
        let tempList = originalList.slice(0, 30);
        tempList.reverse();
        await setList(tempList);
        setLoading(true);
    }

    useImperativeHandle(ref, () => ({
        startSearch(keyword) {
            let temp = originalList;
            let result = temp.filter(data => data.question.includes(keyword));
            setList(result);
        },
        emptySearch() {
            handleRecent();            
        }
    }));




    return (
    <TheWrap>
    <Header>
        <Title>soda</Title>
        <UL>
            <LI onClick={()=>onClose()}><MdBackspace /></LI>
        </UL>
    </Header>
    {
    loading ?

    <MainBody>
        <HeaderTitle>SEARCH</HeaderTitle>
        <SearchInput placeholder="search keyword" value={search} onChange={e => setSearch(e.target.value)}  />
        <SearchMenu>
            <div className="search-btn" onClick={() => handleHot()}>Trending</div>
            <div className="search-btn" onClick={() => handleRecent()}>Recent</div>
        </SearchMenu>
        <MainBelow>
        {
        list.map((data) => (
            <Link to={`/main/${data.id}`}  key={data.id}>
            <SearchList onClick={()=>onClose()}> 
                <div>{data.question}</div>
                <div>O</div>                
            </SearchList>
            </Link>
        ))
        }

            <BottomButton onClick={()=>onClose()}>
                go back
            </BottomButton>
        </MainBelow>
    </MainBody>
    : "Loading"
    }
    </TheWrap>
    )
})

export default Search

