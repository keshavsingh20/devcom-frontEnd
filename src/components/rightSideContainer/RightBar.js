import React, { useEffect, useState } from "react";
import "./RightBar.css";
import ads from "../images/ads.jpg";
import Suggestion from "../connectionSugestion/Suggestion";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function RightBar() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  const id = user.other._id;
  const accessToken = user.accessToken;
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/all/user/${id}`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        console.log("Some Error Occured...!");
      }
    };
    getUser();
  }, []);
  
  return (
    <>
      <div className="rightbar">
        <div className="rightContainer">
          <div className="adsContainer">
            <img src={`${ads}`} className="adsImage" alt="" />
            <div className="adsContent">
              <p className="adsTitle">Code Demy</p>
              <p className="adsDesc">Buy CodeDemy Course</p>
            </div>
          </div>
          <div className="adsContainer">
            <img src={`${ads}`} className="adsImage" alt="" />
            <div className="adsContent">
              <p className="adsTitle">Code Demy</p>
              <p className="adsDesc">Buy CodeDemy Course</p>
            </div>
          </div>
          <div className="adsContainer">
            <img src={`${ads}`} className="adsImage" alt="" />
            <div className="adsContent">
              <p className="adsTitle">Code Demy</p>
              <p className="adsDesc">Buy CodeDemy Course</p>
            </div>
          </div>
        </div>

        <div className="suggestionContainer2">
          <div className="imp-heading">
            <p className="title">Suggested For You</p>
            <Link to={"/suggestions"} className="sublink">See all</Link>
          </div>
          <hr className="divider" />
          {users.map((item) => (
            <Suggestion userdetails={item} key={item._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default RightBar;
