import "../userList/userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import { useEffect, useState } from "react";

export default function PostList() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [updateActivate, setUpdateActivate] = useState(false);
  const [updateAllShow, setUpdateAllShow] = useState(false);
  const [postId, setPostId] = useState("");
  const [deleteTrigger, setDeleteTrigger] = useState("");
  // const [data, setData] = useState(userRows);

  // IP address of local machine - 192.168.8.187
  useEffect(() => {
    const userData = async () => {
      try {
        let response = await fetch("http://localhost:5000/api/v1/post", {
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
  }, [deleteTrigger]);

  const URL = `http://localhost:5000/api/v1/post/${postId}`;

  const URl_Update = `http://localhost:5000/api/v1/post/${postId}`;

  const updateConfirm = async () => {
    try {
      let response = await fetch(URl_Update, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          isApproved: updateActivate,
        }),
      });
      let json = await response.json();
      setDeleteTrigger("updated");
      console.log(json);
      setUpdateShow(false);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };

  const deleteConfirm = async () => {
    setShow(false);
    try {
      let response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
      });
      let json = await response.json();
      setDeleteTrigger(json);
      console.log(json);
      setAllShow(true);
      // handleDelete();
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  };
  const deleteCancel = () => {
    setShow(false);
    setUpdateShow(false);
  };

  const handleDelete = (id) => {
    setPostId(id);
    // setData(data.filter((item) => item.id !== id));
  };

  // const statusChanged = (id) => {
  //   setUpdateShow(true);
  //   setUserId(id);
  // };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "postTitle",
      headerName: "Post Title",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            <img
              className="userListImg"
              src={
                "https://gravatar.com/avatar/932f2d2e75e2483baab6befb7860b327?s=400&d=robohash&r=x"
              }
              alt="User Icon"
            />
            {params.row.postTitle}
          </div>
        );
      },
    },
    { field: "payment_success", headerName: "Payment", width: 130 },
    {
      field: "userID",
      headerName: "User ID",
      width: 170,
    },
    {
      field: "date",
      headerName: "Posted Date",
      width: 170,
    },
    {
      field: "isApproved",
      headerName: "Approved",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/post/" + params.row._id}>
              <button className="userListEdit">View</button>
            </Link>
            {params.row.isApproved ? (
              <button
                className="userListEdit"
                onClick={() => {
                  setUpdateShow(true);
                  setUpdateActivate(false);
                  setPostId(params.row._id);
                }}
                style={{ backgroundColor: "red" }}
              >
                Not Accept
              </button>
            ) : (
              <button
                className="userListEdit"
                onClick={() => {
                  setUpdateShow(true);
                  setUpdateActivate(true);
                  setPostId(params.row._id);
                }}
                style={{ backgroundColor: "red" }}
              >
                Accept
              </button>
            )}
            <DeleteOutline
              className="userListDelete"
              onClick={() => {
                handleDelete(params.row._id);
                setShow(true);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
      <SweetAlert
        show={show}
        warning
        showCancel
        confirmBtnText="Yes, Delete it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={deleteConfirm}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      <SweetAlert
        show={updateShow}
        warning
        showCancel
        confirmBtnText="Yes, Update it!"
        confirmBtnBsStyle="danger"
        title="Are you sure?"
        onConfirm={updateConfirm}
        onCancel={deleteCancel}
        focusCancelBtn
      >
        You will not be able to recover this imaginary file!
      </SweetAlert>

      <SweetAlert
        show={allShow}
        success
        title="Successfully delete!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>

      <SweetAlert
        show={updateAllShow}
        success
        title="Successfully update!"
        // text="SweetAlert in React"
        onConfirm={() => setUpdateAllShow(false)}
      ></SweetAlert>
    </div>
  );
}
