import styled from "styled-components";

export const All=styled.div`
    text-align: center;
`

export const FrontWrap=styled.div`
justify-content: space-between;
flex-direction: row;
display:flex;
margin:0 20px 0 20px;
>p{
    color:rgba(255, 149, 73, 1);
    font-weight:bold;
}
>button{
    color:rgba(255, 149, 73, 1);
    border-radius: 5px;
    font-weight:bold;
    background-color:white;
    border: 1.5px solid rgba(255, 149, 73, 1); 
    width: 90px;
    height: 40px;
    cursor:pointer;
}
`

export const ChatWrap=styled.div`
flex-direction: column;
`

export const InfoWrap = styled.div`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  display:flex;

  > p {
    /* 스타일을 추가하세요 */
  }

  > h4 {
    /* 스타일을 추가하세요 */
  }
`;

 export const Ul=styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 `
  
export const Li=styled.div`
background-color: #FFE0CA;
border-radius: 3px;
height:100px;
width:90%;
padding:0 0 0 10px;
color: #643E23;
font-size:15px;
font-weight:bold;
align-items:center;
margin: auto;
margin-top:10px;
margin-bottom: 15px;
display:flex;

>img{
    border-radius: 50%;
    width: 70px;
    height: 70px;
    margin-right: 10px;
}
`

export const ChatMessage=styled.div`

`