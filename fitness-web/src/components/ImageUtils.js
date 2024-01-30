import {useState} from "react";
import './ImageUtils.css';
import { Icon } from "@iconify/react";

// 이미지 처리
const ImageUtils = ()=>{
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];
    
    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    
    // 최대 6개로 제한
    imageUrlLists = imageUrlLists.slice(0, 6);
    setShowImages(imageUrlLists);
  };
    
  const handleDeleteImage = (id) => {
    setShowImages((prevImages) => prevImages.filter((_, index) => index !== id));
  };
      
  const emptyImageStyle = { // 기본 이미지 스타일
    width: '80px',
    height: '80px',
    border: '3px dashed #cccccc',
    margin: '5px',
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