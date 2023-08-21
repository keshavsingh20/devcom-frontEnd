import React, { useState } from "react";
import "./ContentPost.css";
import { Link } from "react-router-dom";
import profileImage from "../images/Profile.png";
import imageIcon from "../images/photo.png";
import emojiIcon from "../images/feeling.png";
import videoIcon from "../images/live-video.png";
import { useSelector } from "react-redux";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function ContentPost() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user?.other?._id;
  const accessToken = user.accessToken;

  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTitle] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handlePost = (e) => {
    e.preventDefault();
    if (file !== null) {
      const fileName = new Date().getTime() + file?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log("Image File available at", downloadURL);
            fetch(`/api/post/user/post`, {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
                token: accessToken
              },
              body: JSON.stringify({ title: title, image: downloadURL, video:'' })
            }).then((data)=> {
              alert("Your Post Uploaded Successfully...!")
              window.location.reload(true)
            })
          })
        }
      );
    }
    else if (file2 !== null) {
      const fileName = new Date().getTime() + file2?.name;
      const storage = getStorage(app);
      const StorageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(StorageRef, file2);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            fetch(`/api/post/user/post`, {
              method: "POST",
              headers: {
                'Content-Type': "application/json",
                token: accessToken
              },
              body: JSON.stringify({ title: title,image: '', video: downloadURL })
            }).then((data)=> {
              alert("Your Post Uploaded Successfully...!")
              window.location.reload(true)
            })
          });
        }
      );
    }
    else {
      fetch(`/api/post/user/post`, {
            method: "POST",
            headers: {
              'Content-Type' : "application/json",
              token: accessToken
            },
            body: JSON.stringify({title: title, image:'', video:''})
          }).then((data)=> {
            alert("Your Post Uploaded Successfully...!")
            window.location.reload(true)
          })
    }
  };

  return (
    <>
      <div className="contentUploadContainer">
        <div className="user-profile">
          <img src={`${user.other.profile}`} alt="" />
          <div>
            <p>{`${user.other.username}`}</p>
            <small>Public</small>
          </div>
        </div>

        <div className="post-input-container">
          <textarea
            name=""
            id=""
            cols=""
            rows="3"
            placeholder="Write Your Post here..."
            onChange={(e) => setTitle(e.target.value)}
          ></textarea>

          {
            imagePreview !== null ? <img src={`${imagePreview}`} className="post-image" alt="" />
            : videoPreview !== null ? <video className="post-image" width="100%" height="400" controls>
            <source src={`${videoPreview}`} type="video/mp4" />
          </video> : ''
          }
  
          <div className="add-post-links">
            <label htmlFor="video">
              <img src={`${videoIcon}`} alt="" /> Video
              <input
                type="file"
                name="video"
                id="video"
                style={{ display: "none" }}
                onChange={(e) => [setFile2(e.target.files[0]), setVideoPreview(URL.createObjectURL(e.target.files[0]))]}
              />
            </label>
            <label htmlFor="image">
              <img src={`${imageIcon}`} alt="" /> Image
              <input
                type="file"
                name="image"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => [setFile(e.target.files[0]), setImagePreview(URL.createObjectURL(e.target.files[0]))]}
              />
            </label>
            <label htmlFor="emoji">
              <img src={`${emojiIcon}`} alt="" /> Feeling
              <input
                type="file"
                name="emoji"
                id="emoji"
                style={{ display: "none" }}
              />
            </label>
          </div>
          <button className="btn btn-primary post-btn" onClick={handlePost}>
            Post
          </button>
        </div>
      </div>
    </>
  );
}

export default ContentPost;
