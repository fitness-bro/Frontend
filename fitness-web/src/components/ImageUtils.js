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
            formData.append('files', currentImage); // 각 이미지를 FormData에 추가
        }

        // for (let i = 0; i < imageLists.length; i++) {
        //   formData.append('album', imageLists[i], `@${imageLists[i].name};type=${imageLists[i].type}`);
        // }

        // 최대 6개까지 제한합니다.
        imageUrlLists = imageUrlLists.slice(0, 6);
        setShowImages(imageUrlLists);

        // 선택된 이미지로 콜백 함수를 호출합니다.
        onImageSelected(imageLists);

    } catch (error) {
        console.error("이미지 업로드 중 오류 발생: ", error);
    }
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