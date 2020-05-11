import React, {useEffect, useState, forwardRef, useRef, useImperativeHandle} from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import firebase from "../base";
import LoadingGif from "../assets/loading.gif";
import "../App.css";

const Wrap = styled.div`
    width:100%;
    margin-top:0px;
    height:calc(70vh);

`;

const SelectTopic = styled.span` 
    margin:0;
    padding:0;
`;

const TopicTop = styled(SelectTopic)`
    margin-bottom:0px;
    display:grid;
    grid-template-columns: 1fr 90px 70px;
    height:40px;
`;
const TopicBottom = styled(SelectTopic)`
    display:flex;
    justify-content: flex-end;
    margin-top:10px;
    position: absolute;
    bottom:0; right:0;
`;

const ButtonPick0 = styled.button`
    border-radius:5px;
    border:1px solid rgba(242, 242, 242, 0);
    font-size:14px;
    margin:0;
    color:#454545;
    padding:3px 10px;
    padding-top:10px;
    text-align:left;
    background:none;
    font-family: 'GmarketSansMedium';
    
    &:focus{
        outline: none;
    }
`;


const PickButton = styled.button`
    border-radius:5px;
    margin:0;
    border:1px solid rgba(242, 242, 242, 0);
    font-size:14px;
    color:#454545;
    padding:3px 10px;
    text-align:center;
    cursor:pointer;
    font-family: 'GmarketSansMedium';
    `;

const ButtonPick1 = styled(PickButton)`
    margin-right:20px;
    background: ${props => props.active ? `rgba(242, 242, 242, 0)` : `rgba(242, 242, 242, 0.8)` };
`;
const ButtonPick2 = styled(PickButton)`
    background: ${props => props.active ? `rgba(242, 242, 242, 0.8)` : `rgba(242, 242, 242, 0)` };
`;


const ListWrap = styled.div`
    margin-top:10px;
    height:calc(70vh - 50px);
    overflow-y: scroll;
    padding-right:10px;
    
    background: white;
    border-radius:3px;
    &::-webkit-scrollbar {
        width: 10px;
        border-radius:3px;
    }
       
    &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
    }
    
    &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    outline: 1px solid slategrey;
    border-radius:3px;
    }

`;

const ListLi = styled.div`
    margin-bottom:10px;
    font-size:12px;
    color:#454545;
    cursor:pointer;

    border-radius:5px;
    border:1px solid rgba(242, 242, 242, 0.6);
    background: rgba(242, 242, 242, 0.6);
    
    display:grid;
    grid-template-columns: 20px 1fr 20px;
    grid-gap: 10px;

    padding:3px 0px 3px 10px;

    &:hover{
        background: rgba(217, 217, 217, 0.7);        
    }
`;
const ListQ = styled.span`
    font-size:20px;
    height:100%;
    display:grid;
    align-items: center;
    margin-top:-5px;
`;

const ListTitle = styled.div`
    display:grid;
    align-items:center;
    font-family: 'GmarketSansMedium';
`;

const Point = styled.div`
    width:6px; height:6px;
    border-radius:50%;
    background: gray;
    
`;

const LoadingWrap = styled.div`
    width:100%; height:100%;
    display:grid;
    justify-content: center;
`;

const ListComponent = forwardRef(({props, onClose}, ref) => {

    const [list, setList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRecent, setIsRecent] = useState(true);

    const db = firebase.firestore();
    
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
        <Wrap>
            {
            loading ?
            <>
            <TopicTop>
                <ButtonPick0>질문목록</ButtonPick0>
                <ButtonPick1 active={isRecent} onClick={() => handleHot()}>화제성</ButtonPick1>
                <ButtonPick2 active={isRecent} onClick={() => handleRecent()}>최근</ButtonPick2>
            </TopicTop>        
            <ListWrap>
                {
                    list.map((data) => (
                        <Link to={`/main/${data.id}`}  key={data.id}>
                        <ListLi onClick={()=>handleClick()}> 
                            <ListQ>Q</ListQ>              
                            <ListTitle>{data.question}</ListTitle>
                            <ListTitle><Point /></ListTitle>                
                        </ListLi>
                        </Link>
                    ))

                }

            </ListWrap>
            <TopicBottom>
                {/* <ButtonPick1>나의답변</ButtonPick1>
                <ButtonPick1>소수답변</ButtonPick1>
                <ButtonPick2>다수답변</ButtonPick2> */}
            </TopicBottom>  
            </>
            : <LoadingWrap>
                <img src={LoadingGif} style={{width:'100px', height:'100px'}} />
                </LoadingWrap>
            }
        </Wrap>
    )
});

export default ListComponent;