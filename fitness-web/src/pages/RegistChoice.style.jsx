import styled from "styled-components";

export const Text1=styled.div`
    color:rgba(255, 149, 73, 1);
    font-weight:600;
`


export const BtnWrap = styled.div`
justify-content: space-around;
padding:100px;
display:flex;
`;

export const RegistBro = styled.button`
  background-color: rgba(255, 255, 255, 1);
border: 3px solid rgba(255, 149, 73, 1);
  color: rgba(255, 149, 73, 1);
  cursor: pointer;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  > img {
    width: 100px;
    margin-bottom: 10px;
  }

  > p {
    margin: 0; 
  }
`;


export const ReigstMember = styled.button`
  background-color: rgba(100, 62, 35, 1);
border: 3px solid #ffffff;
  color: white;
  cursor: pointer;
  height: 200px;
  width: 200px;
  border-radius: 50%;
  box-shadow: 0 0 10px 0;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  > img {
    width: 100px;
    margin-bottom: 10px;
  }

  > p {
    margin: 0; 
  }
`;