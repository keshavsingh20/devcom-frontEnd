import React, { useEffect, useState } from 'react'
import ProfileLeftbar from '../../components/profileLeftContainer/ProfileLeftbar'
import ProfileRightbar from '../../components/profileRightContainer/ProfileRightbar'
import Suggestion from '../../components/connectionSugestion/Suggestion'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../profile/Profile.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Connections() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user
  let id = user.other?._id;
  const accessToken = user.accessToken;
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()

  const [followerUser, setFollowerUser] = useState([]);
  useEffect(() => {
    const getFollower = async () => {
      try {
        const res = await axios.get(
          `/api/user/follower/${id}`
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

  const [followingUser, setFollowingUser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `/api/user/following/${id}`
        );
        // console.log(res.data)
        setFollowingUser(res.data);
      } catch (error) {
        console.log("Some Error Occured...!");
        console.log(error);
      }
    };
    getFollowing();
  }, []);

  const handleFollowing = async (itemId) => {
      await fetch(`/api/user/following/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: accessToken
        },
        body: JSON.stringify({ "user": `${user.other._id}` })
      })

      window.location.reload(true)
  }


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
      <div>
        <Navbar />
        <div className="profileContainer">
          <div className="left">
            <ProfileLeftbar />
          </div>
          <div className="center" >
            <div className="profileNotificationContainer" style={{ marginBottom: '10px' }}>
              <div className="imp-heading">
                <p className="title">Followers</p>
                {/* <p className="sublink">See all</p> */}
              </div>
              <hr className="divider" />

              {/* <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px', marginRight: '5px' }}>

                {
                  followerUser.map((item) => (
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer' }}>
                        <img src={`${item?.profile}`} className="FriendReqImg" alt="" />
                        <p style={{ textAlign: 'start', marginLeft: 10, marginTop: '-30px' }}>{item?.username}</p>
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
                  <button className="btn btn-primary" onClick={e => handleFollower(item?._id)}>Remove</button>
                </div>
            ))}
          </div>
            </div>

            <div className="profileNotificationContainer2" style={{marginBottom: '10px', height: 'fit-content'}}>
              {/* <h3 style={{textAlign:"center", fontWeight:500, textDecoration:"underline"}}>Your Connections</h3> */}
              <div className="imp-heading">
                <p className="title">Followings</p>
                {/* <p className="sublink">See all</p> */}
              </div>
              <hr className="divider" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  flexWrap: "wrap",
                }}
              >
                {followingUser.map((item) => (
                  <div key={item._id}>
                    <div style={{ marginLeft: 5 }} key={item.id}>
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
                      <button className="btn btn-primary" onClick={e => handleFollowing(item?._id)}>UnFollow</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          <div className="right">
            <ProfileRightbar />
          </div>
        </div>
      </div>
    </>
  )
}

export default Connections
