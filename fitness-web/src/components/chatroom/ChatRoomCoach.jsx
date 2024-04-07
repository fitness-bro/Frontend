import "./ChatRoom.css";
import React, { useEffect, useState ,useRef} from "react";
import axios from "axios";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { Icon } from "@iconify/react";

let stompClient = null;

const ChatRoomCoach = ({
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
  const apiUrl = process.env.REACT_APP_API_URL;
  const token=localStorage.getItem("token");
  const chatContentRef = useRef(null);
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

  useEffect(() => {
    // 새 채팅이 추가될 때마다 스크롤을 아래로 이동
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [privateChats, tab]);

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
          "token": token,
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
        userId:initialChats.get(tab).userId,
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
            <div className='modal-header'>
                <span className="modalClose" onClick={() => onClose()}>&times;</span>
                <ul>
                    <li className='receiver-name'>
                        {initialChats.get(tab).partnerName}
                    </li>

                </ul>
            </div>

            {tab !== "CHATROOM" && (
<div className="chat-content">
    <ul className="chat-messages" ref={chatContentRef} >
        {initialChats.get(tab)?.chatMessageDTOList?.map((chatMessageDTOList, index) => (
            <li className={`message ${chatMessageDTOList.userId === userData.userId && "self"}`} key={index}>

                 {chatMessageDTOList.userId !== userData.userId && <div className="avatar"> {initialChats.get(tab).pictureUrl? (
                            <img
                            src={initialChats.get(tab).pictureUrl}
                            style={{
                                width: "40px",
                                height: "40px",
                                alignItems: "center",
                                borderRadius: "100px",
                                marginRight:"5px"
                            }}
                          ></img>
                        ) : (
                            <div className="chatRoomgprofile">
                            <Icon
                                className="chatRoomIcon"
                                icon="ic:baseline-person-outline"
                                alt="기본 이미지"
                            />
                        </div>
                        )}</div>}

                

                 <div className="message-data">
                <div className="message-box">{chatMessageDTOList.message}</div>
                </div>
            </li>
        ))}
        {[...privateChats.get(tab)].map((chat, index) => (
            <li className={`message ${chat.userId === initialChats.get(tab).userId && "self"}`} key={index}>
                {chat.userId !== userData.userId && <div className="avatar"> {initialChats.get(tab).pictureUrl? (
                            <img
                            src={initialChats.get(tab).pictureUrl}
                            style={{
                                width: "40px",
                                height: "40px",
                                alignItems: "center",
                                borderRadius: "100px",
                                marginRight:"5px"
                            }}
                          ></img>
                        ) : (
                            <div className="chatRoomgprofile">
                            <Icon
                                className="chatRoomIcon"
                                icon="ic:baseline-person-outline"
                                alt="기본 이미지"
                            />
                        </div>
                        )}</div>}

                <div className="message-data">
                    <div className="message-box">{chat.message}</div>
                </div>
            </li>
        ))}
    </ul>
    <div className="send-message">
        <input type="text" className="input-message" placeholder="메시지 입력" value={userData.message} onChange={handleMessage} onKeyPress={handleOnKeyPress} />
        <button type="button" className="send-button" onClick={sendPrivateValue}>전송</button>
    </div>
</div>
)}
        </div>
    </div>
);
};


export default ChatRoomCoach;

