import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from '../components/review/DefaultImage';
import { useState, useEffect } from "react";


// 찜한 형 리스트

const Favorites = () => {
    const navigate = useNavigate();

    const apiUrl="http://dev.fitness-bro.pro/";


    const [userData, setUserData] = useState([]);

    useEffect(() => {

        axios.get(`${apiUrl}members/favorites`)
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

    return (
        <div className="Favorites">

            <div className="titleAndBack">
                <h2>찜한 형 리스트</h2>
                <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
            </div>

            <div className="userList">
                <ul>
                    {userData.map((item, index) => (
                        <li key={index}>
                            {/* 프로필 이미지 */}
                            {item.profileImage ? (
                                <img src={item.profileImage} alt="프로필 이미지" className="profileImage" />
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
            </div>
        </div>
    );
};

export default Favorites;
