import React, { useState } from "react";
import "./EditProfile.css";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from "../../components/reduxContainer/UserReducer";
import { useNavigate } from "react-router-dom";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

function EditProfile() {
  let location = useLocation();
  let id = location.pathname.split("/")[3];
  console.log(id);

  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  console.log(user);
  const accessToken = user.accessToken

  const [email, setEmail] = useState(user?.other?.email);
  const [phoneNo, setPhoneNo] = useState(user?.other?.phoneNo);
  const [username, setUsername] = useState(user?.other?.username);
  const [title, setTitle] = useState(user?.other?.title)
  const [bio, setBio] = useState(user?.other?.bio);
  // const [password, setPassword] = useState("");
  // const [confPassword, setConfpassword] = useState("")
  const [file, setFile] = useState(null);
  const navigator = useNavigate();

  const dispatch = useDispatch();

  const hadleLogout = () => {
    dispatch(logout());
  }

  const handleEdit = (e) => {
    e.preventDefault();
    if (id === user?.other?._id) {
      if (file !== null) {
        const fileName = new Date().getTime() + file?.name;
        const storage = getStorage(app);
        const StorageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(StorageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
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
              fetch(`/api/user//update/${id}`, {
                method: "PUT",
                headers: {
                  'Content-Type': "application/json",
                  token: accessToken
                },
                body: JSON.stringify({ username: username, email: email, phoneNo: phoneNo, profile: downloadURL, bio: bio, title: title })
              }).then((data) => {
                alert("Your Profile Updated Successfully...!")
                hadleLogout()
              })
            })
          }
        );
      }
      else {
        fetch(`/api/user//update/${id}`, {
          method: "PUT",
          headers: {
            'Content-Type': "application/json",
            token: accessToken
          },
          body: JSON.stringify({ username: username, email: email, phoneNo: phoneNo, bio: bio, title: title })
        }).then((data) => {
          alert("Your Profile Updated Successfully...!")
          hadleLogout()
        })
      }
    }
    else {
      alert("You Can't Change This Profile...!")
    }
  }


  return (
    <>
      <div className="SignUpContainer">
        <Navbar />
        <div className="subEditContainer" style={{ marginTop: '30px' }}>
          <div className="headingContainer">
            <h4>EDIT</h4>
            <span>Happy To Update Your Profile...!</span>
          </div>

          <form action="">
            <div>
              <label htmlFor="profile">
                <img src="" alt="" />
              </label>
            </div>
            <div className="editInputContainer">
              <img src={user?.other?.profile} style={{ width: '100px', height: '100px', borderRadius: '10px' }} alt="" />
              <input type="file" name="image" id="image" onChange={(e) => setFile(e.target.files[0])} />
              <p style={{ fontSize: '13' }}>Username</p>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
              <p style={{ fontSize: '13' }}>Email</p>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
              <p style={{ fontSize: '13' }}>Phone No</p>
              <input type="text" placeholder="Phone Number" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} />
              <p style={{ fontSize: '13' }}>Profile</p>
              <input type="text" placeholder="Enter your Profile" onChange={(e) => setTitle(e.target.value)} value={title} />
              <p style={{ fontSize: '13' }}>Bio</p>
              <input type="text" placeholder="Enter your Bio" onChange={(e) => setBio(e.target.value)} value={bio} />
              <button type="submit" className="loginButton" onClick={handleEdit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
