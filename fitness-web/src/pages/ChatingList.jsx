import {InfoWrap,All,FrontWrap, Ul, Li,ChatMessage,ChatWrap} from "./ChatingList.style";
import chatImg from "../img/profile.png";


export default function ChatingList(){
const chatings=[
    {id:1,profileImg: chatImg, name:"강동원",message:"오늘 운동오냐?",date:"3:15PM"}
    ,{id:2,profileImg: chatImg, name:"송  강",message:"오늘 운동오냐?",date:"3:15PM"}
    ,{id:3,profileImg: chatImg, name:"소지섭",message:"오늘 운동오냐?",date:"3:15PM"}

]

    return(
    <All>
        <FrontWrap>
        <p>채팅 리스트</p>
        <button>뒤로가기</button>
        </FrontWrap>

        <Ul>
                {chatings.map((chating) =>(
                    <Li key={chating.id}>
                        {/* 프로필 이미지 */}
                        <img src={chating.profileImg} alt={`${chating.name}`}/>
                        
                        <ChatWrap>
                            <InfoWrap>
                                {/* 신청인 */}
                                <p>{chating.name}</p>                            
                                {/* 날짜 */}
                                <h4>{chating.date}</h4>
                            </InfoWrap>
                        
                            <ChatMessage>{chating.message}</ChatMessage>   
                        </ChatWrap>                 
                    </Li>
                ))}
            </Ul>
    </All>
    );
}