import React, { useEffect, useState } from "react";
import "./ProfileLeftbar.css";
import profileCoverImage from "../images/cover.jpg";
import profileImage from "../images/Profile.png";
import image3 from "../images/image3.jpg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../reduxContainer/UserReducer';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getStorage, ref, deleteObject } from "firebase/storage";


function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let username = user.other.username;
  const accessToken = user.accessToken;
  const dispatch = useDispatch();
  const [users, setUser] = useState([]);
  const navigate = useNavigate()
  let followerCounter = user?.other?.followers?.length;
  let followingCounter = user?.other?.following?.length;
  const [followingUser, setFollowingUser] = useState([]);

  const hadleLogout = ()=> {
    dispatch(logout());
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/post/user/delete/${user.other._id}`)
        setUser(res.data);
      } catch (error) {
        console.log(error)
        console.log('Some Error Occured...!')
      }
    }
    getUser();
  }, [id])


  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `/api/user/following/${user.other._id}`
        );
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


  const accountDeleteHandler = () => {
    document.getElementById("myModal").style.display = "block";
  }

  const yesDelete = async() => {
    try {
      const storage = getStorage();

      // Create a reference to the file to delete
      let downloadURL = ''
      if (user.other.profile !== '') {
        downloadURL = user.other.profile
      }
      const desertRef = ref(storage, downloadURL);

      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });


      axios.delete(`/api/user/delete/${user.other._id}`)
        .then(res => {
          alert("Your Account has been deleted...!")  
          hadleLogout()
        })
    } catch (error) {
      console.log(error)
    }
  }

  const noDelete = () => {
    document.getElementById("myModal").style.display = "none";
  }

  return (
    <>
      <div className="profileLeftbar">

        <div id="myModal" className="modal">
          {/* <!-- Modal content --> */}
          <div className="modal-content">
            {/* <span class="close">&times;</span> */}
            <p>Are You Sure to Delete Your Account Permanently..?</p>
            <div>
              <button className="btn btn-success" onClick={yesDelete}>Yes</button>
              <button className="btn btn-danger" onClick={noDelete}>No</button>
            </div>
          </div>
        </div>

        <div className="profileNotificationContainer">
          <img src={`${profileCoverImage}`} className="profileCover" alt="" />
          <div className="profileInfo">
            <img
              src={`${user.other.profile}`}
              className="profileImage"
              alt=""
            />
            <div className="profileData">
              <p>{user.other.username}</p>
              <p style={{ color: "gray" }}>{user?.other?.title}</p>
            </div>
          </div>


          <div className="profileMeta">
            <p>Follower</p>
            <p className="profileMetaRight">{followerCounter}</p>
          </div>
          <hr className="divider" />
          <div className="profileMeta">
            <p>Following</p>
            <p className="profileMetaRight">{followingCounter}</p>
          </div>
          <hr className="divider" />

          <div className="bio">
            <div className="bioHeader">
              <h5>Profile Bio</h5>
                <div>
                  <Link to={`/edit/profile/${user.other._id}`} className="btn btn-primary" >
                    <i className="fas fa-edit" style={{ color: "white" }}></i>
                  </Link>
                  <button className="btn btn-danger" onClick={accountDeleteHandler}>
                    <i className="fas fa-trash" style={{ color: "white" }}></i>
                  </button>
                </div>
            </div>
            <div>
              <p>
                {user?.other?.bio}
              </p>
            </div>
          </div>
        </div>

        <div className="profileNotificationContainer2">
          <div className="imp-heading">
            <p className="title">Followings</p>
            <Link className="sublink" to="/connections">See all</Link>
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
                <div style={{ marginLeft: 5 }} key={item?.profile}>
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
                  <button className="btn btn-primary" style={{marginTop:-10, padding: '5px'}} onClick={e => handleFollowing(item?._id)}>UnFollow</button>
                </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileLeftbar;
