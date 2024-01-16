import { AskBtn,Btn, BtnWrap, ProfileWrap, Backimgage } from "./ProfileHeader.style";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backImg from "../img/back.jpg";
import profileImg from "../img/profile.jpg";

export default function ProfileHeader() {
    const navigate = useNavigate();
    const [btnStates, setBtnStates] = useState({
        프로필: false,
        후기: false,
        사진첩: false
    });

    const handleBtnClick = (name) => {
        setBtnStates({
            프로필: false,
            후기: false,
            사진첩: false,
            [name]: true

        });

        switch (name) {
            case '프로필':
                navigate("/profile");
                break;
            case '후기':
                navigate("/reviews");
                break;
            case '사진첩':
                navigate("/photos");
                break;
            default:
                break;
        }
    };

    return (
        <>
            <Backimgage src={backImg} alt="배경" />
            <BtnWrap>
                <Btn onClick={() => handleBtnClick('프로필')} style={{ backgroundColor: btnStates['후기'] ? "rgba(0, 83, 227, 1)" : "" }}>
                    프로필
                </Btn>
                <Btn onClick={() => handleBtnClick('후기')} style={{ backgroundColor: btnStates['후기'] ? "rgba(0, 83, 227, 1)" : "" }}>
                    후기
                </Btn>
                <Btn onClick={() => handleBtnClick('사진첩')} style={{ backgroundColor: btnStates['사진첩'] ? "rgba(0, 83, 227, 1)" : "" }}>
                    사진첩
                </Btn>
            </BtnWrap>

            <AskBtn>문의하기</AskBtn>

            <ProfileWrap>
                <img src={profileImg} alt="프로필 이미지" />
                <p>닉네임 | 나이</p>
                <h4>별점</h4>
            </ProfileWrap>
        </>
    );
}