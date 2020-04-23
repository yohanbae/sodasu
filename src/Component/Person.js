import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import {FaSquare} from "react-icons/fa";
import firebase from "../base";
import loadingGif from "../assets/loading2.gif";
import OldList from "./OldList";

const PersonWrap = styled.div`
    display: grid;
    grid-template-columns:1fr 1fr;
    width:100%;
    height:100px;

    @media only screen and (max-width: 500px) {
        grid-template-columns:1fr;
        height:200px;
    }      
`;

const Wrap = styled.div`
    height:100px;
    display:grid;
    justify-content: center;
    align-items:center;
    text-align: center;
    position:relative;
`;
const Wrap2 = styled.div`
    height:100px;
    text-align:left;
    display:grid;
    align-items:left;
    @media only screen and (max-width: 500px) {
        text-align: center;
    }     
`;

const TheBar = styled.div`
    width: 100%;
    height:20px;
    border-radius:5px;
    position:absolute;
    bottom:15px;
    left: 0;
`;

const BarWrap = styled.div`
    width:200px;
    height:20px;
    border-radius:5px;
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
    
`;

const TheLeft = styled.div`
    position:absolute;
    left:0; top:0;
    width:20%;
    height:20px;
    background:red;
    opacity:0.5;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const TheRight = styled.div`
    position:absolute;
    right:0; top:0;
    width:80%;
    height:20px;
    background:blue;
    opacity:0.5;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const H3 = styled.h3`
    margin:0; padding:0;
    font-weight:100;
    font-size:20px;
    color: ${props => props.active ? `red` : `blue` };
    opacity: 0.8;
    margin-bottom:5px;
    font-family: 'RecipeKorea';
    margin-top:10px;
`;

const H4 = styled.h4`
    margin:0; padding:0;
    font-weight:100;
    font-size:15px;
    color:#1a1a1a;
    margin-bottom:5px;
    font-family: 'RecipeKorea';
    `;

const H6 = styled.h6`
    margin:0; padding:0;
    font-weight:100;
    font-size: 12px;
    color:#1a1a1a;
    margin-bottom:5px;
    font-family: 'RecipeKorea';
`;

const LoadingWrap = styled.div`
    width:100%; height:100%;
    display:grid;
    justify-content: center;
    align-items: center;
`;

const Person = () => {
    const [loading, setLoading] = useState(false);
    const [leftBar, setLeftBar] = useState(0);
    const [rightBar, setRightBar] = useState(0);

    const [myData, setMyData] = useState([]);
    const [theData, setTheData] = useState([]);

    const db = firebase.firestore();

    useEffect(() => {
        setLoading(false);

        let myData;
        if(localStorage.getItem('sosudasu')){
            myData = JSON.parse(localStorage.getItem('sosudasu'));
            setMyData(myData);
        }else{
            return null;
        }

        if(myData.length == 0){
            setLoading(true);
        }else{
            db.collection("question").doc("6QpyEuoFlECaqPcX2teg").get().then(doc => {
                let meme = doc.data();
                setTheData(meme.questions);

                // IMPORTANT!!!! DO NOT DELETE!
                let myLeft = 0;
                let myRight = 0

                myData.map(data => {
                    //Check my RIGHT / LEFT
                    // 내가 어느쪽을 선택했는가
                    let meLeft;
                    if(data.answer_one_count >= 1) {
                        meLeft = true;
                    }else{
                        meLeft = false;
                    }

                    // 이 질문의 소수/다수는 어느쪽인가?
                    let otherLeft;
                    let momo = meme.questions.find(val => val.id == data.id)
                    if(momo.answer_one_count > momo.answer_two_count) {
                        otherLeft = true;
                    }else{
                        otherLeft = false;
                    }

                    // 나의 대답은 소수쪽인가 다수쪽인가?
                    if(otherLeft == true){ // 이 문제의 다수는 왼쪽것입니다.
                        if(meLeft == true){ // 나의 대답도 왼쪽에 있습니다.
                            myRight++; // 그러므로 나는 다수입니다. 다수값을 하나 올립니다.
                        }else{
                            myLeft++; // 다수가 아니므로, 소수값을 하나 올립니다.
                        }
                    }

                    if(otherLeft == false){ // 이 문제의 다수는 오른쪽 것입니다.
                        if(meLeft == true){ // 나의 대답은 왼쪽에 있습니다.
                            myLeft++; // 그러므로 나는 소수입니다
                        }else{
                            myRight++; 
                        }
                    }                    


                    // if(meLeft == true && otherLeft == true) {
                    //     myLeft++;
                    // }else{
                    //     myRight++;
                    // }

                    console.log("답은", meLeft, myLeft, myRight);

                });

                let lele = Math.floor(myLeft / (myLeft + myRight) * 100);
                let riri = Math.floor(myRight / (myLeft + myRight) * 100);

                setLeftBar(lele);
                setRightBar(riri);
                setLoading(true);
            });
        }

    }, []);


    return (
        <>
        {
            loading ?
            
            (myData.length == 0)
            ? <Wrap>
                <H4>아직 정보가 없습니다</H4>
                <H6>먼저 설문에 답변을 해주세요</H6>
              </Wrap>
            : 
            <>
            <PersonWrap>
                <Wrap>
                    <AiOutlineUser style={{fontSize:'80px', color: `${leftBar > rightBar ? 'red' : 'blue'}`, opacity:'0.3', textAlign:'center'}} />
                    <TheBar>
                        <BarWrap>     
                            <TheLeft style={{width: `${leftBar}%` }}></TheLeft>
                            <TheRight style={{width: `${rightBar}%` }}></TheRight>
                            <ThePer>
                                {
                                    (leftBar > rightBar) ? `${leftBar}%` : `${rightBar}%`
                                }
                            </ThePer>
                        </BarWrap>
                    </TheBar>
                </Wrap>
                <Wrap2>
                    <div>
                    <H3 active={leftBar > rightBar}>
                        당신은
                        {
                            (leftBar == rightBar) ?
                            <b> 중립</b>
                            :
                                (leftBar > rightBar) ?
                                <b> 소수</b>
                                : <b> 다수</b>
                        }
                        에 속합니다</H3>
                    <H4>
                    {
                        (leftBar == rightBar) ?
                        null
                        :
                            (leftBar > rightBar) ?
                            `${leftBar}%의 사람들이 당신에게 동의하지 않습니다`
                            : `${rightBar}%의 사람들이 당신에게 동의합니다`
                        }
                    </H4>
                    {
                        (leftBar == rightBar) ?
                        null
                        :
                            (leftBar > rightBar) ?
                            <H6><FaSquare style={{color:'red', opacity:'0.8', fontSize:'9px'}} /> 소수에 속할수록 아이콘이 붉은 빛을 띕니다</H6>
                            : <H6><FaSquare style={{color:'blue', opacity:'0.8', fontSize:'9px'}} /> 다수에 속할수록 아이콘이 푸른 빛을 띕니다</H6>
                        }

                    </div>
                </Wrap2>
            </PersonWrap>
            <OldList myData={myData} theData={theData} />
            </>
            :
            <LoadingWrap><img src={loadingGif} style={{width:'30px', height:'30px'}} /></LoadingWrap>
        }
        </>
    )
}
export default Person;