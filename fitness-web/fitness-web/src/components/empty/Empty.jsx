import blank from "../../img/blank.png";
import './Empty.css'
const Empty= () => {
    return (
        <div className="blankArea">
          <img src={blank} className="blank"/>
        </div>
    )
}

export default Empty;