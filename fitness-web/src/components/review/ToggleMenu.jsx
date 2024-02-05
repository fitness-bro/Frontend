import {useState} from "react";
import { Icon } from "@iconify/react";
import './ToggleMenu.css';


const ToggleMenu = () => {

        const [showToggleMenu, setShowToggleMenu] = useState(false);
        const [selectedOption, setSelectedOption] = useState(null);
      
        const handleToggleMenu = () => {
          setShowToggleMenu(!showToggleMenu);
        };
      
        const handleOptionSelect = (option) => {
          setSelectedOption(option);
          setShowToggleMenu(false);
        };

    return (
        <div>
            {/* 토글 메뉴 */}
            <div className="toggle-menu">
                <div className="toggleIcon">
                    <button onClick={handleToggleMenu} className="toggle-btn">
                        {selectedOption ? selectedOption.label : "________"}
                    </button>

                    <div className="toggle-menu-icon">
                        <Icon icon="fe:drop-down"/>
                    </div>

                    <p>님</p>
                </div>

                {/* 토글 메뉴 옵션 */}
                {showToggleMenu && (
                    <div className="options">
                        <button onClick={() => handleOptionSelect({ label: "송 강" })}>송 강</button>
                        <button onClick={() => handleOptionSelect({ label: "강동원" })}>강동원</button>
                        <button onClick={() => handleOptionSelect({ label: "마동석" })}>마동석</button>
                        <button onClick={() => handleOptionSelect({ label: "구구콘" })}>구구콘</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToggleMenu;