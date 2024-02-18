import './Mypage.css';
import { useNavigate } from "react-router-dom";
import MemberCoach from '../components/member/MemberCoach';

export default function MyPageCoach(){

    const coachId=localStorage.getItem("userId");

    const navigate = useNavigate();
    const goToChattinglist = () => {
        navigate("/chatinglist");
    };
    const goToMymembers = () => {
        navigate("/my-members");
    };
    const goToGetreviews = () => {
        navigate("/get-review-list");
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
                        <td colSpan={2} style={{width:"50px"}}><MemberCoach /></td>
                    </tr>
                    <tr>
                        <td> <button className="buttonStyle" onClick={goToChattinglist}>채팅 하기 ›</button></td>
                        <td><button className="buttonStyle" onClick={goToMymembers}>우리 회원 성사 리스트 ›</button></td>
                    </tr>
                    <tr>
                        <td><button className="buttonStyle" onClick={goToGetreviews}>받은 후기 ›</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}