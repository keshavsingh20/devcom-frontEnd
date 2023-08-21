import React, { useEffect, useRef, useState } from 'react'
import './ChatContainer.css'
import profileImage from '../images/Profile.png'
import imageIcon from "../images/photo.png";
import emojiIcon from "../images/feeling.png";
import videoIcon from "../images/live-video.png";
import axios from 'axios';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'

function ChatContainer({ currentChatUser }) {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user
    let id = user.other._id
    const accessToken = user.accessToken

    const [message, setMessage] = useState();
    const [inputMessage, setInputMessage] = useState('');
    const bottomRef = useRef(null);
    const socket = useRef()
    const [arrivalmMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        const getMessage = async () => {
            const getMessageUrl = `/api/message/get/chat/msg/${id}/${currentChatUser?._id}`;
            try {
                const res = await axios.get(getMessageUrl, {
                    headers: {
                        token: accessToken
                    }
                })

                setMessage(res.data);
            } catch (error) {

            }
        }
        getMessage();
    }, [currentChatUser?._id]);

    const scrollBottom = ()=> {
        if(bottomRef.current) {
            bottomRef.current?.scrollIntoView({behavior: 'smooth', block: 'end', inline:'nearest'});
        }
    }

    useEffect(() => {
        scrollBottom()
        
      }, [message]);

    useEffect(()=> {
        if(currentChatUser !== '') {
            socket.current = io("/")
            socket.current.emit("addUser", id)
        }
    }, [id])

    const sendmsg = ()=> {
        const messages = {
            myself: true,
            message: inputMessage
        }

        socket.current.emit("send-msg", {
            to: currentChatUser._id,
            from: id,
            message: inputMessage
        })

        fetch(`/api/message/msg`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/JSON',
                token: accessToken 
            },
            body: JSON.stringify({
                from: id,
                to: currentChatUser._id,
                message: inputMessage
            })
        })

        setMessage(message.concat(messages))
        setInputMessage('')
    }


    useEffect(()=> {
        if(socket.current) {
            socket.current.on("msg-recieve", (msg)=>{
                setArrivalMessage({myself:false, message: msg})
            })
        }
    }, [arrivalmMessage])
   

    useEffect(()=>{
        arrivalmMessage && setMessage((pre)=> [...pre, arrivalmMessage])
    },[arrivalmMessage])

    return (
        <>
            <div className='mainChatContainer'>
                <div>
                    <div className='userInfo'>
                        <img src={currentChatUser?.profile} className='ChatUserImg' alt="" />
                        <p>{currentChatUser?.username}</p>
                    </div>
                    <div className='chatContainer'>

                        {
                            message?.map((item) => (
                                <div key={item._id}>
                                    {
                                        item.myself === false ?
                                            <div className='messageContainer'>
                                                <img src={currentChatUser?.profile} className='ChatUserImg' alt="" />
                                                <p className='message'>{item?.message}</p>
                                            </div>
                                            :
                                            <div className='messageReplyContainer'>
                                                <p>{item.message}</p>
                                            </div>
                                    }
                                </div>

                            ))
                        }
                            <div ref={bottomRef} />
                    </div>

                    <div className='msgInputContainer'>
                        <input type="text" className='msgInput' onChange={(e) => setInputMessage(e.target.value)} value={inputMessage} placeholder='write your message here...!' />
                        <button className='btn btn-primary sendBtn' onClick={sendmsg} ><i className="fa fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatContainer
