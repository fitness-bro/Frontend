import {useState} from "react";
import './ImageUtils.css';
import { Icon } from "@iconify/react";

// 이미지 처리
const ImageUtils = ({onImageSelected}) => {
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = async (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];
    const formData = new FormData();

    try {
        for (let i = 0; i < imageLists.length; i++) {
            const currentImage = imageLists[i];
            imageUrlLists.push(URL.createObjectURL(currentImage));
            formData.append('files', currentImage); // 파일 객체를 FormData에 추가
        }

        // 최대 6개로 제한
        imageUrlLists = imageUrlLists.slice(0, 6);
        setShowImages(imageUrlLists);

        // 이미지 선택 콜백 함수 호출
        onImageSelected(imageLists);

        // 이미지 선택 콜백 함수 호출
        onImageSelected(imageLists);

    } catch (error) {
        console.error("이미지 업로드 중 오류 발생: ", error);
    }
};
    
  const handleDeleteImage = (id) => {
    setShowImages((prevImages) => prevImages.filter((_, index) => index !== id));
  };
      
  const emptyImageStyle = { // 기본 이미지 스타일
    width: '90px',
    height: '90px',
    border: '3px dashed #cccccc',
    margin: '15px',
    borderRadius: '5px',
    color: '#919191',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
      <div className="image-container">
        {/* 기본 프로필 사진 */}
        <div className="image-gallery" >
          {[...Array(6)].map((_, id) => (
            <div className="image-container" key={id} onClick={() => handleDeleteImage(id)}>
              {showImages[id] ? (<img src={showImages[id]} alt={`${showImages[id]}-${id}`} />) :
              (
              <div className="empty-image" style={emptyImageStyle}>
              <Icon className="imgIcon" icon="ic:baseline-person-outline" alt="기본 이미지"/>
              </div>
              )}
            </div>
          ))}
        </div>
    
        {/* 이미지 불러오기 */}
        <div>
          <input type="file"  id="input-file" style={{display:"none"}} onChange={handleAddImages} />
            <label htmlFor="input-file" className="add-button">
              이미지 불러오기
            </label>
        </div>
    </div>
  );
};
    
export default ImageUtils;