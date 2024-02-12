import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import './ToggleMenu.css';
import axios from "axios";

const ToggleMenu = ({ onSelectCoach }) => {
    const apiUrl="http://dev.fitness-bro.pro/";

    const [userData, setUserData] = useState([]);
    const [showToggleMenu, setShowToggleMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        axios.get(`${apiUrl}match/member/success`)
            .then(response => {
                const data = response.data;
                console.log("API 응답:", response);
                if (data.isSuccess) {
                    const results = data.result;
                    setUserData(results);
                } else {
                    console.error("API 요청 실패:", data.message);
                }
            })
            .catch(error => {
                console.error("API 요청 중 오류 발생:", error);
                console.error("에러 상세 정보:", error.response);
            });
    }, []);

    const handleToggleMenu = () => {
        setShowToggleMenu(!showToggleMenu);
    };

    const handleOptionSelect = (coachName) => {
        setShowToggleMenu(false);
        setSelectedOption(coachName); // 선택된 코치 이름 설정
        onSelectCoach(coachName); // 선택된 코치의 닉네임을 상위 컴포넌트로 전달
    };

    return (
        <div>
            <div className="toggle-menu">
                <div className="toggleIcon">
                    <button onClick={handleToggleMenu} className="toggle-btn">
                        {selectedOption ? selectedOption : "________"}
                    </button>
                    <div className="toggle-menu-icon">
                        <Icon icon="fe:drop-down"/>
                    </div>
                </div>
                {showToggleMenu && (
                    <div className="options">
                        {userData.map(item => (
                            <button key={item.id} onClick={() => handleOptionSelect(item.name)}>
                                {item.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToggleMenu;
