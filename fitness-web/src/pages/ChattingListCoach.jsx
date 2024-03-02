import React, { useState, useEffect } from "react";
import ChatRoomCoach from "../components/chatroom/ChatRoomCoach";
import { All, FrontWrap, Ul, Li } from "./ChatingList.style";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ChattingListCoach = () => {
  const [tab, setTab] = useState("CHATROOM");
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
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
      .get(`${apiUrl}/coaches/chatrooms`, {
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
            username : result[0].userName,
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
      <All>
        <FrontWrap>
          <p>채팅 리스트</p>
          <button onClick={onClickBackBtn}>뒤로가기</button>
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
                  
                  <div >
                   <table>
                    <tr>
                        <td>
                 <img src={initialChats.get(chatRoomId).pictureUrl}  style={{
                        width: "50px",
                        height: "50px",
                        alignItems: "center",
                        borderRadius: "100px",
                      }}></img>
                      <div>{initialChats.get(chatRoomId).partnerName}</div>
                      
                      </td>
                     <td> {initialChats.get(chatRoomId).lastChatMessage}</td></tr>
       
              </table>
     
                  </div>
                </Li>
              ))}
            </Ul>
          </div>
          {/* 모달 */}
          <ChatRoomCoach
            isOpen={isModalOpen}
            onClose={closeModal}
            tab={tab}
            setTab={setTab}
            userData={userData}
            initialChats={initialChats}
            setUserData={setUserData}
          />
        </div>
      </All>
    </div>
  );
};

export default ChattingListCoach;