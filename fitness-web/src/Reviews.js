import {useState} from "react";
import './Reviews.css';
import defaultImage from './img/profileImage.png'

const Reviews = ()=>{

    const maxChar = 1000; // 최대 글자수
    const [content, setContent] = useState(""); // 입력 내용

    const handleCharNum = (e)=>{ // 글자수에 대한 함수
        const inputValue = e.target.value;

        if (inputValue.length <= maxChar) { // 글자수 제한
            setContent(inputValue); // 글자수가 1000자 이하일 때 상태변화함수에 저장
        }
    }

    const handleSubmit = ()=>{ // 내용 작성 팝업창에 대한 함수
        if (content === '') {
            alert('내용을 작성해주세요')
        }
        
        else
            alert('작성 완료');
    }

    const [images, setImages] = useState([ // 기본 이미지
        defaultImage, defaultImage, defaultImage, defaultImage, defaultImage
    ]);
    const [uploadButtonDisabled, setUploadButtonDisabled] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

    const handleImageChange = (e)=>{ // 이미지 파일 삽입에 대한 함수
        const newImages = [...images]; // 현재 이미지 배열 복사
        const reader = new FileReader(); // FileReader 객체 생성

        reader.onload = (event) => {
            const nextIndex = getNextAvailableIndex(newImages, selectedImageIndex); // 다음 사용 가능한 인덱스 찾기
            if (nextIndex !== -1) {
                newImages[nextIndex] = event.target.result; // 이미지 배열의 해당 인덱스에 새 이미지 경로 저장
                setSelectedImageIndex(nextIndex); // 선택된 이미지의 인덱스 업데이트
                setImages(newImages); // 이미지 배열 업데이트
            }
    
            if (!newImages.includes(defaultImage)) {
                setUploadButtonDisabled(true); // 이미지 배열에 기본 이미지가 없으면 업로드 버튼 비활성화
            }
        }
        
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]); // 사용자가 선택한 파일을 읽어와서 이미지 경로로 변환
        }
    }

    const getNextAvailableIndex = (imageArray, currentIndex) => {
        const nextIndex = imageArray.findIndex((image, index) => image === defaultImage && index >= currentIndex + 1); // 기본 이미지가 있는 다음 사용 가능한 인덱스 찾기
        return nextIndex !== -1 ? nextIndex : imageArray.findIndex(image => image === defaultImage);  // 다음 사용 가능한 인덱스가 없으면 처음부터 다시 찾기
    };
    
    const handleImageClick = (index) => {
        const newImages = [...images]; // 현재 이미지 배열 복사
        newImages[index] = defaultImage; // 클릭한 이미지의 인덱스에 기본 이미지 경로 저장
        setImages(newImages); // 이미지 배열 업데이트
        setUploadButtonDisabled(false); // 업로드 버튼 활성화
    };

    return( 
        <div className="Reviews">
            
            {/* 최상단 페이지 전환 버튼 */}
            <div className="header">
                <h1>동네형 (로고)</h1>
                <div className="headerButtons">
                    <button className="button1">동네형 찾기</button>
                    <button className="button2">마이페이지</button>
                    <button className="button3">회원가입</button>
                </div>
            </div>

            <div className="text1">
                <h2>후기 작성</h2>
                <button>뒤로가기</button>
            </div>

            
            <div>
                <div className="textarea-container">
                    {/* 입력 내용 */}
                    <textarea
                    value={content}
                    onChange={handleCharNum}
                    maxLength={maxChar}
                    >
                    </textarea>

                    {/* 글자수 세기 */}
                    <div className="charNum">
                        <p>{maxChar-content.length}/1000</p>
                    </div>
                </div>

                {/* 기본 프로필 사진 */}
                <div className="defaultImage">
                    {images.map((image, index)=>(
                        <div key={index}>
                            <img
                                style={{width:"100px", height:"100px", cursor: "pointer", borderRadius:"100px"}}
                                src={image}
                                alt={`프로필사진 ${index + 1}`}
                                onClick={()=>handleImageClick(index)}
                            ></img>
                        </div>
                    ))}
                </div>

                {/* 이미지 불러오기 */}
                <div>
                    <label htmlFor="inputImage" className="inputLabel">이미지 불러오기</label>
                    <input
                        id="inputImage"
                        type="file"
                        accept="image/*"
                        disabled={uploadButtonDisabled}
                        onChange={handleImageChange}
                    >
                    </input>
                </div>

                {/* 후기 작성 버튼 */}
                <div>
                    <button onClick={handleSubmit} type="button" className={content ? 'submitbtnOn' : 'submitbtn'}>
                        후기 작성 완료하기
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Reviews;