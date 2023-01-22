/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";


const Home = () => {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);


    let navigate = useNavigate();


    const configHeader = {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        },
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else {
            axios
                .get('http://localhost:3001/posts', configHeader)
                .then((response) => {
                    setListOfPosts(response.data.listOfPosts)
                    setLikedPosts(
                        response.data.likedPosts.map((like) => {
                            return like.PostId;
                        }));
                })
        }
    }, []);

    const likeAPost = (postId) => {
        axios
            .post(`http://localhost:3001/like/`,
                { PostId: postId },
                configHeader)
            .then((response) => {

                setListOfPosts(listOfPosts.map((post) => {
                    if (post.id === postId) {
                        if (response.data.liked) {
                            return { ...post, Likes: [...post.Likes, 0] }
                        } else {
                            const likeArray = post.Likes;
                            likeArray.pop()
                            return { ...post, Likes: likeArray }
                        }
                    } else {
                        return post
                    }
                })
                )
                if (likedPosts.includes(postId)) {
                    setLikedPosts(
                        likedPosts.filter((id) => {
                            return id !== postId;
                        })
                    );
                } else {
                    setLikedPosts([...likedPosts, postId]);
                }
            })
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter((id) => {
                return id !== postId;
            }))
        } else {
            setLikedPosts([...likedPosts, postId])
        }
    };


    return (
        <div>
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
                        <div key={3} className='footer'>
                            <div className="username">
                                <Link to={`/profile/${value.UserId}`}>{value.username}</Link></div>
                            <div className="buttons">
                                <ThumbUpAltIcon
                                    onClick={() => {
                                        likeAPost(value.id);
                                    }}
                                    className={
                                        likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                                    }
                                />

                                <label> {value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                )
            })}</div>
    )
}

export default Home