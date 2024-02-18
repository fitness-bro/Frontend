import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import '../components/CommonStyle.css'
import DefaultImage from '../components/review/DefaultImage';

// 수련생 성사 리스트 페이지

const MyMembers = ()=>{

    const apiUrl = process.env.REACT_APP_API_URL;


    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios.get(`${apiUrl}match/coach/success/`, {
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const data = response.data;
                console.log("API 응답:", response);

                if (data.isSuccess) {
                    const results=data.result;
                    setUserData(results);
                } else {
                    console.error("API 요청 실패:", data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    }, []);

    const navigate = useNavigate();
    const onClickBackBtn = ()=>{
        navigate(-1);
    }


    return (
        <div className="MyMembers">

            <div className="titleAndBack">
                <h2>우리 회원 성사 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

             {/* 신청 내역 리스트 */}
             <div className="userList">
                <ul>
                    {userData.map((item, index) =>(
                        <li key={index}>
                            {/* 프로필 이미지 */}
                            {item.pictureURL ? (
                                <img src={item.pictureURL} alt="프로필 이미지" className="profileImage" />
                            ) : (
                                <DefaultImage />
                            )}

                            <div className="info">
                                {/* 날짜 */}
                                <p>{item.createdAt}</p>

                                {/* 신청인 */}
                                <p className="detail">{item.nickname}</p>

                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyMembers;
