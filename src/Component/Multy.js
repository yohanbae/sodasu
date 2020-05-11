import React from "react";
import styled from "styled-components";
import useInput from "../useInput";
import {toast} from "react-toastify";
import firebase from "../base";

const Box = styled.div`
    width: 60vw;
    border-radius: 5px;
    padding:5px 20px;
`;

const Input = styled.input`
    width: 100%;
    padding-left:5px;
    font-size:14px;
    font-family: 'RecipeKorea';
    padding-top:5px;
    @media only screen and (max-width: 500px) {
        font-size:10px;
    }  
`;

const InputQuestion = styled.textarea`
    width: calc(100% - 10px);
    height:40px;
    padding-left:5px;
    font-size:12px;
    border:1px solid lightgray;
    border-radius:5px;
    resize: none;
    font-family: 'RecipeKorea';
    padding-top:5px;
`;
const InputAnswer = styled(Input)`
    width: calc(100% - 20px);
`

const AnswerBox = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-gap:20px;
`;

const Answer = styled.div`
    border-radius:5px;
    border:1px solid lightgray;
    padding:10px;
`;

const H5 = styled.h5`
    margin:0; margin-bottom:5px;
    font-family: 'RecipeKorea';
`;

const ButtonWrap = styled.div`
    display:grid;
    justify-content: flex-end;
