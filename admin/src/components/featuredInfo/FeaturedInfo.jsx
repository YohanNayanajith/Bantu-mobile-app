import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [countCategory, setCountCategory] = useState();
  const [countUsers, setCountUsers] = useState();
  const [countPosts, setCountPosts] = useState();
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("http://localhost:5000/api/v1/checkout");
        setIncome(res.data);
        setPerc((res.data[1].amount * 100) / res.data[0].amount - 100);
      } catch {}
    };
    getIncome();
  }, []);

  useEffect(() => {
    const getCountUsers = async () => {
      try {
        const res = await userRequest.get("http://localhost:5000/api/v1/user");
        setCountUsers(res.data.length);
        console.log(countUsers);
      } catch {}
    };
    getCountUsers();
  },[]);
  useEffect(() => {
    const getCountCategory = async () => {
      try {
        const res = await userRequest.get("http://localhost:5000/api/v1/category");
        setCountCategory(res.data.length);
        console.log(countCategory);
      } catch {}
    };
    getCountCategory();
  },[]);
  useEffect(() => {
    const getCountPosts = async () => {
      try {
        const res = await userRequest.get("http://localhost:5000/api/v1/post");
        setCountPosts(res.data.length);
        console.log(countPosts);
      } catch {}
    };
    getCountPosts();
  },[]);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">No of Users</span>
        <div className="featuredMoneyContainer">
          {/* <span className="featuredMoney">${income[1]?.total}</span> */}
          <span className="featuredMoney">{countUsers}</span>
          {/* <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No of Categories</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{countCategory}</span>
          {/* <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">No of Post</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{countPosts}</span>
          {/* <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span> */}
        </div>
        {/* <span className="featuredSub">Compared to last month</span> */}
      </div>
    </div>
  );
}
