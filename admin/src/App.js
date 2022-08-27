import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Post from "./pages/post/Post";
import { useSelector } from "react-redux";
import Category from "./pages/category/Category";
import CategoryList from "./pages/categoryList/CategoryList";
import NewCategory from "./pages/newCategory/NewCategory";
import PaymentList from "./pages/paymentList/PaymentList";
import Payments from "./pages/payments/Payments";
import PostList from "./pages/postList/PostList";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword";
import { SendEmail } from "./pages/sendEmail/SendEmail";
import BulkEmail from "./pages/BulkEmail/BulkEmail";

function App() {
  // const admin = useSelector((state) => state.user.currentUser.isAdmin);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/ForgetPassword">
          <ForgetPassword />
        </Route>
        {/* {admin && ( */}
        <>
          <Topbar />
          <div className="container">
            <Sidebar />
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users">
              <UserList />
            </Route>
            <Route path="/user/:userId">
              <User />
            </Route>
            <Route path="/newUser">
              <NewUser />
            </Route>
            <Route path="/products">
              <ProductList />
            </Route>
            <Route path="/product/:productId">
              <Product />
            </Route>
            <Route path="/newproduct">
              <NewProduct />
            </Route>

            <Route path="/posts">
              <PostList />
            </Route>
            <Route path="/post/:postId">
              <Post />
            </Route>
            <Route path="/categories">
              <CategoryList />
            </Route>
            <Route path="/category/:categoryId">
              <Category />
            </Route>
            <Route path="/newCategory">
              <NewCategory />
            </Route>
            <Route path="/payments">
              <PaymentList />
            </Route>
            <Route path="/payment/:paymentId">
              <Payments />
            </Route>
            <Route path="/email">
              <SendEmail />
            </Route>
            <Route path="/bulkEmail">
              <BulkEmail />
            </Route>
          </div>
        </>
        {/* )} */}
      </Switch>
    </Router>
  );
}

export default App;
