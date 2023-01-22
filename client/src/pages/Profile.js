import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../helpers/AuthContext"

const Profile = () => {

    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)
        })
        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfPosts(response.data)
        })

    })

    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>{username}</h1>
                {authState.username === username && (
                    <button onClick={() => { navigate('/changepassword') }}>Change My Password</button>)}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                        <div className='post' >
                            <div key={1} className='title'>{value.title}</div>
                            <div
                                key={2}
                                className='body'
                                onClick={() => {
                                    navigate(`/post/${value.id}`)
                                }}>{value.postText}</div>
                            <div key={3} className='footer'>{value.username}
                                <div className="buttons">

                                    <label> {value.Likes.length}</label>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Profile