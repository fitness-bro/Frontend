import styled from 'styled-components';

export const ModalOpenBody = styled.body`
  overflow: hidden;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 149, 73, 1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  z-index: 2;
  color:white;
  width:400px;
  height:560px;
  flex-direction: column;
  display:flex;
  >img{
    width:40%;
    align-self:center;
  }
`;

export const ModalButton = styled.button`
  margin: 10px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0);
  border-radius: 3px;
border: 3px solid #ffffff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: end;
  font-weight:bold;
`;

export const ButtonWrap=styled.div`
display:flex;
flex-direction:column;
`