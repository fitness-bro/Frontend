import {useRef, useState} from "react";
import { Link } from 'react-router-dom'
import { Icon } from "@iconify/react";
import './Member.css';

//import { useSelector} from "react-redux";

function MemberCoach() {
   // const user = useSelector((state) => state.user);
   const user={
    name:"지공이",
    success:3,
    review:2,
    

   }
   const textStyle={
    color:"#FF9549",
   }

    const inputRef = useRef(null);
    const [image, setImage] = useState("");
    
    const handleImageClick = () =>{
        inputRef.current.click();
    }
    const handleImageChange =(e)=>{
        const file=e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
    }
  return (
    <div className="memberContainer">
       <table >
        <tr>
            <td colSpan={2}>
                <div onClick={handleImageClick} style={{ marginLeft:'auto', marginRight:'auto', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '150px', height: '150px' }}>
                    {image ? <img   style={{ width: "150px", height: "150px", alignItems:"center", borderRadius:"100px"}} src={URL.createObjectURL(image)} alt=""/> : <div className="memberbgprofile"><Icon className="memberIcon" icon="ic:baseline-person-outline" alt="기본 이미지"/></div>}
                    <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
                </div>
                <Link to="/ModifyingInformation"  style={{color:'#FF9549'}}>나의 정보 수정하기</Link>
            </td>
        </tr>
        <tr>
            <td colSpan={2} style={{fontSize:"20px", fontWeight:"800"}}>
            {user.name}님, 오늘도 건강하세요!

            </td>
        </tr>
        <tr>
            <td>성사 성공 <sapn style={textStyle}>{user.success}</sapn></td>
   
            <td>후기 작성 <sapn style={textStyle}>{user.review}</sapn></td>
        </tr>
       </table>
    </div>
  );
}

export default MemberCoach;