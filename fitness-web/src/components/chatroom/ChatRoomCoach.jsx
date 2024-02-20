
import "./ChatRoom.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;


const ChatRoom = ({
  isOpen,
  onClose,
  tab,
  userData,
  initialChats,
  setUserData,
}) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const apiUrl = "http://dev.fitness-bro.pro";
  const token ="eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNlb2t3aGFuMTIzQG5hdmVyLmNvbSIsImlhdCI6MTcwODMyMTE0MywiZXhwIjoxNzA4NjgxMTQzfQ.wavnk6K6R6FqWryZvggmmjVyZx3TQ78kw-1g60A9Z4k";


  useEffect(() => {
    let Sock = new SockJS("http://dev.fitness-bro.pro/stomp/chat");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);

    return () => {
      Sock.close();
    };
  }, []);

  useEffect(() => {
    if (stompClient && tab !== "CHATROOM") {
      stompClient.subscribe(`/user/${tab}/private`, onPrivateMessage);
    }
  }, [tab]);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(`/user/${tab}/private`, onPrivateMessage);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onPrivateMessage = (payload) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);

    if (privateChats.get(payloadData.chatRoomId)) {
      privateChats.get(payloadData.chatRoomId).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      privateChats.set(payloadData.chatRoomId, []);
      setPrivateChats(new Map(privateChats));
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/coaches/chatrooms`, {
        headers: {
          token: token,
        },
      })
      .then((response) => {
        const responseData = response.data;
        console.log("API 응답:", responseData);

        if (responseData.isSuccess) {
          const { result } = responseData;
          const updatedChats = new Map(initialChats); // initialChats로 초기화
          result.forEach((chat) => {
            updatedChats.set(chat.chatRoomId, []); // 해당 채팅방의 채팅 정보 가져오기
          });
          console.log("초기 채팅 정보:", updatedChats);
          setPrivateChats(updatedChats); // privateChats 상태 업데이트
        } else {
          console.log("API 요청 실패:", responseData.message);
        }
      })
      .catch((error) => {
        console.error("API 요청 중 오류 발생", error);
        console.error("에러 상세보기", error.response);
      });
  }, [userData.memberId, initialChats]);

  const handleMessage = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendPrivateValue = async () => {
    if (stompClient) {
      const chatMessage = {
        chatRoomId: tab,
        sender: userData.username,
        message: userData.message,
      };
      const updatedPrivateChats = new Map(privateChats);
      const chatMessages = [...updatedPrivateChats.get(tab), chatMessage]; // Create a new array with the new message
      updatedPrivateChats.set(tab, chatMessages); // Update the map with the new array

      setPrivateChats(updatedPrivateChats); // Update the state with the new map
      stompClient.send("/pub/send", {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: "" });
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      sendPrivateValue();
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const xOffset = e.clientX - dragStart.x;
      const yOffset = e.clientY - dragStart.y;

      setPosition({ x: position.x + xOffset, y: position.y + yOffset });
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div
        className="modal-content"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className="modal-header">
          <span className="modalClose" onClick={() => onClose()}>
          <iconify-icon icon="lucide:x-circle"></iconify-icon>
          </span>
          <ul>
            <li className="receiver-name">
                {initialChats.get(tab).partnerName}
                </li>
            <li>
              <input
                className="request-btn"
                type="button"
                value="동네형 등록"
              />
            </li>
          </ul>
        </div>

        {tab !== "CHATROOM" && (
          <div className="chat-content">
            <ul className="chat-messages">
              {(initialChats.get(tab)?.chatMessageDTOList || []).map(
                (chatMessageDTOList, index) => (
                  <li
                    className={`message ${
                      chatMessageDTOList.sender === userData.username && "self"
                    }`}
                    key={index}
                  >
                    {chatMessageDTOList.sender !== userData.username && (
                      <div className="avatar">{chatMessageDTOList.sender}</div>
                    )}
                    <div className="message-data">
                      <div className="message-box">
                        {chatMessageDTOList.message}
                      </div>
                    </div>
                  </li>
                )
              )}
              {[...privateChats.get(tab)].map((chat, index) => (
                <li
                  className={`message ${
                    chat.sender === userData.username && "self"
                  }`}
                  key={index}
                >
                  {chat.sender !== userData.username && (
                    <div className="avatar">{chat.sender}</div>
                  )}
                  <div className="message-data">
                    <div className="message-box">{chat.message}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="send-message">
              <input
                type="text"
                className="input-message"
                placeholder="메시지 입력"
                value={userData.message}
                onChange={handleMessage}
                onKeyPress={handleOnKeyPress}
              />
              <button
                type="button"
                className="send-button"
                onClick={sendPrivateValue}
              >
                전송
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;

