import React, { useEffect } from "react";
import axios from "axios";
import "./Post.css";
import { useState } from "react";
import profileImage from "../images/Profile.png";
import LikeIcon from "../images/like.png";
import anotherLikeIcon from "../images/like-blue.png";
import CommentIcon from "../images/comments.png";
import ShareIcon from "../images/share.png";
import { useSelector } from "react-redux";
import { getStorage, ref, deleteObject } from "firebase/storage";

function Post({details}) {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user
  const accessToken = users.accessToken;
  const [like, setLike] = useState(details.like.includes(users.other._id) ? 'fa-solid fa-heart likeIcon' : 'fa-regular fa-heart dislikeIcon');
  const [countLike, setCountLike] = useState(details.like.length);
  const [countComment, setCountComment] = useState(10);
  const [Comments, setComments] = useState(details.comments);
  const [commentWriting, setCommentWriting] = useState("");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getUser = async()=> {
      try {
        const res = await axios.get(`/api/user/post/user/details/${details.user}`)
        setUser(res.data);
      } catch (error) {
        console.log(error)
        console.log('Some Error Occured...!')
      }
    }
    getUser();
  }, [])

  const handleLike = async() => {
    if (like === 'fa-regular fa-heart dislikeIcon') {
      await fetch(`/api/post/${details._id}/like`, {
        method: "PUT",
        headers:
          { 'Content-Type': "application/json", token: accessToken },
        body: JSON.stringify({ "user": users.other._id })
      }).then(resp => {
        // console.log(resp);
      })

      setLike("fa-solid fa-heart likeIcon")
      setCountLike(countLike + 1);

    } else {
      await fetch(`/api/post/${details._id}/like`, {
        method: "PUT",
        headers:
          { 'Content-Type': "application/json", token: accessToken },
        body: JSON.stringify({ "user": users.other._id })
      })

      setLike('fa-regular fa-heart dislikeIcon');
      setCountLike(countLike - 1);
    }
  };

  const addComment = async () => {
    const comment = {
      "postid": `${details._id}`,
      "username": `${users.other.username}`,
      "comment": `${commentWriting}`,
      "profile": `${users.other?.profile}`
    }
    await fetch(`/api/post/comment/post`, { method: "PUT", headers: { 'Content-Type': "application/Json", token: accessToken }, body: JSON.stringify(comment) })
    setComments(Comments.concat(comment));
  }

  const handleComment = () => {
    addComment();
    setCommentWriting('');

  };


  const handleShow = () => {
    show === false ? setShow(true) : setShow(false);
  };

  const handlePostDelete = async()=> {
    try {
      const storage = getStorage();

      // Create a reference to the file to delete
      let downloadURL = ''
      if(details.image !== '') {
        downloadURL = details.image
      }
      else if(details.video !== '') {
        downloadURL = details.video
      }
      const desertRef = ref(storage, downloadURL);
      
      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      

    axios.delete(`/api/post/delete/post/${details._id}`)  
      .then(res => {  
        console.log("Your Post has been deleted...!")
        window.location.reload(true)
      }) 
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <div className="postContainer" key={details}>
        <div className="subPostContainer">
          <div className="user-profile">
            {/* {
              user.profile == '' ? <img src={`${profileImage}`} alt="" /> : <img src={`${user.profile}`} alt="" />
            } */}
            <img src={`${user.profile}`} alt="" />
            
            <div>
              {/* <p>{user.username}</p> */}
              <p>{user.username}</p>
              {/* <span>May 18 2023</span> */}
              <small>Public</small>
            </div>
          </div>
          <div onClick={handlePostDelete}>
              <i className="fa fa-trash" style={{ color: 'black', justifyContent:'end' }}></i>
            </div>
        </div>
        <div>
          <p className="post-text">
            {details.title} 
          </p>
          <img src={`${details.image}`} className="post-image" alt="Post Image" />
          <div className="postRow">
            <div className="activityIcons">
              <div className="activityContainer">
                {/* <img src={`${like}`} onClick={handleLike} alt="" /> */}
                <i className={`${like}`} onClick={handleLike} ></i>
                <p>{countLike} Likes</p>
              </div>
              <div className="activityContainer">
                {/* <img src={`${CommentIcon}`} onClick={handleShow} alt="" /> */}
                <i className="fa-solid fa-comment" onClick={handleShow} style={{color:'blue'}}></i>
                <p>{Comments.length} Comments</p>
              </div>
              <div className="activityContainer">
                {/* <img src={`${ShareIcon}`} alt="" /> */}
                {/* <i className="fa-sharp fa-solid fa-share-nodes" style={{color:'blue'}}></i>
                <p>45 Shares</p> */}
              </div>
            </div>
          </div>

          {show === true ? (
            <div>
              {Comments.map((item) => {
                return (
                  <div style={{ alignItems: "center" , marginTop:5, marginBottom:-15}}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={`${profileImage}`}
                        className="PostImage"
                        alt=""
                      />
                      <p
                        style={{
                          marginLeft: "6px",
                          fontSize: 16,
                          marginTop: -10,
                        }}
                      >
                        {item.username}
                      </p>
                    </div>

                    <div className="commentbox">
                      <div className="commentbody">
                        <span className="tip tip-left"></span>
                        <div className="message">
                          <span>{item.comment}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div
                style={{
                  display: "flex", flexDirection:'column',
                  alignItems: "start",
                }}
              >
                <div style={{display: 'flex', alignItems:'center'}}>
                <img src={`${users?.other?.profile}`} className="PostImage" alt="" />
                {/* <p style={{marginLeft: '6px'}}>Suman</p> */}
                <input
                  type="text"
                  className="commentInput"
                  onChange={(e) => setCommentWriting(e.target.value)}
                  value={commentWriting}
                  placeholder="Write your comment here..."
                />
                <button className="btn btn-primary addComment" onClick={handleComment}>
                {/* <i class="fa-solid fa-comment-arrow-down" style={{color:'red'}}></i> */}
                <i className="fa-solid fa-arrow-right" style={{color:'white'}}></i> 
                </button>
                </div>
                
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Post;
