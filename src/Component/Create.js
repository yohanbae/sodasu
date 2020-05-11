import React, {useState} from "react";
import styled from "styled-components";
import HeaderCreate from "./HeaderCreate";
import Footer from "./Footer";
import useInput from "../useInput";
import {toast} from "react-toastify";
import firebase from "../base";
import ReCAPTCHA from "react-google-recaptcha";

const Wrap = styled.div`
    height: 100vh;
    width:100vw;
    display:grid;
    justify-content: center;
`;

const Box = styled.div`
    width: 60vw;
    border-radius: 5px;
    padding:50px 20px;
    margin-top:30px;
    @media only screen and (max-width: 768px) {
    }
    @media only screen and (max-width: 500px) {
        width:90vw;
    }    
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
    height:80px;
    padding-left:5px;
    font-size:14px;
    margin-bottom:30px;
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
    margin-bottom:20px;
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
    margin-top:30px;
`;

const Create = ({history}) => {
    const question = useInput("");
    const answer_one = useInput("");
    const answer_two = useInput("");    

    const [isVerified, setIsVerified] = useState(false);
    const db = firebase.firestore();

    const handleSubmit = () => {
        if(isVerified){
            if(question.value=="" || answer_one.value=="" || answer_two.value=="") {
                toast.error("Please fill up all information", {hideProgressBar: true});
                return;
            }

            let newId = '_' + Math.random().toString(36).substr(2, 9);
            let newData = { id: newId, question: question.value, answer_one: answer_one.value, answer_two: answer_two.value, answer_one_count:0, answer_two_count:0}

            db.collection("question").doc("6QpyEuoFlECaqPcX2teg").update({
                questions: firebase.firestore.FieldValue.arrayUnion(newData)
            });

            toast.success("새로운 질문이 등록되었습니다. 감사합니다.", {hideProgressBar: true});
            history.push('/');
        }else {
            toast.error("Please verify you are not a robot", {hideProgressBar: true});
        }

    }
    
    const verifyCallback = (response) => {
        if(response) setIsVerified(true);
    }

    return (
        <>
        <HeaderCreate />
        <Wrap>
            <Box>
                <h4 style={{fontFamily:'RecipeKorea', fontWeight:'100'}}>설문 만들기 RE</h4>
                <InputQuestion maxLength="200" type="text" value={question.value} onChange={question.onChange} placeholder="예) 탕수육은 부먹이 좋아요? 찍먹이 좋아요?" />
                <AnswerBox>
                    <Answer>
                    <H5>대답 1</H5>
                    <InputAnswer maxLength="40"  type="text" value={answer_one.value} onChange={answer_one.onChange} placeholder="예) 당연히 부먹이죠!" />
                    </Answer>
                    <Answer>
                    <H5>대답 2</H5>
                    <InputAnswer maxLength="40"  type="text" value={answer_two.value} onChange={answer_two.onChange} placeholder="예) 찍먹이 인생의 진리!" />
                    </Answer>
                </AnswerBox>
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={verifyCallback}
                />
                <ButtonWrap>
                <button style={{padding:'10px', fontFamily: 'RecipeKorea', border:'none'}} onClick={()=>handleSubmit()}>SUBMIT</button>
                </ButtonWrap>

            </Box>

        </Wrap>
        <Footer />
        </>
    )
}

export default Create;