import {Link} from "react-router-dom";
import "./Popup.css"

const Popup = () => {
  return (
        <div id={"privacy-policy-popup"} className={"border border-secondary rounded bg-dark wd-policy-popup"}>
          <i onClick={() => document.getElementById("privacy-policy-popup").style.visibility='hidden'}
             className="fas fa-times fa-pull-right mt-1 me-2 pt-1"/>
          <p className={"pt-1 ms-2"}>By using our website, you agree to our <Link to="/policy">Privacy Policy</Link></p>
        </div>
  )

}

export default Popup