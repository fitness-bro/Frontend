import React, {useEffect} from "react";
import Modal from "react-modal";
import "./ModalSearch.css";



const ModalSearch = ({ open, onClose, gymList, onGymClick, keyword }) => {

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행
    Modal.setAppElement('body');
  }, []);

  return (
    
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: "",
        },
        content: {
          width: "600px",
          height: "150px",
          margin: "auto",
          borderRadius: "10px",
          padding: "0%",
          borderColor: "#D1b5A1",
        },
      }}
    >
      <div className="modalsearch-content">
        <div className="modalsearch-body">
          {gymList && gymList.length > 0 ? (
            <ul>
              {gymList.map((gym) => (
              <li key={gym.id} onClick={() => onGymClick(gym)}>
                <p>
                  <span style={{ fontSize: '17px', fontWeight: 'bold'}}>
                    {typeof gym.name === 'object' ? gym.name.name : gym.name} &nbsp; &nbsp;
                  </span>
                  <span style={{ fontSize: '15px', fontWeight:'500'}}>
                    {gym.region} {gym.subAddress} {gym.detailAddress}
                  </span>
                </p>
              </li>
          ))}
            </ul>
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalSearch;