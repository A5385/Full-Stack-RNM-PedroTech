/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
 

    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",

    }
    const configHeader = {
        headers: {
            accessToken: localStorage.getItem("accessToken"),
        },
    }

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login")
        }
    }, [])

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("You must input a Title"),
        postText: Yup.string().required("You must input a Post Text"),

    })

    const onSubmit = (data) => {

        try {
            axios
                .post('http://localhost:3001/posts', data, configHeader)
                .then((response) => {
                    navigate('/')
                })
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <div className='createPostPage'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>
                    <label htmlFor='inputCreatePost'>Title: </label>
                    <ErrorMessage name="title" component="span" />
                    <Field
                        autocomplete='off'
                        id='inputCreatePost'
                        name='title'
                        placeholder='(Ex. Title...'
                    />

                    <label htmlFor='inputCreatePost'>Post: </label>
                    <ErrorMessage name="postText" component="span" />
                    <Field
                        autocomplete='off'
                        id='inputCreatePost'
                        name='postText'
                        placeholder='(Ex. Post...'
                    />


                    <button type='submit'>Create Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost