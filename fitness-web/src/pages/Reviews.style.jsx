import styled from "styled-components";


export const Body=styled.body`
    background-color: rgb(255, 255, 255);
    width:100%;
    height:100vh;
`

export const ReviewBlock=styled.div`
    background-color: rgb(219, 219, 219);
    border-radius:3px;
    height:100px;
    width:90%;
    margin: auto;
    margin-top:10px;
    margin-bottom: 15px;
    padding:0 0 0 10px;
    color:rgba(0, 0, 0,1);
    font-size:15px;
    display:flex;
    align-items:center;
    font-weight:bold;
    >img{
        border-radius: 50%;
        width: 70px;
        height: 70px;
        
    }
    > h4 {
        margin: 15px 0 0 20px;
        align-self: start;
        font-weight:400;
        
      }
    
      > p {
        margin: 5px 0 0 -70px;
        justify-self: start;
      }
`