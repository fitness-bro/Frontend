import { useState } from "react";
import "./ImageUtils.css";
import { Icon } from "@iconify/react";

// 이미지 처리
const ImageUtils = ({ onImageSelected }) => {
  const [showImages, setShowImages] = useState([]);

  const handleAddImages = async (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];

    try {
      for (let i = 0; i < imageLists.length; i++) {
        const currentImage = imageLists[i];
        imageUrlLists.push(currentImage);
      }

      // 최대 6개로 제한
      imageUrlLists = imageUrlLists.slice(0, 6);
      setShowImages(imageUrlLists);
      onImageSelected(imageUrlLists);

      console.log("Selected Images:", imageUrlLists);
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생: ", error);
    }
  };

  const handleDeleteImage = (id) => {
    setShowImages((prevImages) =>
      prevImages.filter((_, index) => index !== id)
    );
  };

  const emptyImageStyle = {
    // 기본 이미지 스타일
    width: "90px",
    height: "90px",
    border: "3px dashed #cccccc",
    margin: "15px",
    borderRadius: "5px",
    color: "#919191",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div>
      <div className="image-gallery">
        {[...Array(6)].map((_, id) => (
          <div className="image-container" key={id}>
            {showImages[id] ? (
              <div>
                <div className="close" onClick={() => handleDeleteImage(id)}>
                  <div className="closeIcon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 8 8"
                    >
                      <path
                        fill="currentColor"
                        d="M1.41 0L0 1.41l.72.72L2.5 3.94L.72 5.72L0 6.41l1.41 1.44l.72-.72l1.81-1.81l1.78 1.81l.69.72l1.44-1.44l-.72-.69l-1.81-1.78l1.81-1.81l.72-.72L6.41 0l-.69.72L3.94 2.5L2.13.72z"
                      />
                    </svg>
                  </div>
                </div>
                <img
                  src={URL.createObjectURL(showImages[id])}
                  alt={`${showImages[id].name}-${id}`}
                />
              </div>
            ) : (
              <div className="empty-image" style={emptyImageStyle}>
                <Icon
                  className="img-icon"
                  icon="ic:baseline-person-outline"
                  alt="기본 이미지"
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <input
        type="file"
        id="input-file"
        style={{ display: "none" }}
        onChange={handleAddImages}
      />
      <label htmlFor="input-file" className="add-button">
        이미지 불러오기
      </label>
    </div>
  );
};

export default ImageUtils;