`;

const Multy = () => {
    const question1 = useInput("");
    const answer_one1 = useInput("");
    const answer_two1 = useInput("");    

    const question2 = useInput("");
    const answer_one2 = useInput("");
    const answer_two2 = useInput("");    

    const question3 = useInput("");
    const answer_one3 = useInput("");
    const answer_two3 = useInput("");        

    const question4 = useInput("");
    const answer_one4 = useInput("");
    const answer_two4 = useInput("");    

    const question5 = useInput("");
    const answer_one5 = useInput("");
    const answer_two5 = useInput("");         

    const db = firebase.firestore();


    const randomBetween = (min, max) => {
        if (min < 0) {
            return Math.floor(min + Math.random() * (Math.abs(min)+max));
        }else {
            return Math.floor(min + Math.random() * max);
        }
    }

    const handleSubmit = () => {
        if(question1.value=="" || answer_one1.value=="" || answer_two1.value=="" ||
        question2.value=="" || answer_one2.value=="" || answer_two2.value=="" ||
        question3.value=="" || answer_one3.value=="" || answer_two3.value=="" ||
        question4.value=="" || answer_one4.value=="" || answer_two4.value=="" ||
        question5.value=="" || answer_one5.value=="" || answer_two5.value==""
        ) {
            toast.error("Please fill up all 5 information", {hideProgressBar: true});
            return;
        }

        let newId1 = Math.random().toString(36).substr(2, 9);
        let ans11 = randomBetween(300, 600);
        let ans12 = randomBetween(300, 600);
        let newData1 = { id: newId1, question: question1.value, answer_one: answer_one1.value, answer_two: answer_two1.value, answer_one_count:ans11, answer_two_count:ans12};

        let newId2 = Math.random().toString(36).substr(2, 9);
        let ans21 = randomBetween(300, 600);
        let ans22 = randomBetween(300, 600);
        let newData2 = { id: newId2, question: question2.value, answer_one: answer_one2.value, answer_two: answer_two2.value, answer_one_count:ans21, answer_two_count:ans22};

        let newId3 = Math.random().toString(36).substr(2, 9);
        let ans31 = randomBetween(300, 600);
        let ans32 = randomBetween(300, 600);
        let newData3 = { id: newId3, question: question3.value, answer_one: answer_one3.value, answer_two: answer_two3.value, answer_one_count:ans31, answer_two_count:ans32};

        let newId4 = Math.random().toString(36).substr(2, 9);
        let ans41 = randomBetween(300, 600);
        let ans42 = randomBetween(300, 600);
        let newData4 = { id: newId4, question: question4.value, answer_one: answer_one4.value, answer_two: answer_two4.value, answer_one_count:ans41, answer_two_count:ans42};

        let newId5 = Math.random().toString(36).substr(2, 9);
        let ans51 = randomBetween(300, 600);
        let ans52 = randomBetween(300, 600);
        let newData5 = { id: newId5, question: question5.value, answer_one: answer_one5.value, answer_two: answer_two5.value, answer_one_count:ans51, answer_two_count:ans52};       

        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
            questions: firebase.firestore.FieldValue.arrayUnion(newData1)
        });
        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
            questions: firebase.firestore.FieldValue.arrayUnion(newData2)
        });
        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
            questions: firebase.firestore.FieldValue.arrayUnion(newData3)
        });
        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
            questions: firebase.firestore.FieldValue.arrayUnion(newData4)
        });
        db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
            questions: firebase.firestore.FieldValue.arrayUnion(newData5)
        });

        toast.success("새로운 질문이 등록되었습니다. 감사합니다.", {hideProgressBar: true});
        // empty all input

        question1.setValue("");
        question2.setValue("");
        question3.setValue("");
        question4.setValue("");
        question5.setValue("");        

        answer_one1.setValue("");
        answer_two1.setValue("");
        
        answer_one2.setValue("");
        answer_two2.setValue("");

        answer_one3.setValue("");
        answer_two3.setValue("");

        answer_one4.setValue("");
        answer_two4.setValue("");

        answer_one5.setValue("");
        answer_two5.setValue("");

    }



    return (
        <>
        <h6>얼~ 비밀 페이지를 발견하셨군요. 여기서는 5개의 질문을 한번에 작성해서 올릴 수 있습니다</h6>

        <Box>
            <span style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 1</span>
            <InputQuestion maxLength="200" type="text" value={question1.value} onChange={question1.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
            <AnswerBox>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_one1.value} onChange={answer_one1.onChange} placeholder="예) 당연히 부먹이죠!" />
                </Answer>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_two1.value} onChange={answer_two1.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                </Answer>
            </AnswerBox>
        </Box>

        <Box>
            <span style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 2</span>
            <InputQuestion maxLength="200" type="text" value={question2.value} onChange={question2.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
            <AnswerBox>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_one2.value} onChange={answer_one2.onChange} placeholder="예) 당연히 부먹이죠!" />
                </Answer>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_two2.value} onChange={answer_two2.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                </Answer>
            </AnswerBox>
        </Box>
        <Box>
            <span style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 3</span>
            <InputQuestion maxLength="200" type="text" value={question3.value} onChange={question3.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
            <AnswerBox>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_one3.value} onChange={answer_one3.onChange} placeholder="예) 당연히 부먹이죠!" />
                </Answer>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_two3.value} onChange={answer_two3.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                </Answer>
            </AnswerBox>
        </Box>

        <Box>
            <span style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 4</span>
            <InputQuestion maxLength="200" type="text" value={question4.value} onChange={question4.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
            <AnswerBox>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_one4.value} onChange={answer_one4.onChange} placeholder="예) 당연히 부먹이죠!" />
                </Answer>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_two4.value} onChange={answer_two4.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                </Answer>
            </AnswerBox>
        </Box>


        <Box>
            <span style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 5</span>
            <InputQuestion maxLength="200" type="text" value={question5.value} onChange={question5.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
            <AnswerBox>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_one5.value} onChange={answer_one5.onChange} placeholder="예) 당연히 부먹이죠!" />
                </Answer>
                <Answer>
                <InputAnswer maxLength="20"  type="text" value={answer_two5.value} onChange={answer_two5.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                </Answer>
            </AnswerBox>
            <ButtonWrap>
            <button style={{padding:'10px', fontFamily: 'RecipeKorea', border:'none'}} onClick={()=>handleSubmit()}>SUBMIT</button>
            </ButtonWrap>
        </Box>


        </>
    )
}

export default Multy;