import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import styled from "styled-components";

export const GoogleButton=styled.div`
align-items: center; 
justify-content: center; 
display: flex;
background-color: rgba(0, 0, 0, 0);
padding:10px;
`

const SocialGoogle = () => {
    const clientId = '537715934624-eo0dmpvk1jhc9bfmnt5gt5vaur7du6vj.apps.googleusercontent.com'

    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
            <GoogleButton>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                />
                </GoogleButton>
            </GoogleOAuthProvider>
        </>
    );
};
    
export default SocialGoogle;