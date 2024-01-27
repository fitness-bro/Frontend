import React from "react";
import Header from '../components/Header';
import kangaroo from '../img/kangaroo.svg';
import './Main.css'; // CSS 파일을 import

const Main = () => {
    return (
        <>
        <Header />
        <div className="main-container">
            
            <div className="Sentence">PT 하지말고<br /> 동네형에게  헬스과외 받자.</div>
            <div className="WhiteContainer">
            <div className="white1"></div>
            <div className="white2"></div>
            <div className="white3"></div>
            <div className="white4"></div>
            </div>
            
            <img src={kangaroo} alt="Kangaroo Image " className="centered-image2"/>
        </div>
    
        </>
    );
};

export default Main;
