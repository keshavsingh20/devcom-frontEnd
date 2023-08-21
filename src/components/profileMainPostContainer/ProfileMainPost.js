import React, { useState, useEffect } from 'react'
import './ProfileMainPost.css'
import ContentPost from '../contentPostContainer/ContentPost'
import Post from '../profilePostContainer/Post'
import coverImage from '../images/cover.jpg'
import axios from 'axios'
import { logout } from '../reduxContainer/UserReducer';
import { useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, deleteObject } from "firebase/storage";

function ProfileMainPost() {
  const [post, setPost] = useState([]);
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let followerCounter = user?.other?.followers?.length;
  let followingCounter = user?.other?.following?.length;
  const dispatch = useDispatch();

  const hadleLogout = ()=> {
    dispatch(logout());
  }


  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`/api/post/get/post/${id}`)
        setPost(res.data);
      } catch (error) {
        console.log("Some Internal Error Occured...!")
      }
    }
    getPost();
  }, [])

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
    <div>
      <div className="ProfileMinPostContainer">

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

        <div style={{ marginBottom: '20px' }} >
          <img src={`${coverImage}`} className='profileMainCoverImage' alt="" />
          {/* <h2 style={{ marginTop: -45, color: 'white', textAlign: 'end', marginRight: "15px" }}>Your Profile</h2> */}
          <div style={{backgroundColor:'white', padding: '10px', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
          <div className="profileInfo">
            <img
              src={`${user.other.profile}`}
              className="profileMainImage"
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
        </div>
        <ContentPost />

        {
          post.map((item) => (
            <Post details={item} key={item._id}/>
          ))
        }
      </div>
    </div>
  )
}

export default ProfileMainPost
