import styled from "styled-components"

export const Body=styled.body`
    background-color: rgba(255, 149, 73, 1);
    flex-direction: column;
    align-items: center; 
    padding-top:30px;
    display: flex;
    width: 100%;
    height:100vw;
    >img{
        width:15vh;
        padding:40px;
    }
`

export const IdInput=styled.input`
background-color:rgba(0,0,0,0);
padding:15px 17vh;
padding-left: 2vh;
border-radius: 10px;
border: 1px solid #ffffff;
margin-bottom:10px;
&::placeholder {
    text-align: left;
    color: white;
    font-weight:1000px;
  }
`

export const PWInput=styled.input`
background-color:rgba(0,0,0,0);
padding:15px 17vh;
padding-left: 2vh;
border-radius: 10px;
border: 1px solid #ffffff;
&::placeholder {
    text-align: left;
    color: white;
    font-weight:1000px;
  }
`

export const LoginButton=styled.button`
background-color: rgba(255, 255, 255, 1);
border: 3px solid rgba(255, 149, 73, 1);
border-radius:10px;
color: rgba(255, 149, 73, 1);
padding:15px 16vh;
font-weight:bold;
margin:10px;
`

export const TextWrap=styled.div`
display:flex;

>button{
  background:rgba(0,0,0,0);
  border: 0px;
  color:white;
  cursor:pointer;
  padding-left:5vh;
}
>p{
  font-size:13px;
  color:white;
  padding-right:5vh;
}
`