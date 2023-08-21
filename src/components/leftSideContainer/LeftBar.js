import React from 'react'
import './LeftBar.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import image from "../images/Profile.png";
import image1 from "../images/ads.jpg";
import { useSelector } from 'react-redux';


function LeftBar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  let id = user.other._id;
  const accessToken = user.accessToken;
  const [post, setPost] = useState([]);


  useEffect(() => {
    const getPost = async () => {
      const getPostUrl = `/api/user/flw/${id}`;
      try {
        const res = await axios.get(getPostUrl, {
          headers: {
            token: accessToken
          }
        })

        setPost(res.data);
      } catch (error) {

      }
    }

    getPost();
  }, []);



  return (
    <>
      <div className="leftbar">
        <div className="NotificationContainer">
          <div className="imp-heading">
            <p className="title">Notifications</p>
            <p className="sublink">See all</p>
          </div>
          <hr className="divider" />

          <div className="notification">
            <img src={`${image}`} className="notificationImg" alt="" />
            <p className="notificationContent">Mohit commented on your post</p>
            <img src={`${image1}`} className="likeImage" alt="" />
          </div>

          <div className="notification">
            <img src={`${image}`} className="notificationImg" alt="" />
            <p className="notificationContent">Mohit Liked your post</p>
            <img src={`${image1}`} className="likeImage" alt="" />
          </div>

          <div className="notification">
            <img src={`${image}`} className="notificationImg" alt="" />
            <p className="notificationContent">Mohit Liked your post</p>
            <img src={`${image1}`} className="likeImage" alt="" />
          </div>

          <div className="notification">
            <img src={`${image}`} className="notificationImg" alt="" />
            <p className="notificationContent">Mohit Liked your post</p>
            <img src={`${image1}`} className="likeImage" alt="" />
          </div>
        </div>

        <div className="NotificationContainer2">
          <div className="imp-heading">
            <p className="title">Explore</p>
            <p className="sublink">See all</p>
          </div>
          <hr className="divider" />

          <div className="explore">

            {
              post.map((item) => (
                item.image === '' ? ''
                  : <img src={`${item.image}`} className="exploreImage" alt="" />
              ))
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default LeftBar
