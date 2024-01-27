import './MyCoaches.css';
import './CommonStyle.css'
import BottomHeader from "../components/BottomHeader";

// 우리 형 성사 리스트 페이지

const MyCoaches = ()=>{

    // 가상의 데이터 배열
    const dummydata = [
        { id:1, date: '2023.05.09', coaches: '강동원', profileImage: 'profileImage.png'},
        { id:2, date: '2023.05.09', coaches: '송 강', profileImage: 'profileImage.png'},
        { id:3, date: '2020.10.20', coaches: '구구콘', profileImage: 'profileImage.png'},
    ]

    return (
        <div className="MyCoaches">

            <div className="titleAndBack">
                <h2>우리 형 성사 리스트</h2>
                <button>뒤로가기</button>
            </div>

            {/* 신청 내역 리스트 */}
            <div className="userList">
                <ul>
                    {dummydata.map((dummy) =>(
                        <li key={dummy.id}>
                            {/* 프로필 이미지 */}
                            <img src={dummy.profileImage} alt={`${dummy.coaches}`} className="profileImage" />
                            
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