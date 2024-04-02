import React from "react";
import "./ImgModal.css";
import { Icon } from "@iconify/react";
export default function ImgModal({
  isOpen,
  onClose,
  inputRef,
  handleImageChange,
  handleImgDelete, // handleImgDelete 함수 추가
  handleImageClick,
}) {

    const handleChange=(e)=>{
        onClose();
        handleImageChange(e);
    }

    const handleNone=(e)=>{
        onClose();
        handleImgDelete(e);
    }
    
  return (
    <>
      {isOpen && (
        <div className="ImgModal">
          <div className="ImgModal-content">
            <div className="ImgModalClose" onClick={onClose}>
              &times;
            </div>
            <div className="ImgModal-container">
            <div>
  <Icon onClick={handleImageClick} className="chooseImage" icon="ion:image-outline" />
  <input type="file" ref={inputRef} onChange={handleChange} style={{ display: "none" }} />
  <div className="ImgModalMent">앨범에서 사진 선택</div>
</div>
<div>
<Icon  onClick={handleNone} className="goToNone" icon="fluent:video-person-32-filled"  />
<div className="ImgModalMent">기본 이미지로 변경</div>
</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}