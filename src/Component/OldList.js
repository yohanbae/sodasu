import React, {useEffect, useState} from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";
import "../App.css";

const OldWrap = styled.div`
    width:100%; 
    height:calc(80vh - 100px);
    @media only screen and (max-width: 500px) {
        height: 100%;
    }
`;

const H5 = styled.p`
    height:50px;
    font-size:13px;    
    padding:0; margin:0;
    margin-left:10px;
    display:grid;
    align-items:center;
    font-family: 'GmarketSansMedium';
`;

const ListWrap = styled.div`
    width:100%; height:calc(100% - 50px);
    overflow-y: scroll;
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
width:calc(100% - 20px);
    margin-bottom:10px;
    font-size:14px;
    color:#454545;
    cursor:pointer;

    border-radius:5px;
    border:1px solid rgba(242, 242, 242, 0.6);
    background: rgba(242, 242, 242, 0.6);
    
    display:grid;
    grid-template-columns: 20px 70% 1fr 20px;
    grid-gap: 10px;

    padding:3px 0px 3px 10px;
    font-family: 'GmarketSansMedium';
    &:hover{
        background: rgba(217, 217, 217, 0.7);        
    }
`;
const ListQ = styled.span`
    font-size:20px;
    height:100%;
    display:grid;
    align-items:center;
    font-family: 'GmarketSansMedium';
`;

const ListTitle = styled.div`
    display:grid;
    align-items:center;
    font-family: 'GmarketSansMedium';
    font-weight:100;
`;

const Point = styled.div`
    width:6px; height:6px;
    border-radius:50%;
    background: ${props => props.active ? `red` : `blue` };
        
`;

const DataWrap = styled.div`
    width:100%;
`
const QuestionP = styled.p`
    padding:0; margin:0;
    font-size:12px;
    font-family: 'GmarketSansMedium';
    color: ${props => props.active ? `red` : `blue` };
    @media only screen and (max-width: 500px) {
        font-size:10px;
    }     
`;
const QuestionP2 = styled(QuestionP)`
    padding:0; margin:0;
    font-size:7px;
    color: ${props => props.active ? `red` : `blue` };
    text-align : ${props => props.active ? `left` : `right` };
`;


const BarWrap = styled.div`
    width:100%;
    height:5px;
    border-radius:5px;
    position: relative;
`;

const TheLeft = styled.div`
    position:absolute;
    left:0; top:0;
    width:20%;
    height:5px;
    background:red;
    opacity:0.5;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const TheRight = styled.div`
    position:absolute;
    right:0; top:0;
    width:80%;
    height:5px;
    background:blue;
    opacity:0.5;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
`;

const NextButton = styled.button`
    margin-top:10px;
    float:right;
    background:none;
    border-radius:3px;
    font-size:13px;
    border:1px solid lightgray;
    cursor: pointer;
    font-family: 'GmarketSansMedium';
    padding-top:5px;
`;

const OldList = ({myData, theData}) => {

    const [page, setPage] = useState(0);
    const [pageEnd, setPageEnd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        console.log('initial', page);
        setLoading(false);

        let pageData = [];
        let temp = [];

        let total = myData.length;
        let totalPage = Math.ceil(total / 15) - 1;
        let start = page * 15;

        if(page == totalPage) {
            pageData = myData.slice(start, total);
            setPageEnd(true);
        }else{
            pageData = myData.slice(start, start+15);
        }
        
        pageData.map(data => {
            let meLeft;
            let myAnswer;
            if(data.answer_one_count >= 1) {
                meLeft = true;
                myAnswer = data.answer_one;
            }else{
                meLeft = false;
                myAnswer = data.answer_two;
            }

            // IMPORT!!!! 전부다 필요한 코드야. PAGINATION 테스트하기위해 잠시 지움

            let momo = theData.find(val => val.id == data.id);
            //서버측에도 동일한 질문이 있는지 확인할 것
            if(momo){
                let otherLeft;
                if(momo.answer_one_count > momo.answer_two_count) {
                    otherLeft = true;
                }else{
                    otherLeft = false;
                }            
    
                let myLeft;
                // 나의 대답은 소수쪽인가 다수쪽인가?
                if(otherLeft == true){ // 이 문제의 다수는 왼쪽것입니다.
                    if(meLeft == true){ // 나의 대답도 왼쪽에 있습니다.
                        myLeft = false; // 그러므로 나는 다수입니다. myLeft을 true로.
                    }else{
                        myLeft = true; // 다수가 아니므로, 소수값을 하나 올립니다.
                    }
                }
    
                if(otherLeft == false){ // 이 문제의 다수는 오른쪽 것입니다.
                    if(meLeft == true){ // 나의 대답은 왼쪽에 있습니다.
                        myLeft = true; // 그러므로 나는 소수입니다
                    }else{
                        myLeft = false; 
                    }
                }       
                
    
                let total = momo.answer_one_count + momo.answer_two_count;
    
                temp.push({
                    id: data.id,
                    question: data.question,
                    status: myLeft,
                    leftPer: Math.floor(momo.answer_one_count / total * 100),
                    rightPer: Math.floor(momo.answer_two_count / total * 100),
                    myAnswer
                });
            }

        });
        // IMPORT!!!! 전부다 필요한 코드야. PAGINATION 테스트하기위해 잠시 지움

        setResultData(temp);
        setLoading(true);
    }, [page]);

    const handlePage = () => {
        let tempPage = page;
        setPage(tempPage + 1);
    }


    return(
        <>
        {
            loading ?
            <OldWrap>
                <H5>내가 답변한 목록</H5>
                <ListWrap>
                    {
                        resultData.map(data => (
                        <ListLi key={data.id} data-tip={
                            data.status ?  //나는 소수입니다
                                (data.leftPer > data.rightPer) ?
                                `당신의 의견은 전체의 ${data.rightPer}% 입니다. 다수가 당신과 동의하지 않습니다` : `당신의 의견은 전체 ${data.leftPer}% 입니다. 다수가 당신과 동의하지 않습니다.`
                            : 
                            //나는 다수입니다
                                (data.leftPer > data.rightPer) ?
                                `당신의 의견은 전체의 ${data.leftPer}% 입니다. 다수가 당신과 동의합니다.` : `당신의 의견은 전체 ${data.rightPer}% 입니다. 다수가 당신과 동의합니다.`
                        }> 
                            <ListQ>Q</ListQ>              
                            <ListTitle>{data.question}</ListTitle>
                            <DataWrap>
                                <QuestionP active={data.status}>{data.myAnswer}</QuestionP>
                                <BarWrap>
                                {
                                (data.leftPer > data.rightPer) ?
                                <>
                                    <TheLeft style={{width: `${data.rightPer}%` }}></TheLeft>
                                    <TheRight style={{width: `${data.leftPer}%` }}></TheRight>
                                </> :
                                <>
                                    <TheLeft style={{width: `${data.leftPer}%` }}></TheLeft>
                                    <TheRight style={{width: `${data.rightPer}%` }}></TheRight>
                                </>
                                }
                                    {/* <TheLeft style={{width: `${data.leftPer}%` }}></TheLeft>
                                    <TheRight style={{width: `${data.rightPer}%` }}></TheRight> */}
                                </BarWrap>
                            </DataWrap>
                            <ListTitle>
                                <Point active={data.status} />
                            </ListTitle>                
                        </ListLi>   
                        ))
                    }
                    
                {
                        pageEnd ? <NextButton>마지막 페이지입니다</NextButton> : <NextButton onClick={()=>handlePage()}>더보기</NextButton>                
                    }      
                </ListWrap>
                <ReactTooltip place='bottom' />          
            </OldWrap>
            :
            <div>Loading</div>
        }
        </>
    )
}

export default OldList;