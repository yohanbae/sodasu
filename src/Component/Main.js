
import React, {useState, useEffect, useRef} from 'react';
import { useParams, Link } from 'react-router-dom'
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

import ListComponent from "./ListComponent";
import Person from "./Person";

import { AiOutlineUser } from "react-icons/ai";
import LoadingGif from "../assets/loading.gif";
import {toast} from "react-toastify";
import firebase from "../base";

import '../App.css';
import logo from "../assets/logo.png";

const BodyWrap = styled.div`
  height:calc(100vh - 120px);
  width: 100%;
  display:grid;
  grid-template-columns: 20% 60% 20%;
  z-index:1;

  @media only screen and (max-width: 768px) {
    grid-template-columns: 10% 80% 10%;    
  }
  font-family: 'RecipeKorea';
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr 90vw 1fr;
    height: 90vh;
    overflow:hidden;
  }

`;

const CenterBox = styled.div`
  height:calc(90vh);
  width:100%;
  display:grid;
  justify-content:center;
  align-items: center;
  position:relative;
`;

const TopTitleText = styled.div`
  position: absolute;
  left:0; top:50px;
  color: rgba(69, 69, 69, 0.8);
  font-size: 13px;

  font-family: 'GmarketSansMedium';
`;

const QuestionPosition = styled.div`
  width: 60vw;
  @media only screen and (max-width: 768px) {
    min-width:80vw;
  }
  @media only screen and (max-width: 500px) {
    min-width:90vw;
  }  
  z-index:10;
`;

const QuestionWrap = styled.div`
  padding:20px 0px;
  border-radius:10px;
  box-sizing: border-box;
  z-index:100;
  position:relative;

`;

const IconBox = styled.div`
  width:100%; height:300px;
  position:absolute; left: 0px; bottom:-50px;
  z-index:-10;
  text-align:center;
`;


const QuestionTitle = styled.p`
  font-weight:500;
  font-size: 20px;
  margin-bottom:40px;
  color:#454545;
`

const QuestionButtonWrap = styled.div`
  display:grid;
  grid-template-columns: 1fr 100px 1fr;
  text-align:center;  
`;

const SkipButtonWrap = styled.div`
  margin-top:20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding:0 0px;
  @media only screen and (max-width: 500px) {
    height:50px;
    position:absolute;
    left:0px;
    bottom:0px;
  }
`
  
const SkipButton = styled.button`
    border:none;
  font-size:15px;
  padding:3px 20px;
  background: rgba(52, 101, 235, 0.7);
  cursor:pointer;
  border-radius:3px;
  color:white;
  font-family: 'GmarketSansMedium';
  padding-top:5px;
  font-weight:100;
  &:hover{
    background: rgba(52, 101, 235, 1);
  }
`;

const QuestionButton = styled.button`
  padding:10px;
  transition:200ms;  
  font-size:15px;
  cursor:pointer;
  &:focus{
    outline:none;
  }
`;

const ButtonLeft = styled(QuestionButton)`
  border: 2px solid rgba(212, 17, 11, 0.5);
  color: rgba(212, 17, 11, 1);
  background:rgba(212, 17, 11, 0);
  border-bottom-left-radius: 10px;
  font-family: 'GmarketSansMedium';
  padding-top:15px;
  font-weight:300;
  &:hover{
    background:rgba(212, 17, 11, 1);    
    color: white;
  }
`;
const ButtonRight = styled(QuestionButton)`
  border: 2px solid rgba(56, 69, 245, 0.5);
  color: rgba(56, 69, 245, 1);
  background:rgba(56, 69, 245, 0);
  border-bottom-right-radius: 10px;
  font-family: 'GmarketSansMedium';
  padding-top:15px;
  font-weight:300;
  &:hover{
    background:rgba(56, 69, 245, 1);
    color: white;    
  }
`;

const ButtonCenter = styled.div`
  width:100%; height:100%;
  display:grid;
  align-items:center;
  justify-content:center;
`;

const HiddenWindow = styled.div`
    border-radius: 5px;
    width:40%;
    height:calc(100vh - 60px);
    position: absolute;
    left: 40%;
    top: 50px;
    z-index:100;
    background:white;
    @media only screen and (max-width: 768px) {
      width:98%;
      left:1%;
      height:calc(100vh - 80px);
    }    
    @media only screen and (max-width: 500px) {
      width:98%;
      left:1%;
        height:calc(100vh - 80px);
      }        
`;

const HiddenPerson = styled(HiddenWindow)`
    left:20%;
    background:#fafafa;
    width:60%;
    height:calc(100vh - 60px);
    z-index:990;
    @media only screen and (max-width: 768px) {
      width:98%;
      left:1%;
      height: calc(100vh - 80px);
    }        
    @media only screen and (max-width: 500px) {
      width:98%;
      left:1%;
        height: calc(100vh - 80px);
    }     
`

const DisplayPercent = styled.div`
    width:100%;
    height:20px;
    margin-top:20px;
    position:relative;
`;

const TheBar = styled.div`
    width: 100%;
    height:20px;
    position:absolute;
    top:0;
    left: 0;
`;

const BarWrap = styled.div`
    width:200px;
    height:20px;
    border:2px solid white;
    position: absolute;
    left: 50%;
    top: 50%;    
    transform: translate(-50%, -50%);
`;

const ThePer = styled.div`
    position: absolute;
    top:0; left:0;
    width:100%;
    text-align:center;
    color:white;
    height:20px;
    font-size:12px;
    display:grid;
    align-items:center;
    padding-top:2px;
    font-weight:100;
`;
const TheLeft = styled.div`
    position:absolute;
    left:0; top:0;
    width:0%;
    height:20px;
    background:red;
    opacity:0.5;
    transition:300ms;
`;

