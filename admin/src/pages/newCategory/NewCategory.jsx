import { Link } from "react-router-dom";
import { useState } from "react";
import SweetAlert from "react-bootstrap-sweetalert";
import "../newUser/newUser.css";
import "../user/user.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function NewCategory() {
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [file, setFile] = useState(null);

  const URL_create = "http://localhost:5000/api/v1/category";

  const createConfirm = async () => {
    setShow(false);
    console.log(categoriesData);
    try {
      let response = await fetch(URL_create, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          category: categoriesData.category,
          img: categoriesData.img,
        }),
      });
      let json = await response.json();
      setData(json);
      console.log(json);
      setAllShow(true);
    } catch (error) {
      alert(error);
    }
  };

  const createCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //   addProduct(product, dispatch);
          //   setAllShow(true);
          setShow(true);
          //   setFormSaveData((prev) => {
          //     return { ...prev, [e.target.name]: e.target.value };
          //   });
          const formData = new FormData(e.target);
          const category = formData.get("category");
          const categories = { img: downloadURL, category: category };
          setCategoriesData(categories);
        });
      }
    );
  };

  return (
    <div className="newUser">
      {/* <h1 className="newUserTitle">New User</h1> */}

      <div className="userTitleContainer">
        <h1 className="userTitle">New Category</h1>
        <div className="userTitleButtons">
          <Link to={"/categories"}>
            <button className="userAddButton">Back</button>
          </Link>
        </div>
      </div>

      <SweetAlert
        show={allShow}
        success
        title="Successfully added!"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>

      <form className="newUserForm" onSubmit={handleClick}>
        <div className="newUserItem">
          <label>Category Name</label>
          <input
            name="category"
            id="category"
            type="text"
            placeholder="Old Books"
            required
          />
        </div>

        <div className="newUserItem">
          <label for="image_url">Image</label>

          {/* <label>Image</label> */}
          <input
            type="file"
            id="file"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
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
