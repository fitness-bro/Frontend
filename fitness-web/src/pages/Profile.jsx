import {React,useState,useEffect} from "react";
import { InfBlock,InfLine,Body} from "./Profile.style";
import ProfileHeader from "../components/ProfileHeader";
import axios from "axios";

export default function Profile(){

    const [inf,setInf]=useState(['위치','소개','중량','가격','주의사항'])
    const [userData, setUserData] = useState({
        name: "",
        age: 0,
        rating: 0,
        comment: "",
        introduction: "",
        price: 0,
        location: ""
      });
    
      useEffect(() => {
        axios.get("여기에_API_URL을_입력하세요")
          .then(response => {
            const data = response.data;
    
            if (data.isSuccess) {
              setUserData(data.result);
            } else {
              console.error("API 요청 실패:", data.message);
            }
          })
          .catch(error => {
            console.error("API 요청 중 오류 발생:", error);
          });
      }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 실행

    return(
        <>
        <Body>
            <ProfileHeader/>
            <InfLine>운동 3년차, 체지방률 14%</InfLine>
                {inf.map(function(item,index){
                    return(
                        <InfBlock key={index}>
                            <h4>{item}</h4>
                            <p>{userData[item.toLowerCase()].introduction}</p>
                        </InfBlock>
                    )
                })
                }
        </Body>
        </>
    );
}   