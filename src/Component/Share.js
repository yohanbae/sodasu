import React from "react";
import styled from "styled-components";
import { toast } from 'react-toastify';


const TheAdd = styled.input`
    opacity: 0;
    pointer-events: none;
    cursor:default;
    disabled: true;
    `;

    
const Share = ({id}) => {

    const handleNothing = () => {}

    const handleShare = () =>{
        let meme = document.getElementById("foo");
        meme.select();
        meme.setSelectionRange(0, 99999); /*For mobile devices*/
        document.execCommand("copy");
        
        toast.success(`공유 주소가 복사되었습니다`, {hideProgressBar: true});
    }

    return(
        <>
        <button onClick={()=> handleShare()}>공유하기</button>
        <TheAdd id="foo" onChange={()=>handleNothing()} value={window.location.host + `/main/${id}` }  />
        </>
    )

}

export default Share;
