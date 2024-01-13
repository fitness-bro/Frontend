import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    const name = {
        color: "black",
        textDecoration: "none",
        margin: "60px 100px", 
    }
    const align = {
        textAlign: "left",
        
        
    }

    const listItemStyle = {

        marginLeft:"150px",
        marginBottom:"100px",
        marginTop:"60px"

    }

    return (
        <div className="header-container">
            <div className="header-wrap">
            <ul style={align}>
                <li style={listItemStyle}>
                <Link to="/" style={name}>  <img
                        style={{ width: "154px", height: "20px" }}
                       
                        alt="로고"
                    /></Link>
                </li>
                <li style={listItemStyle}>
                    <Link to="/Find" style={name}>동네형 찾기</Link>
                </li>
                <li style={listItemStyle}>
                    <Link to="/Registration" style={name}>동네형 등록</Link>
                </li>
                <li style={listItemStyle}>
                    <Link to="/MyPage" style={name}>마이 페이지</Link>
                </li>

            </ul>
            </div>
        </div>
    )
}

export default Header;