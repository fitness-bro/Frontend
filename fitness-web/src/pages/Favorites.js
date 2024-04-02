import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';
import Empty from "../components/empty/Empty.jsx";

// 찜한 형 리스트

const Favorites = () => {
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem("token");

    const [userData, setUserData] = useState([]);

    useEffect(() => {

        axios.get(`${apiUrl}/members/favorites`, {
            headers: {
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
    const goToCoachProfile = (userId) => {
        // 클릭된 프로필의 userId를 사용하여 프로필 페이지로 이동
        console.log(userId)
        navigate("/profile",{state:{coachId:userId}});
    
      };
    return (
        <div className="Favorites">

            <div className="titleAndBack">
                <h2>찜한 형 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

            <div className="userList">
                {userData.length === 0 ? ( // userData의 길이를 확인하여 배열이 비어있을때
                            
                   <div>
                        <center><Empty/></center>
                        <center style={{ color: '#643E23', fontWeight: 'bold', fontSize: '18px' }}>아직 비어있어요!</center>
                    </div>
                            
                ) : (
                    <ul>
                        {userData.map((item, index) => (
                            <li key={index} onClick={() => goToCoachProfile(item.coachId)}>
                                {/* 프로필 이미지 */}
                                {item.coachImage ? (
                                    <img src={item.coachImage} alt="프로필 이미지" className="profileImage" />
                                ) : (
                                    <DefaultImage />
                                )}

                                <div className="info">
                                    {/* 이름/주소 */}
                                    <p>{item.nickname} / {item.address}</p>

                                    {/* 별점 */}
                                    <p className="detail">★{item.rating}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}  
            </div>
        </div>
    );
};

export default Favorites;