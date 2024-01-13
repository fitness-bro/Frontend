import {useRef, useState} from "react";
import img from "../img/profile.png"
//import { useSelector} from "react-redux";

function Member() {
   // const user = useSelector((state) => state.user);
   const user={
    name:"지공이",
    success:3,
    review:2,
    

   }
   const textStyle={
    color:"#3176ff",
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
                    {image ? <img   style={{ width: "150px", height: "150px", alignItems:"center", borderRadius:"100px"}} src={URL.createObjectURL(image)} alt=""/> : <img  style={{ width: "150px", height: "150px",borderRadius:"50px"}} src={img} alt=""/>}
                    <input type="file" ref={inputRef} onChange={handleImageChange} style={{display:"none"}}/>
                </div>
            </td>
        </tr>
        <tr>
            <td colSpan={2} style={{fontSize:"20px", fontWeight:"800"}}>
            {user.name}님, 오늘도 건강하세요!

            </td>
        </tr>
        <tr>
            <td>성사 성공 <sapn style={textStyle}>{user.success}</sapn> |</td>
   
            <td>후기 작성 <sapn style={textStyle}>{user.review}</sapn></td>
        </tr>
       </table>
    </div>
  );
}

export default Member;