const TheRight = styled.div`
    position:absolute;
    right:0; top:0;
    width:0%;
    height:20px;
    background:blue;
    opacity:0.5;
    transition:300ms;
`;

const TheAdd = styled.input`
    opacity: 0;
    pointer-events: none;
    cursor:default;
    disabled: true;
    `;

const CloseButton = styled.div`
    position: fixed;
    width:50px;
    height:50px;
    font-size:40px;
    z-index: 999;
    right:30px; bottom:20px;
    cursor:pointer;
    @media only screen and (max-width: 500px) {
      width:30px;
      height:30px;
      font-size:30px;
      right:10px; bottom:10px;
  }    
`;

function Main({history}) {
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

    const [infoMsg, setInfoMsg] = useState("얼마나 많은 사람들이 나와 같은 생각을 갖고 있을까? 질문에 답변 해보세요");

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


        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").get().then(doc => {
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
                        console.log("Found ", result);
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
                        console.log("이미 답변을 했거나 존재하지 않는 페이지입니다");
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

            // MSG
            const msg = [
              
              "질문에 답변하면 다른 사람들의 대답과 비교하여 당신의 대중성을 파악해 줍니다",
              "참여하고 싶지 않은 설문에는 '스킨하기' 버튼을 눌러주세요",
              "스킵한 질문은 재접속시에 다시 볼수있어요",
              "내가 대답한 답변은 '나의 성향보기'에서 확인가능합니다",
              "'질문 만들기'를 클릭해 원하시는 설문을 작성할 수 있습니다",
              "얼마나 많은 사람들이 나와 같은 생각을 갖고 있을까? 질문에 답변 해보세요",
            ];
            let i = 0;
            setInterval(() => {
              if(i == msg.length) i = 0;
              setInfoMsg(msg[i]);
              i++;
            }, 4000);

            setLoading(true);
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
        setDone(true);
        console.log(newRow);
        setTimeout(() => {
            if(nextLink !== "nono"){
                history.push(`/main/${nextLink}`);
            }
        }, 500);

        // save newRow to localstorage
        // add 1 to question in Firebase server

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
        if(show){
            childRef.current.emptySearch();
        }
    }    

    const childRef = useRef(); 

    const handleClose = () => {
        setShow(false);
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
        <Header ShowClick={onShowClick} ShowPersonClick={onShowPersonClick} ParentSearch={handleSearch} ParentSearchEmpty={handleEmpty}/>
  
        <BodyWrap onClick={()=> onShowClose()}>
        <div></div> {/* LEFT SPACE */}
  
          <CenterBox>
            {
            loading ?
            <>
            <TopTitleText>{infoMsg}</TopTitleText>
            <QuestionPosition>
              <QuestionWrap>
                <QuestionTitle>
                    Q. {theData.question}
                </QuestionTitle>
                <QuestionButtonWrap>
                  <ButtonLeft onClick={()=>handleButton(1)}>{theData.answer_one}</ButtonLeft>
                  <ButtonCenter>
                    <img src={logo} width={20} height={20} />
                  </ButtonCenter>
                  <ButtonRight onClick={()=>handleButton(2)}>{theData.answer_two}</ButtonRight>
                </QuestionButtonWrap>
                <IconBox>
                  <AiOutlineUser style={{fontSize:"300px", opacity:"0.1", color:"blue", zIndex:-10 }} />
                </IconBox>
              </QuestionWrap>

              <DisplayPercent style={{ opacity: `${ done ? 1 : 0}` }}>
                 <TheBar>
                    <BarWrap>
                        <TheLeft style={{width:`${leftPer}%`}}></TheLeft>
                        <TheRight style={{width: `${rightPer}%`}}></TheRight>
                        <ThePer>당신의 대답은 {myAnswer}%</ThePer>
                    </BarWrap>
                 </TheBar>                                   

              </DisplayPercent>

              <SkipButtonWrap>
                <div>
                <SkipButton onClick={()=> handleShare()}>공유하기</SkipButton>
                <TheAdd id="foo" onChange={()=>handleNothing()} value={window.location.host + `/main/${theData.id}` }  />
                </div>
                <div style={{textAlign:'right'}}>
                {
                    (nextLink == "nono") 
                    ?
                    // <SkipButton>질문 만들기</SkipButton>                    
                    <Link to={`/create`} style={{  fontFamily: 'RecipeKorea'}}>질문 만들기</Link>
                    :
                    <SkipButton onClick={()=> handleSkip()}>스킵하기</SkipButton>
                }
                {/* <Link to={`/${nextLink}`}>SKIP</Link> */}
                </div>
              </SkipButtonWrap>



            </QuestionPosition>
            </>
            : <div>
                <img src={LoadingGif} style={{width:"200px", height:"200px"}} />
              </div>
            }
          </CenterBox>
  
          <div></div> {/* RIGHT SPACE */}
          
        </BodyWrap>      
  
        {/* Hidden Window */}
        {
          show ? 
            <>
                <HiddenWindow><ListComponent ref={childRef} onClose={handleClose} /></HiddenWindow> 
                <CloseButton onClick={()=>onShowClose()}>X</CloseButton>
            </>
            : null
        }      
        {
          showPerson ? 
          <>
            <HiddenPerson><Person /></HiddenPerson>
            <CloseButton onClick={()=>onShowClose()}>X</CloseButton>
            </> 
            : null
        }


        <Footer />
      </>
    );
  }
  
  export default Main;
  