import './ChatRoom.css';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import React, { useEffect, useState } from 'react';
import axios from "axios";

let stompClient = null;

const ChatRoom = ({ isOpen, onClose, tab, userData, initialChats, setUserData }) => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const apiUrl = "http://dev.fitness-bro.pro/";
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImhlZXN1bjEwN0BrYWthby5jb20iLCJpYXQiOjE3MDc5NzgwNDgsImV4cCI6MTcwNzk4MTY0OH0.OEx1FO7dgtbQidIsxkt0sH5URVy3PMFJHRhhfR12b1w';

    
    useEffect(() => {
        let Sock = new SockJS('http://dev.fitness-bro.pro/stomp/chat');
        stompClient = over(Sock);

        Sock.onopen = () => {
            console.log('WebSocket connected');
            // 연결이 열리면 해당 채팅방 구독
            stompClient.subscribe(`/sub/queue/chat/${tab}`, message => {
                const newMessage = JSON.parse(message.body);
                setPrivateChats(prevChats => {
                    const updatedChats = new Map(prevChats);
                    const messages = updatedChats.get(tab);
                    messages.push(newMessage);
                    updatedChats.set(tab, messages);
                    return updatedChats;
                });
            });
        };

        return () => {
            Sock.close();
        };
    }, [tab]);

    useEffect(() => {
        axios.get(`${apiUrl}members/chatrooms`, {
            headers: {
                'token': token
            }
        })
            .then(response => {
                const responseData = response.data;
                console.log("API 응답:", responseData);

                if (responseData.isSuccess) {
                    const { result } = responseData;
                    const updatedChats = new Map(initialChats); // initialChats로 초기화
                    result.forEach(chat => {
                        updatedChats.set(chat.chatRoomId, []); // 해당 채팅방의 채팅 정보 가져오기
                    });
                    console.log("초기 채팅 정보:", updatedChats);
                    setPrivateChats(updatedChats); // privateChats 상태 업데이트
                } else {
                    console.log("API 요청 실패:", responseData.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생", error);
                console.error("에러 상세보기", error.response);
            });
    }, [userData.memberId, initialChats]);

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }

    const sendPrivateValue = async () => {
        if (stompClient) {
            var chatMessage = {
                roomId: tab,
                sender: userData.username,
                message: userData.message,
            };

            stompClient.send("/pub/send", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });

            const updatedChats = new Map(privateChats);
            updatedChats.get(tab).push(chatMessage);
            setPrivateChats(updatedChats);
        }
    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
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
                        <li>
                            <input className="request-btn" type="button" value="동네형 등록" />
                        </li>
                    </ul>
                </div>
                {tab !== "CHATROOM" && (
                    <div className="chat-content">
                        <ul className="chat-messages">
                        {initialChats.get(tab).chatMessageList.map((message, index) => (
                <li className="message" key={index}>
                    <div className="message-box">{message}</div>
                </li>
            ))}
                            {[...privateChats.get(tab)].map((chat, index) => (
                                <li className={`message ${chat.sender === userData.username && "self"}`} key={index}>
                                    {chat.sender !== userData.username && <div className="avatar">{chat.sender}</div>}
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

export default ChatRoom;