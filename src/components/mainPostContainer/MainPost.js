import React, { useState } from "react";
import "./MainPost.css";
import ContentPost from "../contentPostContainer/ContentPost";
import Post from "../postContainer/Post";
import { useEffect} from "react";
import axios from 'axios'
import { useSelector } from "react-redux";

function MainPost() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user
  let id = user?.other?._id;
  const [post, setPost] = useState([]);
  const accessToken = user.accessToken;

  useEffect(() => {
    const getPost = async() => {
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
      <div className="mainPostContainer">
        <ContentPost />

       {
        post.map((item)=> (
            <Post post={item} key={item._id} />
        ))
       }

      </div>
    </>
  );
}

export default MainPost;
