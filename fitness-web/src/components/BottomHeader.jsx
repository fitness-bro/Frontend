import {BhWrap} from "./BottomHeader.style";
import fitnessImg from "../img/fitness.svg";

export default function BottomHeader() {
    return(
        <BhWrap>
        <img src={fitnessImg} />
        <h4>운동 별거 없다. 형아랑 같이 운동하자!</h4>
        <p>© 2024 동네형 all rights reserved.</p>
        </BhWrap>
    );
}