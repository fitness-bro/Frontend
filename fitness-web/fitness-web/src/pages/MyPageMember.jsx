import './Mypage.css';
import { useNavigate } from "react-router-dom";
import Member from '../components/member/Member';

export default function MyPageMember(){

    const memberId=localStorage.getItem("userId");
    const navigate = useNavigate();
    const goToChatinglist = () => {
      navigate("/chatinglist",{state:{memberId:memberId}});
    };
    const goToFavorites = () => {
      navigate("/favorites",{state:{memberId:memberId}});
    };
    const goToReviews = () => {
      navigate("/reviews",{state:{memberId:memberId}});
    };
    const goToMyCoaches = () => {
      navigate("/my-coaches",{state:{memberId:memberId}});
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
            <td colSpan={2} style={{ paddingBottom: "60px" }}>
              <sapn style={textStyle}>마이페이지</sapn>
            </td>
          </tr>
        </thead>
        <tbody className="mypageContainerTableBody">
          <tr>
            <td colSpan={2} style={{ width: "50px" }}>
              <Member memberId={memberId} />
            </td>
          </tr>

          <tr>
            <td>
              <button className="buttonStyle" onClick={goToChatinglist}>
                채팅 하기 ›
              </button>
            </td>
            <td>
              <button className="buttonStyle" onClick={goToFavorites}>
                찜한 형 리스트 ›
              </button>
            </td>
          </tr>
          <tr>
            <td>
              <button className="buttonStyle" onClick={goToReviews}>
                후기 작성 ›
              </button>
            </td>

            <td>
              <button className="buttonStyle" onClick={goToMyCoaches}>
                우리 형 성사 리스트 ›
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}