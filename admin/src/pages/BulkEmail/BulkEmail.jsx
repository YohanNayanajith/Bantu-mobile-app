import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import {fetch} from 'wix-fetch';
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import "../newUser/newUser.css";
import "../user/user.css";
import "./BulkEmail.css";

const BulkEmail = () => {
  const form = useRef();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/v1/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // token: token,
          },
        });
        let json = await response.json();
        setData(json);
        console.log(json);
      } catch (error) {
        alert(error);
      }
    };
    getUsers();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const message = form.get("message");
    console.log(message);

    data.map(async (item) => {

      var templateParams = {
        user_name: item.name,
        user_email: item.email,
        message: message,
      };

      emailjs
        .send(
          "service_ntuuid7",
          "template_n8skbru",
          templateParams,
          "o0lw901wGvFdlC5iy"
        )
        .then(
          (result) => {
            console.log(result.text);
            setShow(true);
            e.target.reset();
          },
          (error) => {
            console.log(error.text);
          }
        );
    });
  };

  return (
    <div className="newUser">
      <div className="userTitleContainer">
        <h1 className="userTitle">Send Bulk Emails</h1>
        <div className="userTitleButtons">
          <Link to={"/email"}>
            <button className="emailAddButton">Back</button>
          </Link>
        </div>
      </div>

      {/* <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form> */}

      <SweetAlert
        show={show}
        success
        title="Email Sent!"
        onConfirm={() => setShow(false)}
      ></SweetAlert>

      <form className="newUserForm" ref={form} onSubmit={sendEmail}>
        {/* <div className="newUserItem">
          <label>Name</label>
          <input
            name="user_name"
            id="user_name"
            type="text"
            placeholder="Name"
            required
          />
        </div> */}

        {/* <div className="newUserItem">
          <label>Email</label>
          <input
            name="user_email"
            id="user_email"
            type="email"
            placeholder="Email"
            required
          />
        </div> */}

        <div className="newUserItem">
          <label>Message</label>
          <textarea
            name="message"
            id="message"
            type="text"
            placeholder="Message"
            required
          />
        </div>
        <input type="submit" className="newUserButton" value="Send" />
        {/* <SweetAlert
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
        </SweetAlert> */}
      </form>
    </div>
  );
};

export default BulkEmail;
