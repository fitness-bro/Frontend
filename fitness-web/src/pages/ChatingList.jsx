import React, { useState, useEffect } from "react";
import ChatRoom from "../components/chatroom/ChatRoom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";

const Chattinglist = () => {
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
    userId: null,
  });
  const apiUrl = "http://dev.fitness-bro.pro";
  const token=localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const [initialChats, setInitialChats] = useState(new Map());

  useEffect(() => {
    let source = axios.CancelToken.source(); // Axios 요청 취소를 위한 CancelToken 생성

    axios
      .get(`${apiUrl}/members/chatrooms`, {
        headers: {
          token: token,
        },
        cancelToken: source.token, // 요청에 사용할 취소 토큰 설정
      })
      .then((response) => {
        const responseData = response.data;
        console.log("API 응답:", responseData);

        if (responseData.isSuccess) {
          const { result } = responseData;
          setUserData({
            username: result[0].userName,
            userId: result[0].userId,
          });
          const updatedChats = new Map();
          result.forEach((chat) => {
            updatedChats.set(chat.chatRoomId, chat); // 채팅방 ID를 키로 사용하여 채팅방 정보를 추가
          });
          console.log("초기 채팅 정보:", updatedChats);
          setInitialChats(updatedChats);
        } else {
          console.log("API 요청 실패:", responseData.message);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("요청이 취소되었습니다.", error.message);
        } else {
          console.error("API 요청 중 오류 발생", error);
          console.error("에러 상세보기", error.response);
        }
      });

    return () => {
      // 컴포넌트가 언마운트되면 axios 요청 취소
      source.cancel("Component unmounted");
    };
  }, []); // 빈 의존성 배열을 사용하여 컴포넌트가 처음 렌더링될 때만 API 요청을 수행
  const navigate = useNavigate();
  const onClickBackBtn = () => {
    navigate(-1);
  };
  return (
    <div className="container">
      <div className="titleAndBack">
        <h2>채팅리스트</h2>
        <button onClick={onClickBackBtn} className="backBtn">뒤로가기</button>
      </div>
  
      <div className="chat-box">
        <div className="member-list">
          {initialChats.size === 0 ? ( // initialChats의 길이를 확인하여 조건부 렌더링
            <p>텅 비었습니다</p> // 배열이 비어있는 경우 "텅 비었습니다"를 출력
          ) : (
            <ul>
              {[...initialChats.keys()].map((chatRoomId) => (
                <li
                  onClick={() => {
                    setTab(chatRoomId);
                    openModal();
                  }}
                  className={`member ${tab === chatRoomId && "active"}`}
                  key={chatRoomId}
                >
                  <div className="chatPartner">
                    <div className="chatPartner-info">
                      <div className="chatPartner-profile">
                        {initialChats.get(chatRoomId).pictureUrl ? (
                          <img
                            src={initialChats.get(chatRoomId).pictureUrl}
                            style={{
                              width: "50px",
                              height: "50px",
                              alignItems: "center",
                              borderRadius: "100px",
                            }}
                            alt="프로필 사진"
                          />
                        ) : (
                          <div className="chattingprofile">
                            <Icon
                              className="chattingIcon"
                              icon="ic:baseline-person-outline"
                              alt="기본 이미지"
                            />
                          </div>
                        )}
                      </div>
                      <div className="chatPartner-body">
                        <div className="chatPartner-name">{initialChats.get(chatRoomId).partnerName}</div>
                        <div>{initialChats.get(chatRoomId).lastChatMessage}</div>
                      </div>
                    </div>
                    <div className="chatPartner-time">
                      {initialChats.get(chatRoomId).lastChatTime && (
                        <div>
                          {new Date(initialChats.get(chatRoomId).lastChatTime).toLocaleString([], {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* 모달 */}
      <ChatRoom
        isOpen={isModalOpen}
        onClose={closeModal}
        tab={tab}
        setTab={setTab}
        userData={userData}
        initialChats={initialChats}
        setUserData={setUserData}
      />
    </div>
  );
};


export default Chattinglist;