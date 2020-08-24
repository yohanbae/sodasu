import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";

import { useParams, Link } from 'react-router-dom'
import LoadingGif from "../assets/loading.gif";
import {toast} from "react-toastify";
import firebase from "../base";

// Lets change the icons to "AWESOMEFONTS LATER"
import {IoIosSearch } from "react-icons/io";
import {AiOutlineUser } from "react-icons/ai";
import {MdAddCircleOutline } from "react-icons/md";

import Logo from "../images/logo1.png"
import Search from "./Search"

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
    cursor:pointer;
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
    cursor: pointer;
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

const BlackBackground = styled.div`
    background:rgba(0,0,0,0.4);
    position:absolute;
    top:0; left:0;
    width:100%;
    height:100%;
    z-index:10;
    display:none;
`

const ResultWrap = styled.div`
    width:350px;
    background:white;
    min-height:300px;
    z-index:11;

    position:fixed;
    left:calc((100% - 350px) /2 );
    top: 100px;
    border-radius: 10px;

    -webkit-box-shadow: 3px 3px 8px 0px rgba(28,28,28,1);
    -moz-box-shadow: 3px 3px 8px 0px rgba(28,28,28,1);
    box-shadow: 3px 3px 8px 0px rgba(28,28,28,1);

    text-align:center;

    padding: 50px 0 0px 0;
`

const ResultContent = styled.div`
    width:90%;
    margin-left: 5%;
`

const TheAdd = styled.input`
    opacity: 0;
    pointer-events: none;
    cursor:default;
    disabled: true;
`;

const LoadingWrap = styled.div`
    width:100%; height:100%;
    display:grid;
    justify-content: center;
    align-items: center;
`;

const Main2 = ({history}) => {
    const [show, setShow] = useState(false);
    const [showPerson, setShowPerson] = useState(false);

    const [theData, setTheData] = useState();
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] =useState(false);
    const [nextLink, setNextLink] = useState();

    const [percent, setPercent] = useState([]);

    const [done, setDone] = useState(false);

    let { id } = useParams();

    const [leftPer, setLeftPer] = useState(0);
    const [rightPer, setRightPer] = useState(0);
    const [myAnswer, setMyAnswer] = useState(0);

    const [infoMsg, setInfoMsg] = useState("누구나 참여가능한 온라인 3초 설문");

    const [displayResult, setDisplayResult] = useState(false)
    const [searchDisplay, setSearchDisplay] = useState(false)

    const db = firebase.firestore();
    useEffect(() => {
        // CREATE NEW ID
        // let newid = '_' + Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
        
        setLoading(false);
        setDone(false);

        let myData;
        if(localStorage.getItem('sosudasu')){
            myData = JSON.parse(localStorage.getItem('sosudasu'))
        }else{
            myData = [
                // { id: '0', question: '첫번째 꺼에요', answer_one:"정답1", answer_two:"정답2~", answer_one_count:1, answer_two_count:0},
            ];
            localStorage.setItem('sosudasu', JSON.stringify(myData))
        }


        let dbWork = db.collection("question").doc("6QpyEuoFlECaqPcX2teg").get().then(doc => {
            let meme = doc.data();
            setOriginalData(meme);

            // need to process to get rid of data already answered
            let onlyInA = meme.questions.filter(comparer(myData));
            // let onlyInB = myData.filter(comparer(meme.questions));
            // let finalData = onlyInA.concat(onlyInB);
            let finalData = onlyInA;
            finalData.reverse();

            if(finalData.length > 0){
                if(id == null) {
                    setTheData(finalData[0]);
                    setPercent({
                        one : finalData[0].answer_one_count,
                        two: finalData[0].answer_two_count
                    });
                    setDisplayPercent(finalData[0].answer_one_count, finalData[0].answer_two_count);

                    setNextLink(finalData[1].id);
                } else {
                    let result = finalData.find(data => data.id === id);
                    if(result){
                        setTheData(result);
                        setPercent({
                            one : result.answer_one_count,
                            two: result.answer_two_count
                        });
                        setDisplayPercent(result.answer_one_count, result.answer_two_count);

                        let index = finalData.findIndex(x => x.id === id);

                        if(finalData.length - 1 === index){
                            setNextLink("nono");
                        }else{
                            setNextLink(finalData[index + 1].id);
                        }
                    } else {
                        // console.log("이미 답변을 했거나 존재하지 않는 페이지입니다");
                        setTheData(finalData[0]);
                        setPercent({
                            one : finalData[0].answer_one_count,
                            two: finalData[0].answer_two_count
                        });
                        setDisplayPercent(finalData[0].answer_one_count, finalData[0].answer_two_count);
                        setNextLink(finalData[1].id);
                        history.replace('/');
                    }
                }
            }else{
                let noMore = [
                    {question: "더이상 새로운 질문이 없습니다"},
                ];
                setTheData(noMore[0]);
                setNextLink("nono");
            }

            setLoading(true);

            return () => {
              // executed when unmount
              dbWork();
            }

        });
    }, [id]);


    const setDisplayPercent = (one, two) => {
        if(one == 0 && two == 0){
            one += 1;
            two += 1;
        }
        let left = Math.floor(one / (one + two) * 100);
        let right = Math.floor(two / (one + two) * 100);
        setLeftPer(left);
        setRightPer(right);        
    }

    const comparer = (otherArray) => {
        return function(current){
          return otherArray.filter(function(other){
            return other.id == current.id
          }).length == 0;
        }
    }
      

    const handleSkip = () => {
        history.push(`/main/${nextLink}`);
    }

    const handleButton = answer => {
        let newRow;
        if(!done){
            if(answer == 1){            
                let left = Math.floor((percent.one + 1) / (percent.one + percent.two + 1) * 100);
                let right = Math.floor((percent.two) / (percent.one + percent.two + 1) * 100);
                setLeftPer(left);
                setRightPer(right);
                setMyAnswer(left);
                updateDB(1);
            }else{
                let left = Math.floor((percent.one) / (percent.one + percent.two + 1) * 100);
                let right = Math.floor((percent.two + 1) / (percent.one + percent.two + 1) * 100);
                setLeftPer(left);
                setRightPer(right);
                setMyAnswer(right);
                updateDB(2);
            }
        }        
        setDisplayResult(true)
        setDone(true);
        // setTimeout(() => {
        //     if(nextLink !== "nono"){
        //         history.push(`/main/${nextLink}`);
        //     }
        // }, 1000);

        // save newRow to localstorage
        // add 1 to question in Firebase server

    }

    const goNextQuestion = () => {
        setDisplayResult(false)
        if(nextLink !== "nono"){
            history.push(`/main/${nextLink}`);
        }
    }


    // 이거 지우고 위의 코드에다가 그냥 같이 다 넣어버리자
    const updateDB = n => {
        // UPDATE FIREBASE
        let temp = originalData;
        temp.questions.map(data => {
            if(data.id == theData.id){
                if(n == 1){
                    data.answer_one_count = theData.answer_one_count + 1;
                }else if(n == 2){
                    data.answer_two_count = theData.answer_two_count + 1;
                }
            }
        });

        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").set({
            questions: temp.questions
        });

        //UPDATE LOCALSTORAGE
        let newRow;
        if(n == 1){
            newRow = { id: `${theData.id}`, question: `${theData.question}`, answer_one:`${theData.answer_one}`, answer_two:`${theData.answer_two}`, answer_one_count:1, answer_two_count:0};
        }else if(n == 2){
            newRow = { id: `${theData.id}`, question: `${theData.question}`, answer_one:`${theData.answer_one}`, answer_two:`${theData.answer_two}`, answer_one_count:0, answer_two_count:1};
        }
        let myData = [];
        if(localStorage.getItem('sosudasu')){
            myData = JSON.parse(localStorage.getItem('sosudasu'));
        }
        myData.push(newRow);
        myData = localStorage.setItem('sosudasu', JSON.stringify(myData));

        // ITS FOR CURRENT DATA HANDLER        
        setOriginalData(temp);
    }
    

    // UI Controll
    const onShowClick = () => {
      setShow(true);
      if(showPerson) {
        setShowPerson(false);
      }
    }
  
    const onShowClose = () => {
      setShow(false);
      onShowPersonClose();
    }
  
    const onShowPersonClick = () => {
      setShowPerson(true);
      if(show) {
        setShow(false);
      }
    }
  
    const onShowPersonClose = () => {
      setShowPerson(false);
    }  

    const handleSearch = keyword => {
        childRef.current.startSearch(keyword);
    }

    const handleEmpty = () => {
        if(searchDisplay){
            childRef.current.emptySearch();
        }
    }    

    const childRef = useRef(); 

    const handleClose = () => {
        setSearchDisplay(false);
    }

    const handleNothing = () => {}

    const handleShare = () =>{
        let meme = document.getElementById("foo");
        meme.select();
        meme.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        // alert("현재 페이지 주소를 복사했습니다");
        toast.info(`공유 주소가 복사되었습니다`, {hideProgressBar: true});
    }





    return (
    <>
    <Header>
        <Title>soda</Title>
        <UL>
            <LI onClick={()=> setSearchDisplay(true)}><IoIosSearch style={{color:'white'}} /></LI>
            <LI><Link to={'/person'} style={{color:'white'}}><AiOutlineUser /></Link></LI>
            <LI><Link to={'/create'} style={{color:'white'}}><MdAddCircleOutline /></Link></LI>
        </UL>
    </Header>

    <MainBody>
        <MainTop>
            <img src={Logo} width={200} height={200} />
        </MainTop>

        {
            loading ?
        <>
        <MainBelow>
            <H5>Question)</H5>
            <H4>{theData.question}</H4>
            <MainSub>
                <Span onClick={()=> handleShare()}>share this question</Span>

                <TheAdd id="foo" onChange={()=>handleNothing()} value={window.location.host + `/main/${theData.id}` }  />
            </MainSub>
            <MainDesc>
                Find out if your opinion belong<br />
                to major or minor
            </MainDesc>
            <AnswerButton onClick={()=>handleButton(1)}>
                {theData.answer_one}
            </AnswerButton>
            <AnswerButton onClick={()=>handleButton(2)}>
                {theData.answer_two}                
            </AnswerButton>
        </MainBelow>
        <BottomButton onClick={()=> handleSkip()}>
            skip this
        </BottomButton>
    </>
    : <LoadingWrap>
        <img src={LoadingGif} style={{width:"200px", height:"200px"}} />
    </LoadingWrap>
    }
    </MainBody>

    {
        displayResult ?
    <>
    <BlackBackground onClick={()=>goNextQuestion()}></BlackBackground>
    <ResultWrap onClick={()=>goNextQuestion()}>
        <img src={Logo} width={100} height={100} style={{ marginBottom:'30px' }} />
        <ResultContent>
            <AnswerButton>
                I think Yuri is the most beautify
            </AnswerButton>
            <button style={{display:'none'}}></button>
            <H5>
                95% people chose the same answer with you<br />
                You are a major on this issue
            </H5>
            <BottomButton>
                continue to other question
            </BottomButton>
        </ResultContent>
    </ResultWrap>
    </>
    : null
    }

    {
        searchDisplay ?
        <>
        <BlackBackground onClick={()=> setSearchDisplay(false)}></BlackBackground>
        <Search ref={childRef} onClose={handleClose} ParentSearch={handleSearch} ParentSearchEmpty={handleEmpty} />
        </>
        : null
    }

    </>
    )
}

export default Main2

