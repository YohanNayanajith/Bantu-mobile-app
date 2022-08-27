import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import SweetAlert from "react-bootstrap-sweetalert";
// import { useNavigate } from "react-router";
import styled from "styled-components";
import {mobile} from "../../responsive";
// import {
//   useNavigate,
// } from 'react-router-dom';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://res.cloudinary.com/midefulness/image/upload/v1657441705/cld-sample.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isFetching = useSelector((state) => state.user.currentUser);
  const isfail = useSelector((state) => state.user.error);
  const [data, setData] = useState([]);
  // const navigate  = useNavigate();
  const [allShow, setAllShow] = useState(false);
  const [allErrorShow, setAllErrorShow] = useState(false);
  const dispatch = useDispatch();
  // const navigation = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    // login(dispatch, { username, password });
    // if (isfail) {
    //   alert("Username password incorrect!");
    //   setAllErrorShow(true);
      
    //   // navigate("/login");
    //   // window.href("http://localhost:3000/");
    // } else {
    //   setAllShow(true);
    //   window.href("http://localhost:3000/");
    //   // alert("Login Success!");
    // }
    checkLogin();
  };

  const checkLogin = async () => {
    try {
      let response = await fetch("http://192.168.8.187:5000/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // token: token,
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      });
      let json = await response.json();
      setData(json);

      if (response.ok && json.isAdmin) {
        console.log(json);
        setAllShow(true);
        // alert("Man2");
        // window.href("http://localhost:3000/");
        window.location.href = "http://localhost:3000/";
      } else {
        setAllErrorShow(true);
        // alert("Man");
      }
    } catch (error) {
      setAllErrorShow(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleClick}>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button disabled={isFetching}>LOGIN</Button>
          {/* {error && <Error>Something went wrong...</Error>} */}
          <Link href="/ForgetPassword">DO NOT YOU REMEMBER THE PASSWORD?</Link>
          {/* <Link href="/register">CREATE A NEW ACCOUNT</Link> */}
        </Form>
      </Wrapper>
      <SweetAlert
        show={allShow}
        success
        title="Successfully login!"
        // text="SweetAlert in React"
        onConfirm={() => setAllShow(false)}
      ></SweetAlert>
      <SweetAlert
        show={allErrorShow}
        danger
        title="Login unsuccessfully!"
        // text="SweetAlert in React"
        onConfirm={() => setAllErrorShow(false)}
      ></SweetAlert>
    </Container>

    // <div
    //   style={{
    //     height: "100vh",
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >

    //   <input
    //     style={{ padding: 10, marginBottom: 20 }}
    //     type="text"
    //     placeholder="username"
    //     onChange={(e) => setUsername(e.target.value)}
    //   />
    //   <input
    //     style={{ padding: 10, marginBottom: 20 }}
    //     type="password"
    //     placeholder="password"
    //     onChange={(e) => setPassword(e.target.value)}
    //   />
    //   <button onClick={handleClick} style={{ padding: 10, width: 100 }}>
    //     Login
    //   </button>
    // </div>
  );
};

export default Login;
