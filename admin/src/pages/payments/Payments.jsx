import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  AttachMoney,
  BarChart,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../user/user.css";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Payments() {
  const location = useLocation();
  const paymentId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);

  const URL = `http://localhost:5000/api/v1/checkout/find/${paymentId}`;

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
        <h1 className="userTitle">View Payment</h1>
        <div className="userTitleButtons">
          <Link to={"/payments"}>
            <button
              className="userAddButton"
              style={{ marginRight: "20px", backgroundColor: "darkblue" }}
            >
              Back
            </button>
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
              <span className="userShowUsername">{data.UserID}</span>
              {/* <span className="userShowUserTitle">
                {data.isAdmin ? "Admin" : "User"}
              </span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <AttachMoney className="userShowIcon" />
              <span className="userShowInfoTitle">Currency - </span>
              <span className="userShowInfoTitle">{data.currency}</span>
            </div>
            <div className="userShowInfo">
              <AttachMoney className="userShowIcon" />
              <span className="userShowInfoTitle">Amount - </span>
              <span className="userShowInfoTitle">{data.amount}</span>
            </div>
            <div className="userShowInfo">
              <BarChart className="userShowIcon" />
              <span className="userShowInfoTitle">Success State - </span>
              <span className="userShowInfoTitle">{data.status}</span>
            </div>
            {/* <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.description}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div> */}
          </div>
        </div>
        {/* <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpdateForm" onSubmit={updateUser}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Username</label>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    placeholder={data.name}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    name="email"
                    id="email"
                    type="text"
                    placeholder={data.email}
                    className="userUpdateInput"
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    name="phoneNo"
                    id="phoneNo"
                    type="text"
                    placeholder={data.telephone_no}
                    className="userUpdateInput"
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateUpload">
                  <img
                    className="userUpdateImg"
                    src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                    alt=""
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdateIcon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
                <button className="userUpdateButton" type={"submit"}>
                  Update
                </button>
                <SweetAlert
                  show={show}
                  warning
                  showCancel
                  confirmBtnText="Yes, update it!"
                  confirmBtnBsStyle="danger"
                  title="Are you sure?"
                  onConfirm={updateConfirm}
                  onCancel={updateCancel}
                  focusCancelBtn
                >
                  You will not be able to recover this imaginary file!
                </SweetAlert>
              </div>
            </form>
          </div> */}
      </div>
    </div>
  );
}
