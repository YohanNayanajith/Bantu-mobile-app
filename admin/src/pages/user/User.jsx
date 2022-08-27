import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "./user.css";
import SweetAlert from "react-bootstrap-sweetalert";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);

  const URL = `http://localhost:5000/api/v1/user/find/${userId}`;

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

  const URL_update = `http://localhost:5000/api/v1/user/${userId}`;

  const updateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      username: formData.get("username"),
      email: formData.get("email"),
      // fullName: formData.get("fullName"),
      phoneNo: formData.get("phoneNo"),
      // addess: formData.get("address"),
    };
    setFormSaveData(formNewData);
    setShow(true);
  };

  const updateConfirm = async () => {
    setShow(false);
    let username = formSaveData.username;
    let email = formSaveData.email;
    if (!username) {
      username = data.username;
    }
    if (!email) {
      email = data.email;
    }
    if(!formSaveData.phoneNo){
      formSaveData.phoneNo = data.telephone_no;
    }
    try {
      let response = await fetch(URL_update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          name: username,
          email: email,
          telephone_no: formSaveData.phoneNo,
          // password: data.password,
          // isAdmin: data.password,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const updateCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <div className="userTitleButtons">
          <Link to={"/users"}>
            <button className="userAddButton" style={{marginRight:"20px",backgroundColor: "darkblue"}}>Back</button>
          </Link>

          <Link to={"/newUser"}>
            <button className="userAddButton">Create</button>
          </Link>
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
              <span className="userShowUsername">{data.name}</span>
              <span className="userShowUserTitle">
                {data.isAdmin ? "Admin" : "User"}
              </span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{data.name}</span>
            </div>
            {/* <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{data.dateOfBirth}</span>
            </div> */}
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.telephone_no}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            {/* <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.address}</span>
            </div> */}
          </div>
        </div>
        <div className="userUpdate">
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
              {/* <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  name="fullName"
                  id="fullName"
                  type="text"
                  placeholder={data.fullName}
                  className="userUpdateInput"
                />
              </div> */}
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
              {/* <div className="userUpdateItem">
                <label>Address</label>
                <input
                  name="address"
                  id="address"
                  type="text"
                  placeholder={data.address}
                  className="userUpdateInput"
                />
              </div> */}
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
        </div>
      </div>
    </div>
  );
}
