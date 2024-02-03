import './MyCoaches.css';
import './CommonStyle.css'
import DefaultImage from './DefaultImage';
import { useNavigate } from "react-router-dom";

// 우리 형 성사 리스트 페이지

const MyCoaches = ()=>{

    // 가상의 데이터 배열
    const dummydata = [
        { id:1, date: '2023.05.09', coaches: '강동원', profileImage: null},
        { id:2, date: '2023.05.09', coaches: '송 강', profileImage: null},
        { id:3, date: '2020.10.20', coaches: '구구콘', profileImage: null},
    ]

    const navigate = useNavigate();
    const onClickBackBtn = ()=>{
        navigate(-1);
    }

    return (
        <div className="MyCoaches">

            <div className="titleAndBack">
                <h2>우리 형 성사 리스트</h2>
                <button onClick={onClickBackBtn}>뒤로가기</button>
            </div>

            {/* 신청 내역 리스트 */}
            <div className="userList">
                <ul>
                    {dummydata.map((dummy) =>(
                        <li key={dummy.id}>
                             {/* 프로필 이미지 */}
                             {dummy.profileImage ? (
                                <img src={dummy.profileImage} alt="프로필 이미지" className="profileImage" />
                            ) : (
                                <DefaultImage />
                            )}

                            <div className="info">
                                {/* 날짜 */}
                                <p>{dummy.date}</p>

                                {/* 신청인 */}
                                <p className="detail">{dummy.coaches}</p>
                            </div>
                            
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default MyCoaches;