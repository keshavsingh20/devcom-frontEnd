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

function Post({ post }) {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails.user
  const accessToken = users.accessToken;

  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/user/post/user/details/${post.user}`)
        setUser(res.data);
      } catch (error) {
        console.log(error)
        console.log('Some Error Occured...!')
      }
    }
    getUser();
  }, [])

  const [like, setLike] = useState(post.like.includes(users.other._id) ? 'fa-solid fa-heart likeIcon' : 'fa-regular fa-heart dislikeIcon');
  const [countLike, setCountLike] = useState(post.like.length);
  const [countComment, setCountComment] = useState(10);
  const [Comments, setComments] = useState(post.comments);
  const [commentwriting, setCommentWriting] = useState("");
  const [show, setShow] = useState(false);


  const handleLike = async () => {
    if (like === 'fa-regular fa-heart dislikeIcon') {

      await fetch(`/api/post/${post._id}/like`, {
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
      await fetch(`/api/post/${post._id}/like`, {
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
      "postid": `${post._id}`,
      "username": `${users.other.username}`,
      "comment": `${commentwriting}`,
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
      if(post.image !== '') {
        downloadURL = post.image
      }
      else if(post.video !== '') {
        downloadURL = post.video
      }
      const desertRef = ref(storage, downloadURL);
      
      // Delete the file
      deleteObject(desertRef).then(() => {
        // File deleted successfully
      }).catch((error) => {
        // Uh-oh, an error occurred!
      });
      

    axios.delete(`/api/post/delete/post/${post._id}`)  
      .then(res => {  
        alert("Your Post has been deleted...!")
        window.location.reload(true)
      }) 
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <>
      <div className="postContainer">
        <div className="subPostContainer">
          <div className="user-profile">
            {
              user.profile === '' ? <img src={`${profileImage}`} alt="" /> : <img src={`${user.profile}`} alt="" />
            }

            <div>
              <p>{user.username}</p>
              <small>Following by you</small>
            </div>
          </div>
          {
            users.other._id === post.user ? <div onClick={handlePostDelete}>
              <i className="fa fa-trash" style={{ color: 'black', justifyContent:'end' }}></i>
            </div> : ''
          }
        </div>

        <div>
          <p className="post-text">
            {post.title}
          </p>
          {
            post.image !== '' ?
              <img src={`${post.image}`} className="post-image" alt="" />
              : post.video !== '' ? <video className="post-image" width="100%" height="400" controls>
                <source src={`${post.video}`} type="video/mp4" />
              </video> : ''
          }

          <div className="postRow">
            <div className="activityIcons">
              <div className="activityContainer">
                <i className={`${like}`} onClick={handleLike} ></i>
                <p>{countLike} Likes</p>
              </div>
              <div className="activityContainer">
                <i className="fa-solid fa-comment" onClick={handleShow} style={{ color: 'blue' }}></i>
                <p>{Comments.length} Comments</p>
              </div>
              <div className="activityContainer">
                {/* <img src={`${ShareIcon}`} alt="" /> */}
                {/* <i className="fa-sharp fa-solid fa-share-nodes" style={{ color: 'blue' }}></i>
                <p>45 Shares</p> */}
              </div>
            </div>
          </div>

          {show === true ? (
            <div>
              {Comments.map((item) => {
                return (
                  <div style={{ alignItems: "center", marginTop: 5, marginBottom: -15 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        src={`${item.profile}`}
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
                  display: "flex", flexDirection: 'column',
                  alignItems: "start",
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={`${users.other?.profile}`} className="PostImage" alt="" />
                  <input
                    type="text"
                    className="commentInput"
                    onChange={(e) => setCommentWriting(e.target.value)}
                    value={commentwriting}
                    placeholder="Write your comment here..."
                  />
                  <button className="btn btn-primary addComment" onClick={handleComment}>
                    <i className="fa-solid fa-arrow-right" style={{ color: 'white' }}></i>
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
