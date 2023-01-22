import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const configHeader = { headers: { accessToken: localStorage.getItem("accessToken") } }
    const navigate = useNavigate();
    const changePassword = () => {
        axios
            .put('http://localhost:3001/auth/changePassword',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword
                }, configHeader)
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error)
                } else {
                    navigate('/')
                }
            })
    }

    return (
        <div>
            <h2> Change Your Password</h2>
            <input type="text"
                placeholder='Old Passowrd ...'
                onChange={(event) => {
                    setOldPassword(event.target.value)
                }} />
            <input
                type="text"
                placeholder='New Passowrd ...'
                onChange={(event) => {
                    setNewPassword(event.target.value)
                }}
            />
            <button onClick={changePassword}>Save New Password</button>
        </div>
    )
}

export default ChangePassword