import React, { useEffect, useState } from 'react'
import './ProfileRightbar.css'
import Suggestion from '../connectionSugestion/Suggestion'
import image1 from "../images/image3.jpg";
import ConnectReq from '../connectionRequest/ConnectReq';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProfileRightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  const accessToken = user.accessToken;
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  let idForSuggest = user.other._id;
  const [users, setUsers] = useState([]);
  const [followerUser, setFollowerUser] = useState([]);

  useEffect(() => {
    const getFollower = async () => {
      try {
        const res = await axios.get(
          `/api/user/follower/${user.other._id}`
        );
        // console.log(res.data)
        setFollowerUser(res.data);
      } catch (error) {
        console.log("Some Error Occured...!");
        console.log(error);
      }
    };
    getFollower();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/all/user/${idForSuggest}`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
        console.log("Some Error Occured...!");
      }
    };
    getUser();
  }, []);

  const handleFollower = async(itemId)=> {
    await fetch(`/api/user/follower/remove/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: accessToken
      },
      body: JSON.stringify({ "user": `${user.other._id}` })
    })

    window.location.reload(true)
  }

  return (
    <>
      <div className="profileRightbar">
        <div className="profileNotificationContainer" style={{height:' 260px', overflow:'hidden'}}>
          <div className="imp-heading">
            <p className="title">Followers</p>
            <Link to="/connections" className="sublink">See all</Link>
          </div>
          <hr className="divider" />

          {/* <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', marginRight: '5px' }}>

            {
              followerUser.map((item) => (
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer' }}>
                        <img src={`${item?.profile}`} className="FriendReqImg" alt="" />
                        <p style={{ textAlign: 'start', marginLeft: 10, marginTop: '-30px' }}>{item?.username}</p>
                        <button className='btn btn-primary'>Remove</button>
                      </div>
                    </div>
              ))
            }
          </div> */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {followerUser.map((item) => (
                <div style={{ marginLeft: 5 }} key={item?.id}>
                  <img src={`${item?.profile}`} className="friendImage" alt="" />
                  <p
                    style={{
                      marginTop: -5,
                      marginBottom: "5px",
                      textAlign: "center",
                    }}
                  >
                    {item?.username}
                  </p>
                  <button className="btn btn-primary" style={{marginTop:-10, padding: '5px'}} onClick={e => handleFollower(item?._id)}>Remove</button>
                </div>
            ))}
          </div>

        </div>

        <div className="suggestionContainer2">
          <div className="imp-heading">
            <p className="title">Suggested For You</p>
            <Link to={'/suggestions'} className="sublink">See all</Link>
          </div>
          <hr className="divider" />
          {users.map((item) => (
            <Suggestion userdetails={item} key={item._id}/>
          ))}
        </div>

      </div>
    </>
  )
}

export default ProfileRightbar
