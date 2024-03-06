import styled from "styled-components";

export const Text1=styled.div`
    color:rgba(255, 149, 73, 1);
    font-weight:600;
`


export const BtnWrap = styled.div`
justify-content: space-evenly;
padding:100px;
display:flex;
`;

export const RegistBro = styled.button`
  background-color: rgba(255, 149, 73, 1);
border: 2px solid rgba(255, 255, 255, 1);
  color: rgba(255, 255, 255, 1);
  cursor: pointer;
  height: 370px;
  width: 300px;
  border-radius: 10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  > img {
    width: 150px;
    margin-bottom: 10px;
  }

  > p {
    margin: 0; 
    font-weight:600;
  }
`;


export const ReigstMember = styled.button`
  background-color: rgba(255, 255, 255, 1);
border: 2px solid rgba(255, 149, 73, 1);
  color: rgba(255, 149, 73, 1);
  cursor: pointer;
  height: 370px;
  width: 300px;
  border-radius: 10px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content: center;
  > img {
    width: 150px;
    margin-bottom: 10px;
  }

  > p {
    margin: 0; 
    font-weight:600;
  }
`;