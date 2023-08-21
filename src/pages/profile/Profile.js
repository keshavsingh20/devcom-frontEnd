import React from 'react'
import './Profile.css'
import Navbar from '../../components/navbar/Navbar'
// import Footer from '../../components/footer/Footer'
import ProfileLeftbar from '../../components/profileLeftContainer/ProfileLeftbar'
import ProfileMainPost from '../../components/profileMainPostContainer/ProfileMainPost'
import ProfileRightbar from '../../components/profileRightContainer/ProfileRightbar'
import { useSelector } from 'react-redux'


function Profile() {
  const userDetails = useSelector((state)=>state.user);
  let user = userDetails.user

  return (
    <>
      <div>
        <Navbar />
        <div className="profileContainer" style={{marginBottom: 20}}>
          <div className="left">
            <ProfileLeftbar />
          </div>
          <div className="center">
            <ProfileMainPost />
          </div>
          <div className="right">
            <ProfileRightbar />
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </>
  )
}

export default Profile
