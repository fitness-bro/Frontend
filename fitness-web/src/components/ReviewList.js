import './ReviewList.css';
import './CommonStyle.css'
import { useNavigate } from "react-router-dom";
import DefaultImage from './DefaultImage';

// 후기 작성 페이지1 & 후기 작성 완료하기 누르면 돌아오는 페이지

const ReviewList = ()=>{

    const navigate = useNavigate();

    // 가상의 데이터 배열
    const dummydata = [
        { id:1, date: '2023.05.09', coaches: '강동원', profileImage: null},
        { id:2, date: '2023.05.09', coaches: '송 강', profileImage: null},
        { id:3, date: '2020.10.20', coaches: '구구콘', profileImage: null},
    ]

    const handleWriteReview = ()=>{ // 내용 작성 팝업창에 대한 함수
        navigate('/reviews');
    }

    const onClickBackBtn = ()=>{
        navigate(-1);
    }

    return (
        <div className="ReviewList">

            <button onClick={handleWriteReview} className="writeReview">후기 작성</button>
            <div className="titleAndBack">
                <h2>후기 리스트</h2>
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

                                {/* 작성한 동네형 후기 */}
                                <p className="detail">{dummy.coaches}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ReviewList;