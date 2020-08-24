import React, {useState} from "react";
import styled from "styled-components";

import useInput from "../useInput";
import {toast} from "react-toastify";
import firebase from "../base";
import ReCAPTCHA from "react-google-recaptcha";

import { MdBackspace } from "react-icons/md";
import { Link } from 'react-router-dom'


const Header = styled.div`
height:50px;
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

const Wrap = styled.div`
    height: calc(100vh - 40px);
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
    font-family: 'Quicksand', sans-serif;
    font-weight:600;
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
    font-family: 'Quicksand', sans-serif;
    padding-top:5px;
    font-weight:600;
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
    font-family: 'Quicksand', sans-serif;
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

            toast.success("New question added. Thank you.", {hideProgressBar: true});
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
        <Header>
            <Title>soda</Title>
            <UL>
                <LI><Link to={'/'}><MdBackspace /></Link></LI>
            </UL>
        </Header>
        <Wrap>

            <Box>
                <h4 style={{fontFamily:'Quicksand', fontWeight:'100'}}>Create new question</h4>
                <InputQuestion maxLength="200" type="text" value={question.value} onChange={question.onChange} placeholder="ex) do you like pizza or pasta better?" />
                <AnswerBox>
                    <Answer>
                    <H5>answer 1</H5>
                    <InputAnswer maxLength="40"  type="text" value={answer_one.value} onChange={answer_one.onChange} placeholder="ex) I like pizza better" />
                    </Answer>
                    <Answer>
                    <H5>answer 2</H5>
                    <InputAnswer maxLength="40"  type="text" value={answer_two.value} onChange={answer_two.onChange} placeholder="ex) I like pasta better" />
                    </Answer>
                </AnswerBox>
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_SITE_KEY}
                    onChange={verifyCallback}
                />
                <ButtonWrap>
                <button style={{borderRadius:'5px', padding:'10px', background:'rgba(52, 101, 235, 0.8)', color:'white', fontFamily: 'GmarketSansMedium', border:'none', cursor:'pointer'}} onClick={()=>handleSubmit()}>SUBMIT</button>
                </ButtonWrap>

            </Box>

        </Wrap>

        </>
    )
}

export default Create;