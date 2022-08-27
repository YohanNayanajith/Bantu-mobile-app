import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import SweetAlert from "react-bootstrap-sweetalert";
import { Link } from "react-router-dom";
import "../newUser/newUser.css";
import "../user/user.css";
import "./SendEmail.css";

export const SendEmail = () => {
  const form = useRef();
  const [show, setShow] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    console.log(form);
    emailjs
      .sendForm(
        "service_ntuuid7",
        "template_n8skbru",
        form.current,
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
  };

  return (
    <div className="newUser">
      <div className="userTitleContainer">
        <h1 className="userTitle">Send Email</h1>
        <div className="userTitleButtons">
        <Link to={"/bulkEmail"}>
          <button className="emailAddButton">Bulk Email</button>
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
        <div className="newUserItem">
          <label>Name</label>
          <input
            name="user_name"
            id="user_name"
            type="text"
            placeholder="Name"
            required
          />
        </div>

        <div className="newUserItem">
          <label>Email</label>
          <input
            name="user_email"
            id="user_email"
            type="email"
            placeholder="Email"
            required
          />
        </div>

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
