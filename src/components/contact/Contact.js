import React, { useEffect, useState } from 'react'
import './Contact.css'
import profileImage from '../images/Profile.png'
import { useSelector } from 'react-redux';
import axios from 'axios';
import ChatContainer from '../chatContainer/ChatContainer';

function Contact() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user
    let id = user.other._id
    const accessToken = user.accessToken

    const [users, setUsers] = useState()
    const [currentChatUser, setCurrentChatUser] = useState('')

    useEffect(() => {
        const getUser = async () => {
            const getContactUrl = `/api/user/following/${id}`;
            try {
                const res = await axios.get(getContactUrl, {
                    headers: {
                        token: accessToken
                    }
                })

                setUsers(res.data);
            } catch (error) {

            }
        }
        getUser();
    }, []);

    const handleUser = (e) => {
        setCurrentChatUser(e)
    }

    return (
        <>
         <div className='ChatHolder'>
         <div className="chatLeft" >
            <div className='mainContactContainer'>
                <div>

                    <div className='chatUser'>
                        {
                            users?.map((item) => (
                                <div className='chatUserContainer' onClick={(e)=> handleUser(item)} key={item._id} >
                                    <div className='chatUserImage'>
                                        <img src={item.profile} alt="" />
                                    </div>
                                    <div className='chatUserInfo'>
                                        <p>{item.username}</p>
                                        <p>Open your message</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </div>
            </div>


            <div className="chatRight">
                    { currentChatUser !== '' ?
                        <ChatContainer currentChatUser={currentChatUser} />
                        :
                        <div style={{marginLeft: '20px', marginTop: '10px'}}>Explore New Chatting Experience...! Click on your contacts...!</div> 
                    }
            </div>
            </div>
        </>
    )
}

export default Contact
