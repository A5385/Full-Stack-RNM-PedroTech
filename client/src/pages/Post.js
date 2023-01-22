import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from "../helpers/AuthContext"


const Post = () => {
    let { id } = useParams();
    const [postObject, setPostObject] = useState({});
    const [commentsArray, setCommentsArray] = useState([]);
    const [newComment, setNewComment] = useState('');
    const { authState } = useContext(AuthContext)
    let navigate = useNavigate();
    const configHeader = { headers: { accessToken: localStorage.getItem("accessToken") } }

    useEffect(() => {
        axios
            .get(`http://localhost:3001/posts/byId/${id}`)
            .then((response) => {
                setPostObject(response.data)
            })
        axios
            .get(`http://localhost:3001/comments/${id}`)
            .then((response) => {
                setCommentsArray(response.data)
            })
    }, []);

    const addComment = () => {
        const data =
        {
            commentBody: newComment,
            PostId: id
        }

        axios
            .post("http://localhost:3001/comments", data, configHeader)
            .then((response) => {
                if (response.data.error) {
                    console.log(response.data.error)
                } else {
                    const commentsToAdd = {
                        commentBody: newComment,
                        username: response.data.username
                    };
                    setCommentsArray([...commentsArray, commentsToAdd]);
                    setNewComment('');
                }
            })
    }


    const deleteComment = (id) => {
        axios
            .delete(`http://localhost:3001/comments/${id}`, configHeader)
            .then(() => {
                setCommentsArray(commentsArray.filter((val) => {
                    return val.id !== id;
                }))
            })
    }
    const deletePost = (id) => {
        axios.delete(`http://localhost:3001/posts/${id}`, configHeader)
            .then(() => {
                navigate("/");
            })
    }
    const editPost = (option) => {
        if (option === "title") {
            let newTitle = prompt("Enter New Title: ");
            axios
                .put(`http://localhost:3001/posts/title`, {
                    newTitle: newTitle, id: id
                }, configHeader)
            setPostObject({ ...postObject, title: newTitle })
        } else {
            let newPostText = prompt("Enter New Text: ");
            axios
                .put(`http://localhost:3001/posts/postText`, {
                    newText: newPostText, id: id
                }, configHeader)
            setPostObject({ ...postObject, postText: newPostText })
        }
    }

    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className="post" id='individual'>
                    <div className='title' onClick={() => {
                        if (authState.username === postObject.username) {
                            editPost("title")
                        }
                    }}>{postObject.title}</div>
                    <div className='body' onClick={() => {
                        if (authState.username === postObject.username) {
                            editPost("body")
                        }
                    }}>{postObject.postText}</div>
                    <div className='footer'>{postObject.username}
                        {authState.username === postObject.username && (
                            <button
                                onClick={() => {
                                    deletePost(postObject.id);
                                }}
                            >

                                Delete Post
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input
                        type="text"
                        placeholder='Comment...'
                        autoComplete='off'
                        value={newComment}
                        onChange={(event) => { setNewComment(event.target.value) }} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {commentsArray.map((comment, key) => {
                        return <div key={key}
                            className='comment'>{comment.commentBody}
                            <label>Username:{comment.username} </label>
                            {authState.username === comment.username &&
                                <button onClick={() => {
                                    deleteComment(comment.id)
                                }}>X</button>}
                        </div>

                    })}
                </div>
            </div>
        </div>
    )
}

export default Post