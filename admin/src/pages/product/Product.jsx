import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import SweetAlert from "react-bootstrap-sweetalert";

export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [show, setShow] = useState(false);
  const [allShow, setAllShow] = useState(false);
  const [formSaveData, setFormSaveData] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  const updateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formNewData = {
      title: formData.get("title"),
      desc: formData.get("desc"),
      inStock: formData.get("inStock"),
      price: formData.get("price"),
      img: formData.get("img"),
    };
    setFormSaveData(formNewData);
    setShow(true);
  }

  const URL = `http://localhost:5000/api/v1/products/${productId}`;

  const updateProductDetails = async () => {
    setShow(false);
    if(!formSaveData.title){
      formSaveData.title = product.title;
    }
    if(!formSaveData.desc){
      formSaveData.desc = product.desc;
    }
    console.log(formSaveData.img.name);
    if(!formSaveData.img.name){
      formSaveData.img = product.img;
    }
    console.log(formSaveData.img.name);
    if(!formSaveData.price){
      formSaveData.price = product.price;
    }
    if(!formSaveData.inStock){
      formSaveData.inStock = product.inStock;
    }
    try {
      let response = await fetch(URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          title: formSaveData.title,
          desc: formSaveData.desc,
          img: formSaveData.img,
          price: formSaveData.price,
          inStock: formSaveData.inStock,
        }),
      });
      let json = await response.json();
      // setData(json);
      console.log(json);
      setAllShow(true);
      // setLoading(false);
    } catch (error) {
      alert(error);
    }
  }

  const updateProductDetailsCancel = () => {
    setShow(false);
    console.log("Update cancel");
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={updateProduct} >
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" name="title" placeholder={product.title} />
            <label>Product Description</label>
            <input type="text" name="desc" placeholder={product.desc} />
            <label>Price</label>
            <input type="text" name="price" placeholder={product.price} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" name="img" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
      <SweetAlert
          show={show}
          warning
          showCancel
          confirmBtnText="Yes, Update it!"
          confirmBtnBsStyle="danger"
          title="Are you sure?"
          onConfirm={updateProductDetails}
          onCancel={updateProductDetailsCancel}
          focusCancelBtn
        >
          You will not be able to recover this imaginary file!
        </SweetAlert>

        <SweetAlert
        show={allShow}
        success
        title="Successfully updated!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
    </div>
  );
}
