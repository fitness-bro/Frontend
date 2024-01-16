import {React,useState} from "react";
import { InfBlock,InfLine,Body} from "./Profile.style";
import Header from "../components/ProfileHeader"

export default function Profile(){

    const [inf,setInf]=useState(['위치','소개','중량','가격','주의사항'])



    return(
        <Body>
            <Header/>
            <InfLine>운동 3년차, 체지방률 14%</InfLine>
                {inf.map(function(item){
                    return(
                        <InfBlock>
                            <h4>{item}</h4>
                            <p>내용</p>
                        </InfBlock>
                    )
                })
                }
        </Body>
    );
}   