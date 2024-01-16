import styled from "styled-components";

export const Backimgage=styled.img`
    height:200px;
    width:100%;
    margin:auto;
    background-size: cover;
    object-fit: cover;
`

export const Body=styled.body`
    background-color: rgba(0, 83, 227,1);
    width:100%;
    height:100vh;
`

export const ProfileWrap = styled.div`
  position: relative;
  margin: -60px 0 0 20px;
  display: flex;
  flex-direction: row;
  align-items: left;
  text-align: left;
  align-content: start;
  

  > img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }

  > p {
    margin: 30px 0 0 10px;
    font-size:15px;
    color:white;
    font-weight:bold;
  }
  > h4{
    margin: 20px 0 0 65%;
    font-size:20px;
    color:white;
    font-weight:bold;
    text-align: right;
  }
`;

export const BtnWrap=styled.div`
flex-direction: row;
align-items: right;
margin: 10px 10px 5px 10px;
display: flex;
align-content: start;
position: absolute;
top: 0;
right: 0;
`

export const Btn=styled.div`
    width: 50px;
    height: 15px;
    padding: 8px 10px 8px 10px;
    border-radius: 20px;
    text-align:center;
    font-size:13px;
    color:white;
    margin: 0 3px 0 3px;
    background-color: rgb(219, 219, 219);
`

export const AskBtn=styled.div`
width: 80px;
height: 15px;
padding: 8px 10px 8px 10px;
border-radius: 20px;
font-size:14px;
color:rgba(0, 83, 227,1);
margin: 0 3px 0 3px;
font-weight:bold;
background-color: rgb(255, 255, 255);
border: 2px solid rgba(0, 83, 227, 1);
position: absolute;
right: 10px;
top: 55px;
display: flex;
align-items: center;
justify-content: center;
`