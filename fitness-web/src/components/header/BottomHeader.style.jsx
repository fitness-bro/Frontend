import styled from "styled-components";

export const BhWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    width: 100%; /* 부모 요소의 width를 100%로 설정 */
    padding: 10px;

    > img {
        margin: auto;
        padding-bottom: 5px;
    }

    > h4 {
        margin: auto;
        padding-bottom: 15px;
        font-style: normal;
        font-weight: ;
        font-size: 13px;
        color: #643E23;
    }

    > p {
        background-color: rgba(255, 149, 73, 1);
        width: 100%;
        margin: auto;
        text-align: center;
        color:white;
        font-size: 13px;
        padding: 20px 10px 20px 10px;
    }
`;