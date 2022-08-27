import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import "../user/user.css";
import SweetAlert from "react-bootstrap-sweetalert";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

export default function Category() {
  const location = useLocation();
  const categoryId = location.pathname.split("/")[2];
  const [data, setData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(null);

  const URL = `http://localhost:5000/api/v1/category/find/${categoryId}`;

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

  const URL_update = `http://localhost:5000/api/v1/category/${categoryId}`;

  const updateConfirm = async () => {
    setShow(false);
    try {
      let response = await fetch(URL_update, {
        method: "PUT",
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
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const updateCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  const handleClick = (e) => {
    e.preventDefault();
    // let categoryData = {}
    const formData = new FormData(e.target);
    let category = formData.get("category");
    if (!file) { 
      setFile(data.img);
    //   alert(data.img);
      if (!category) {
        category = data.category;
      }
      const categories = { img: data.img, category: category };
      console.log(categories);
      setCategoriesData(categories);
      setShow(true);
    } else {
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
            setShow(true);
            if (!category) {
              category = data.category;
            }
            const categories = { img: downloadURL, category: category };
            setCategoriesData(categories);
            setShow(true);
          });
        }
      );
    }
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit Category</h1>
        <div className="userTitleButtons">
          <Link to={"/categories"}>
            <button
              className="userAddButton"
              style={{ marginRight: "20px", backgroundColor: "darkblue" }}
            >
              Back
            </button>
          </Link>

          <Link to={"/newCategory"}>
            <button className="userAddButton">Create</button>
          </Link>
        </div>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.img} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.category}</span>
              {/* <span className="userShowUserTitle">
                {data.isAdmin ? "Admin" : "User"}
              </span> */}
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleClick}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Category Title</label>
                <input
                  name="category"
                  id="category"
                  type="text"
                  placeholder={data.category}
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img className="userUpdateImg" src={data.img} alt="" />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="img"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
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
