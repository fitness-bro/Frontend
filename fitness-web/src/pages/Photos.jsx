import {React,useState,useEffect} from "react";
import {ImgWrap,Body} from "./Photos.style";
import ProfileHeader from '../components/header/ProfileHeader';
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Photos(){
    const [pictures, setPictures] = useState([]);
    const apiUrl = "http://dev.fitness-bro.pro";
    const location = useLocation();
    const coachId= location.state.coachId;
    const token= location.state.token;

    useEffect(() => {

        axios.get(`${apiUrl}/coaches/album/${coachId}`)
            .then(response => {
                const data = response.data;
                console.log("API 응답:", data);

                if (data.isSuccess) {
                    setPictures(data.result.pictureURLs); // 서버에서 받아온 데이터를 배열로 감싸서 설정
                } else {
                    console.error("API 요청 실패:", data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    }, []);

    return(
        <>
        <Body>
            <ProfileHeader id={coachId}/>
            <ImgWrap>
            {pictures.map((pictureURL, index) => (
                        <img key={index} src={pictureURL} alt={`사진 ${index + 1}`} />
                    ))}
            </ImgWrap>
            
        </Body>
       
        </>
    );
}  