import React, { useEffect, useState } from 'react'
import './Suggestion.css'
import image from "../images/image2.jpg";
import addFriends from "../images/add-user.png";
import axios from 'axios';
import userToFollow from "../images/afterFollowImg.png"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Suggestion({userdetails}) {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  let id = user.other._id;
  const accessToken = user.accessToken;

  const [follow, setFollow] = useState(addFriends)
  const handleFollow = async (e) => {
    await fetch(`/api/user/following/${userdetails._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", 
        token: accessToken
      }, 
      body: JSON.stringify({"user": `${id}`})
    })
    setFollow(userToFollow);
    window.location.reload(true)
  }


  return (
    <>
              <div className="suggestion" key={userdetails}>
              <div className="suggstionInfo">
                <img src={`${userdetails.profile}`} className="suggestionImage" alt="" />
              </div>
              <div className="suggestionData">
                <p className="friendName">{userdetails.username}</p>
                <p className="friendSuggestion">Suggested For You</p>
              </div>
              <div className="reqIcon" onClick={e => handleFollow(userdetails._id)}>
                <img src={`${follow}`} className="friendIcon" alt="" />
              </div>
            </div>

    </>
  )
}

export default Suggestion
