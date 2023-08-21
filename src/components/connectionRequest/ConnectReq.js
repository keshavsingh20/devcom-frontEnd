import React from 'react'
import './ConnectReq.css'
import image1 from "../images/image3.jpg";

function ConnectReq() {
  return (
    <>
      <div class="profileNotificationContainer">
          <div className="imp-heading">
            <p className="title">Connection Requests</p>
            <p className="sublink">See all</p>
          </div>
          <hr className="divider" />

          <div style={{marginBottom: 10}}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer' }}>
              <img src={`${image1}`} className="FriendReqImg" alt="" />
              <p style={{ textAlign: 'start', marginLeft: 10, marginTop:'-30px' }}>Suman want to be friend with you.</p>
            </div>
            <div className='btnContainer'>
              <button className='btn btn-success reqBtn'>Accept</button>
              <button className='btn btn-danger reqBtn'>Reject</button>
            </div>
          </div>
          <div style={{marginBottom: 10}}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer' }}>
              <img src={`${image1}`} className="FriendReqImg" alt="" />
              <p style={{ textAlign: 'start', marginLeft: 10, marginTop:'-30px' }}>Suman want to be friend with you.</p>
            </div>
            <div className='btnContainer'>
              <button className='btn btn-success reqBtn'>Accept</button>
              <button className='btn btn-danger reqBtn'>Reject</button>
            </div>
          </div>
          <div style={{marginBottom: 10}}>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, cursor: 'pointer' }}>
              <img src={`${image1}`} className="FriendReqImg" alt="" />
              <p style={{ textAlign: 'start', marginLeft: 10, marginTop:'-30px' }}>Suman want to be friend with you.</p>
            </div>
            <div className='btnContainer'>
              <button className='btn btn-success reqBtn'>Accept</button>
              <button className='btn btn-danger reqBtn'>Reject</button>
            </div>
          </div>

        </div>
    </>
  )
}

export default ConnectReq





