import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import { useForm } from "react-hook-form";
import "./newUser.css";
import "../user/user.css";

export default function NewUser() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [formSaveData, setFormSaveData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  // const URL = `http://localhost:5000/api/v1/user/find/${userId}`;

  // useEffect(() => {
  //   const userData = async () => {
  //     try {
  //       let response = await fetch(URL, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // token: token,
  //         },
  //       });
  //       let json = await response.json();
  //       setData(json);
  //       console.log(json);
  //       // setLoading(false);
  //     } catch (error) {
  //       alert(error);
  //     }
  //   };
  //   userData();
  // }, []);

  const URL_create = "http://localhost:5000/api/v1/auth/admin/register";

  const createUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    const formNewData = {
      username: formData.get("username"),
      email: formData.get("email"),
      // fullName: formData.get("fullName"),
      telephone_no: formData.get("phoneNo"),
      // address: formData.get("address"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      // dateOfBirth: formData.get("birthday"),
      selectUser: formData.get("userType"),
      isActivation: formData.get("userIdentification"),
    };
    setFormSaveData(formNewData);
    setShow(true);
    // createConfirm();
  };

  const createConfirm = async () => {
    if (!(formSaveData.password === formSaveData.confirmPassword)) {
      alert("Please check your confirm password!");
      return;
    }
    let isAdmin = false;

    if(formSaveData.selectUser.toString() === "2"){
      // alert("Man hari");
      isAdmin = true;
    }
    setShow(false);
    try {
      let response = await fetch(URL_create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          name: formSaveData.username,
          // fullName: formSaveData.fullName,
          email: formSaveData.email,
          password: formSaveData.password,
          confirmPassword: formSaveData.confirmPassword,
          telephone_no: formSaveData.telephone_no,
          // address: formSaveData.address,
          // dateOfBirth: formSaveData.dateOfBirth,
          isAdmin: isAdmin,
          selectUser: formSaveData.selectUser,
          // isActivation: formSaveData.isActivation,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      setAllShow(true);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const createCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <div className="newUser">
      {/* <h1 className="newUserTitle">New User</h1> */}

      <div className="userTitleContainer">
        <h1 className="userTitle">New User</h1>
        <div className="userTitleButtons">
          <Link to={"/users"}>
            <button className="userAddButton">Back</button>
          </Link>
        </div>
      </div>

      {/* <form onSubmit={handleSubmit(onSubmit)} className="newUserForm">
      <div className="newUserItem">
          <label>Username</label>
          <input {...register("firstName", { required: true, maxLength: 20 })} />
        </div>
        
        <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
        <input type="number" {...register("age", { min: 18, max: 99 })} />
        <input type="submit" />
      </form> */}

      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>

      <form className="newUserForm" onSubmit={createUser}>
        <div className="newUserItem">
          <label>Username</label>
          <input
            name="username"
            id="username"
            type="text"
            placeholder="john"
            required
          />
        </div>
        {/* <div className="newUserItem">
          <label>Full Name</label>
          <input
            name="fullName"
            id="fullName"
            type="text"
            placeholder="John Smith"
            required
          />
        </div> */}
        <div className="newUserItem">
          <label>Email</label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="john@gmail.com"
            required
          />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div className="newUserItem">
          <label>Confirm Password</label>
          <input
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="password"
            required
          />
        </div>
        <div className="newUserItem">
          <label>Phone Number</label>
          <input
            name="phoneNo"
            id="phoneNo"
            type="text"
            placeholder="+1 123 456 78"
            required
          />
        </div>
        {/* <div className="newUserItem">
          <label>Address</label>
          <input
            name="address"
            id="address"
            type="text"
            placeholder="New York | USA"
            required
          />
        </div> */}

        <div className="newUserItem">
          <label>User Type</label>
          <select
            className="newUserSelect"
            name="userType"
            id="userType"
            required
          >
            <option value={1}>User</option>
            <option value={0}>Worker</option>
            <option value={2}>Admin</option>
          </select>
        </div>
        {/* <div className="newUserItem">
          <label for="birthday">Birthday:</label>
          <input type="date" id="birthday" name="birthday"></input>
        </div> */}

        <div className="newUserItem">
          <label>User Activation</label>
          <div className="newUserGender">
            <input
              type="radio"
              name="userIdentification"
              id="activate"
              value="1"
            />
            <label for="activate">Activate</label>
            <input
              type="radio"
              name="userIdentification"
              id="disable"
              value="0"
            />
            <label for="disable">Disable</label>
          </div>
        </div>

        <button type="submit" className="newUserButton">
          Create
        </button>
        <SweetAlert
          show={show}
          warning
          showCancel
          confirmBtnText="Yes, Create it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={createConfirm}
          onCancel={createCancel}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>
      </form>
    </div>
  );
}
