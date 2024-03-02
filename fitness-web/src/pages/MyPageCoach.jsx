import './Mypage.css';
import { useNavigate } from "react-router-dom";
import MemberCoach from '../components/member/MemberCoach';

export default function MyPageCoach(){

    const coachId=localStorage.getItem("userId");
    const navigate = useNavigate();
    const goToChattinglist = () => {
        navigate("/chattinglistcoach",{state:{coachId:coachId}});
    };
    const goToMymembers = () => {
        navigate("/my-members",{state:{coachId:coachId}});
    };
    const goToGetreviews = () => {
        navigate("/get-review-list",{state:{coachId:coachId}});
    };
    const goTorequire = () => {
        navigate("/require",{state:{coachId:coachId}});
    };
    const textStyle={
        color:"#FF9549",
        fontWeight:"800",
        fontSize:"20px",
        paddingBottom:"50px",
    };

  // coachId 설정

    return (
        <div className="mypageContainer">
            <table className="mypageContainerTable">
                <thead>
                    <tr>
                        <td colSpan={2} style={{ paddingBottom:"60px"}}><span style={textStyle}>마이페이지</span></td>
                    </tr>
                </thead>
                <tbody className="mypageContainerTableBody">
                    <tr>
                        <td colSpan={2} style={{width:"50px"}}><MemberCoach coachId={coachId} /></td>
                    </tr>
                    <tr>
                        <td> <button className="buttonStyle" onClick={goToChattinglist}>채팅 하기 ›</button></td>
                        <td><button className="buttonStyle" onClick={goToMymembers}>우리 회원 성사 리스트 ›</button></td>
                    </tr>
                    <tr>
                        <td><button className="buttonStyle" onClick={goToGetreviews}>받은 후기 ›</button></td>
                        <td><button className="buttonStyle" onClick={goTorequire}>성사 수락 요청 ›</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}