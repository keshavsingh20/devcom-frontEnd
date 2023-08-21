import React, { useEffect, useState } from 'react'
import ProfileLeftbar from '../../components/profileLeftContainer/ProfileLeftbar'
import ProfileRightbar from '../../components/profileRightContainer/ProfileRightbar'
import Suggestion from '../../components/connectionSugestion/Suggestion'
import Navbar from '../../components/navbar/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import '../profile/Profile.css'

function ConnectionSuggestions() {
    const userDetails = useSelector((state) => state.user);
    let user = userDetails.user
    let idForSuggest = user.other._id;
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUser = async () => {
          try {
            const res = await axios.get(`/api/user/all/user/${idForSuggest}`);
            setUsers(res.data);
          } catch (error) {
            console.log(error);
            console.log("Some Error Occured...!");
          }
        };
        getUser();
      }, []);

    return (
        <>
            <div>
                <Navbar />
                <div className="profileContainer" style={{marginBottom: '10px'}}>
                    <div className="left">
                        <ProfileLeftbar />
                    </div>
                    <div className="center" style={{backgroundColor: 'white'}}>
                        <div className="" >
                            <div className="imp-heading">
                                <p className="title">Suggested For You</p>
                            </div>
                            <hr className="divider" />
                            {users.map((item) => (
                                <Suggestion userdetails={item} key={item._id} />
                            ))}
                        </div>
                    </div>
                    <div className="right">
                        <ProfileRightbar />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnectionSuggestions
