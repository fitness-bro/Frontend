import './MyCoaches.css';
import './Reviews.css';

const MyCoaches = ()=>{

    // 가상의 데이터 배열
    const applications = [
        { id:1, date: '2023.05.09', applicant: '강동원', profileImage: 'profileImage.png'},
        { id:2, date: '2023.05.09', applicant: '송 강', profileImage: 'profileImage.png'},
        { id:3, date: '2020.10.20', applicant: '구구콘', profileImage: 'profileImage.png'},
    ]

    return (
        <div className="MyCoaches">
            <div className="text1">
                <h2>우리 형 성사 리스트</h2>
                <button>뒤로가기</button>
            </div>

            {/* 신청 내역 리스트 */}
            <ul>
                {applications.map((application) =>(
                    <li key={application.id}>
                        {/* 프로필 이미지 */}
                        <img src={application.profileImage} alt={`${application.applicant}`} className="profileImage" />
                        
                        <div className="info">
                            {/* 날짜 */}
                            <p className="date">{application.date}</p>

                            {/* 신청인 */}
                            <p className="applicant">{application.applicant}</p>
                        </div>
                        
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default MyCoaches;