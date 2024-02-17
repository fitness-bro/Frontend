import React, { useState, useEffect } from "react";
import ChatRoom from "../components/chatroom/ChatRoom";
import { All, FrontWrap, Ul, Li } from "./ChatingList.style";
import axios from "axios";

const Chattinglist = () => {
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    memberId: 653,
    username: "희선",
    connected: false,
    message: "",
  });
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZXN1bjEwN0BrYWthby5jb20iLCJpYXQiOjE3MDgxNzczMzUsImV4cCI6MTcwODE4MDkzNX0.TeFBX3hKXATmtV133VVi1OXWrp58VmllZfRVly47VfM";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const apiUrl = "http://dev.fitness-bro.pro/";
  const [initialChats, setInitialChats] = useState(new Map());

  useEffect(() => {
    let source = axios.CancelToken.source(); // Axios 요청 취소를 위한 CancelToken 생성

    axios
      .get(`${apiUrl}members/chatrooms`, {
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

  return (
    <div className="container">
      <All>
        <FrontWrap>
          <p>채팅 리스트</p>
          <button>뒤로가기</button>
        </FrontWrap>

        <div className="chat-box">
          <div className="member-list">
            <Ul>
              {[...initialChats.keys()].map((chatRoomId) => (
                <Li
                  onClick={() => {
                    setTab(chatRoomId);
                    openModal();
                  }}
                  className={`member ${tab === chatRoomId && "active"}`}
                  key={chatRoomId}
                >
                  <div className="chatPatner">
                    <div></div>
                    <div>
                      <div>
                        <span>{initialChats.get(chatRoomId).partnerName}</span>
                        <span>{initialChats.get(chatRoomId).updatedAt}</span>
                      </div>
                    </div>
                    <div>{initialChats.get(chatRoomId).lastChatMessage}</div>
                  </div>
                </Li>
              ))}
            </Ul>
          </div>
          {/* 모달 */}
          <ChatRoom
            isOpen={isModalOpen}
            onClose={closeModal}
            tab={tab}
            userData={userData}
            initialChats={initialChats}
            setUserData={setUserData}
          />
        </div>
      </All>
    </div>
  );
};

export default Chattinglist;