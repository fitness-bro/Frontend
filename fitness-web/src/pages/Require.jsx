import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../components/CommonStyle.css';
import './Require.css';
import Empty from "../components/empty/Empty.jsx";
import Loading from '../components/Loading/Loading.jsx';
// 성사 수락 요청 리스트

const Require = () => {
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;


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
            setTimeout(() => {
                setIsLoading(false); // 데이터가 로드되면 로딩 상태 변경
              }, 2000);
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
            {isLoading ? (
                <Loading /> // 로딩 중인 경우 로딩 스피너 표시
            ) : (
                <div>
                    <div className="titleAndBack">
                        <h2>성사 수락 요청</h2>
                        <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
                    </div>
    
                    <div className="userList">
                        {userData.length === 0 ? (
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
            )}
        </div>
    );
    
};

export default Require;