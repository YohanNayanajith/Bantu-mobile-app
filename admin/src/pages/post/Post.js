import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  AttachMoney,
  Storefront,
  WorkOutline,
  Timeline,
  Report,
  // EventIcon
} from "@material-ui/icons";
// import HowToRegIcon from '@mui/icons-material/HowToReg';
// import TaskIcon from '@mui/icons-material/Task';
// import PaymentIcon from '@mui/icons-material/Payment';
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../user/user.css";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Post() {
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);

  const URL = `http://localhost:5000/api/v1/post/find/data/${postId}`;

  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch(URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
        });
        let json = await response.json();
        setData(json);
        console.log(json);
        // setLoading(false);
      } catch (error) {
        alert(error);
      }
    };
    userData();
  }, []);


  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">View Post</h1>
        <div className="userTitleButtons">
          <Link to={"/posts"}>
            <button className="userAddButton" style={{marginRight:"20px",backgroundColor: "darkblue"}}>Back</button>
          </Link>

          {/* <Link to={"/newUser"}>
            <button className="userAddButton">Create</button>
          </Link> */}
        </div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://gravatar.com/avatar/932f2d2e75e2483baab6befb7860b327?s=400&d=robohash&r=x"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.postTitle}</span>
              <span className="userShowUserTitle">
                {data.category}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Post Details</span>
            <div className="userShowInfo">
              <WorkOutline className="userShowIcon" />
              <span className="userShowInfoTitle">Post Description - </span>
              <span className="userShowInfoTitle">{data.postDetail}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Post Created By - </span>
              <span className="userShowInfoTitle">{data.userID}</span>
            </div>
            <div className="userShowInfo">
              <Timeline className="userShowIcon" />
              <span className="userShowInfoTitle">Assign or Not - </span>
              <span className="userShowInfoTitle">{data.is_assign}</span>
            </div>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Assign to - </span>
              <span className="userShowInfoTitle">{data.assigned_userID}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Created Date - </span>
              <span className="userShowInfoTitle">{data.date}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">Expire date - </span>
              <span className="userShowInfoTitle">{data.expire_date}</span>
            </div>
            <span className="userShowTitle">Payment Details</span>
            <div className="userShowInfo">
              <AttachMoney className="userShowIcon" />
              <span className="userShowInfoTitle">Price - </span>
              <span className="userShowInfoTitle">{data.price}$</span>
            </div>
            <div className="userShowInfo">
              <Report className="userShowIcon" />
              <span className="userShowInfoTitle">Payment Status - </span>
              <span className="userShowInfoTitle">{data.payment_success}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
