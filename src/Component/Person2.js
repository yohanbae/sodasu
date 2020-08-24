import React, {useEffect, useState} from "react";
import styled from "styled-components";

import { MdBackspace } from "react-icons/md";

import firebase from "../base";
import Logo from "../images/logo1.png"




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
    padding:0; margin;
    float:right;
    text-align:right;
    padding-right:15px;
`
const LI = styled.li`
    padding:0; margin:0;
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

// const H5 = styled.h5`
//     margin:0; padding:0;
//     font-weight: 400;
// `

// const H4 = styled(H5)`
//     font-size: 20px;
// `

// const MainSub = styled.div`
//     font-size:12px;
//     overflow:hidden;
//     margin-top:10px;
//     margin-bottom:30px;
// `
// const Span = styled.span`
//     margin-left: 20px;
//     float:right;
//     color:gray;
// `

const MainDesc = styled.div`
    text-align: center; 
    font-weight:400;
    color:gray;
    font-size:14px;
    margin-bottom:30px;
`

// const AnswerButton = styled.button`
//     border-radius:10px;
//     width:100%;
//     color:white;
//     background: #3863e1;
//     padding: 10px 5px;
//     border:none;
//     margin-bottom:10px;
//     font-size:14px;
//     font-family: 'Quicksand', sans-serif;
//     cursor:pointer;
//     &:focus { outline : none; }
//     &:last-child {
//         border:1px solid #3863e1;
//         background:none;
//         color:#3863e1;
//         font-weight: 600;
//     }
// `

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

const PersonResult = styled.div`
    font-size:30px;
    color: #3863e1;
    text-align:center;
    font-weight: 400;
    margin-bottom:20px;
`
const PersonConc = styled.div`
    text-align:center;
    font-weight: 400;
    color:black;
    margin:20px 0;
    font-size:18px;
`

const Person2 = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [leftBar, setLeftBar] = useState(0);
    const [rightBar, setRightBar] = useState(0);

    const [myData, setMyData] = useState([]);
    const [theData, setTheData] = useState([]);

    const db = firebase.firestore();

    useEffect(() => {
        setLoading(false);
        let dbWork;
        let myData;
        if(localStorage.getItem('sosudasu')){
            myData = JSON.parse(localStorage.getItem('sosudasu'));
            setMyData(myData);
        }else{
            return null;
        }

        if(myData.length === 0){
            setLoading(true);
        }else{
            let dbWork = db.collection("question").doc("6QpyEuoFlECaqPcX2teg").get().then(doc => {
                let meme = doc.data();
                setTheData(meme.questions);

                // IMPORTANT!!!! DO NOT DELETE!
                let myLeft = 0;
                let myRight = 0

                if(myData.length === 1){
                    let checkFirst = meme.questions.find(val => val.id === myData[0].id);
                    if(!checkFirst){
                        setMyData([]);
                        setLoading(true);
                        return null;
                    } 
                        
                }

                myData.map(data => {
                    //Check my RIGHT / LEFT
                    // 내가 어느쪽을 선택했는가
                    let meLeft;
                    if(data.answer_one_count >= 1) {
                        meLeft = true;
                    }else{
                        meLeft = false;
                    }
                    
                    let momo = meme.questions.find(val => val.id === data.id);
                    // 서버측에도 똑같은 질문이 남아있는지 확인해보자.
                    // 없다면 다음 data.map index로 넘어가 작업을 계속 수행하시오.
                    if(momo){ 
                        // 이 질문의 소수/다수는 어느쪽인가?
                        let otherLeft;
                        if(momo.answer_one_count > momo.answer_two_count) {
                            otherLeft = true;
                        }else{
                            otherLeft = false;
                        }
    
                        // 나의 대답은 소수쪽인가 다수쪽인가?
                        if(otherLeft === true){ // 이 문제의 다수는 왼쪽것입니다.
                            if(meLeft === true){ // 나의 대답도 왼쪽에 있습니다.
                                myRight++; // 그러므로 나는 다수입니다. 다수값을 하나 올립니다.
                            }else{
                                myLeft++; // 다수가 아니므로, 소수값을 하나 올립니다.
                            }
                        }
    
                        if(otherLeft === false){ // 이 문제의 다수는 오른쪽 것입니다.
                            if(meLeft === true){ // 나의 대답은 왼쪽에 있습니다.
                                myLeft++; // 그러므로 나는 소수입니다
                            }else{
                                myRight++; 
                            }
                        }
                    }

                    let lele = Math.floor(myLeft / (myLeft + myRight) * 100);
                    let riri = Math.floor(myRight / (myLeft + myRight) * 100);
    
                    setLeftBar(lele);
                    setRightBar(riri);
                    setLoading(true);      

                });


            });
        }
        return () => {
            // executed when unmount
            if(dbWork) dbWork();
        }
    }, []);


    return (
    <>
    <Header>
        <Title>soda</Title>
        <UL>
            <LI><MdBackspace onClick={()=> history.goBack()} /></LI>
        </UL>
    </Header>

    <MainBody>
        <MainTop>
            <img src={Logo} width={200} height={200} />
        </MainTop>

        <MainBelow>
            <PersonResult>
                {
                    (leftBar === rightBar) ?
                    <b>NEUTRALITY</b>
                    :
                        (leftBar > rightBar) ?
                        <b>MINOR</b>
                        : <b>MAJOR</b>
                }                

            </PersonResult>
            <MainDesc>
                {/* 당신은 1000개의 질문 중<br />
                20개에 답변했습니다<br /><br /> */}

                {
                (leftBar === rightBar) ?
                        null
                        :
                            (leftBar > rightBar) ?
                            `${leftBar}% people don't agree with your opinions`
                            : `${rightBar}% people agree with your opinions`
                }                
            </MainDesc>
            <PersonConc>
            {
                (leftBar === rightBar) ?
                <b> You belong to MIDDLE</b>
                :
                    (leftBar > rightBar) ?
                    <b> You belong to MINOR</b>
                    : <b> You belong to MAJOR</b>
            }            
            
            </PersonConc>
            {/* <AnswerButton>
                review past questions
            </AnswerButton> */}
            <BottomButton onClick={()=> history.goBack()}>
                go back
            </BottomButton>
        </MainBelow>
    </MainBody>

    </>
    )
}

export default Person2

