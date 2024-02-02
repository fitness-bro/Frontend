import './RegistChoice.style';

const RegistChoice=()=>{
    return(
        <>
        <ModalOverlay></ModalOverlay>
        <ModalContainer>
                <img src={loginLogo}/>
                <h2>로그인</h2>
                <SocialKakao></SocialKakao>
                <SocialNaver></SocialNaver>
                <SocialGoogle></SocialGoogle>
                <ModalButton onClick={closeModal}>닫기</ModalButton>
        </ModalContainer>
        </>
    )
}

export default RegistChoice;