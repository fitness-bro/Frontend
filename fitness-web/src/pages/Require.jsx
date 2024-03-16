import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../components/CommonStyle.css';
import './Require.css';
import Empty from "../components/empty/Empty.jsx";

// 성사 수락 요청 리스트

const Require = () => {
    const navigate = useNavigate();

    const apiUrl = 'http://dev.fitness-bro.pro';


    const [userData, setUserData] = useState([]);

    useEffect(() => {

        const token = localStorage.getItem("token");

        axios.get(`${apiUrl}/match/coach/register-list`, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        
            .then(response => {
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

    const onClickBackBtn = () => {
        navigate(-1);
    };

    const onAccept = (memberId) => {
        const token = localStorage.getItem("token");
        console.log(`사용자 수락: ${memberId}`);

        axios.post(`${apiUrl}/match/coach/approve`,{memberId}, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(response => {
            console.log("수락 API 응답:", response);
        })
        .catch(error => {
            console.error("수락 API 요청 중 오류 발생:", error);
            console.error("수락 에러 상세 정보:", error.response);
        });
    };

    
    const onReject = (memberId) => {
        const token = localStorage.getItem("token");
        console.log(`사용자 거절: ${memberId}`);

        axios.post(`${apiUrl}/match/coach/reject`,{memberId}, {
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(response => {
            console.log("수락 API 응답:", response);
        })
        .catch(error => {
            console.error("수락 API 요청 중 오류 발생:", error);
            console.error("수락 에러 상세 정보:", error.response);
        });
    };

    return (
        <div className="Favorites">
            <div className="titleAndBack">
                <h2>성사 수락 요청</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>
    
            <div className="userList">
                {userData.length === 0 ? ( // userData의 길이를 확인하여 배열이 비어있을때
                    
                    <div>
                        <center><Empty/></center>
                    <center>아직 비어있어요!</center>
                    </div>
                    
                ) : (
                    <ul>
                        {userData.map((item, index) => (
                            <li className="cursor-default" key={index}>
                                <div className="info">
                                    <div className="accept-reject">
                                        {/* 이름 */}
                                        <p>{item.memberNickname}</p>
                                        <button onClick={() => onAccept(item.memberId)} className="acceptbtn">수락</button>
                                        <button onClick={() => onReject(item.memberId)} className="rejectbtn">거절</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
    
};

export default Require;