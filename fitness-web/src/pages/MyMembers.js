import '../components/CommonStyle.css'
import DefaultImage from '../components/review/DefaultImage';
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// 찜한 형 리스트 페이지

const MyMembers = ()=>{
    const location = useLocation();
    const coachId = location.state.coachId;
    // 가상의 데이터 배열
    const [data, setData] = useState([]);
    const apiUrl = "http://dev.fitness-bro.pro/";
    useEffect(() => {
         // 예시

        axios
            .get(`${apiUrl}match/coach/success/${coachId}`)
            .then((response) => {
                const responseData = response.data;
                console.log("API 응답:", response);

                if (responseData.isSuccess) { // 수정: responseData를 사용하여 isSuccess 검사
                    const results = responseData.result;
                    setData(results);
                } else {
                    console.log("API 요청 실패:", responseData.message);
                }
            })
            .catch((error) => {
                console.error("API 요청 중 오류 발생", error);
                console.error("에러 상세보기", error.response);
            });
    }, [coachId]); // useEffect의 의존성 배열을 빈 배열로 설정하여 한 번만 실행되도록 설정

    return (
        <div className="MyMembers">

            <div className="titleAndBack">
                <h2>우리 회원 성사 리스트</h2>
                <button>뒤로가기</button>
            </div>

             {/* 신청 내역 리스트 */}
             <div className="userList">
                <ul>
                    {data.map((item,index) =>(
                        <li key={index}>
                            {/* 프로필 이미지 */}
                            
                             <DefaultImage />

                            <div className="info">
                                {/* 날짜 */}
                                <p>{item.nickname}</p>

                                {/* 신청인 */}
                                <p className="detail">{item.createAt}</p>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyMembers;
