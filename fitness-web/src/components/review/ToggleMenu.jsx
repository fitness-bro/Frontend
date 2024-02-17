// ToggleMenu.jsx
import { useState } from "react";
import { Icon } from "@iconify/react";
import './ToggleMenu.css';

const ToggleMenu = ({ coachNicknames, onCoachSelect }) => {

    const [showToggleMenu, setShowToggleMenu] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleToggleMenu = () => {
        setShowToggleMenu(!showToggleMenu);
    };

    const handleOptionSelect = (coachName) => {
        setShowToggleMenu(false);
        setSelectedOption(coachName); // 선택된 코치 이름 설정
        onCoachSelect(coachName);
    };

    // coachNicknames가 비어있을 때 처리
    if (!coachNicknames || coachNicknames.length === 0) {
        return <div>No coach available</div>;
    }

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
                        
                        {coachNicknames.map((coachName,index) => (
                             <button key={index} onClick={() => handleOptionSelect(coachName)}>
                             {coachName}
                         </button>
                        ))}
                       
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToggleMenu;