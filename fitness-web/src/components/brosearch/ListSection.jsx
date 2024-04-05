import React from "react";
import { useNavigate } from "react-router-dom";
import "./ListSection.css";
import { FaStar } from "react-icons/fa";
import { Icon } from "@iconify/react";
const StarIcon = () => {
  return <FaStar color="black" size={14} />;
};

const ListSection = ({
  userList,
  selectedRegion,
  selectedSubAddress,
  selectedUserId,
}) => {
  // userList가 배열이 아니라면 빈 배열을 반환
  const users = Array.isArray(userList) ? userList : [];

  // 전체 유저 리스트 또는 선택한 지역의 유저 리스트를 생성
  const filteredList = users.filter((user) => {
    const regionMatch = !selectedRegion || user.region === selectedRegion;
    const subAddressMatch =
      !selectedSubAddress || user.subAddress === selectedSubAddress;
    return regionMatch && subAddressMatch;
  });

  const navigate = useNavigate();

  const handleProfileClick = (userId) => {
    // 클릭된 프로필의 userId를 사용하여 프로필 페이지로 이동
    console.log(userId);
    navigate("/profile", { state: { coachId: userId } });
  };

  return (
    <div>
      <div
        style={{
          color: "#ff9549",
          fontSize: "19px",
          fontWeight: "bold",
          padding: "10px",
          paddingBottom: "15px",
        }}
      >
        동네형 리스트
      </div>
      <div
        className="ListContainer"
        style={{ width: "390px", height: "40vh", backgroundColor: "#643e23" }}
      >
        {filteredList.map((user) => (
          <div
            className={`UserProfile ${
              selectedUserId === user.coachId ? "clicked" : ""
            }`}
            key={user.coachId}
            onClick={() => handleProfileClick(user.coachId)}
          >
            <div>
            
            {user.coachPicture ? (
                          <img
                            src={user.coachPicture}
                            className="UserPic" 
                            alt="프로필 사진"
                          />
                        ) : (
                          <div className="UserPic" >
                            <Icon

                              className="UserPicIcon"
                              icon="ic:baseline-person-outline"
                              alt="기본 이미지"
                            />
                          </div>
                        )}</div>
            <div className="Userinfo">
              <table>
                <tbody>
                  <tr>
                    <td className="listTd">{user.nickname}</td>
                    <td lassName="listTd">{user.age}세 </td>
                    <td className="lastTd">
                      <StarIcon /> &nbsp; {user.rating}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSection;