import './Favorites.css';
import './MyCoaches.css';
import './Reviews.css';

const Favorites = ()=>{

    // 가상의 데이터 배열
    const applications = [
        { id:1, applicant: '강동원', address: '서울시 강남구', rating: '★4.5', profileImage: 'profileImage.png'},
        { id:2, applicant: '송 강', address: '서울시 강남구', rating: '★4.5', profileImage: 'profileImage.png'},
        { id:3, applicant: '마동석', address: '서울시 서초구', rating: '★4.5', profileImage: 'profileImage.png'},
        { id:4, applicant: '박신양', address: '서울시 마포구', rating: '★4.5', profileImage: 'profileImage.png'},
    ]

    return (
        <div className="Favorites">
            
            {/* 최상단 페이지 전환 버튼 */}
            <div className="header">
                <h1>동네형 (로고)</h1>
                <div className="headerButtons">
                    <button className="button1">동네형 찾기</button>
                    <button className="button2">마이페이지</button>
                    <button className="button3">회원가입</button>
                </div>
            </div>

            <div className="text1">
                <h2>찜한 형 리스트</h2>
                <button>뒤로가기</button>
            </div>

            {/* 신청 내역 리스트 */}
            <ul>
                {applications.map((application) =>(
                    <li key={application.id}>
                        {/* 프로필 이미지 */}
                        <img src={application.profileImage} alt={`${application.applicant}`} className="profileImage" />
                        <div className="info">
                            {/* 이름/주소 */}
                            <p className="date">{application.applicant} / {application.address}</p>

                            {/* 별점 */}
                            <p className="rating">{application.rating}</p>
                        </div>
                        
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default Favorites;