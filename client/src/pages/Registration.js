import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(),
        password: Yup.string().min(4).max(20).required(),
    });
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    let navigate = useNavigate();
    const onSubmit = async (data) => {
        await axios
            .post(`http://localhost:3001/auth`, data, config)
            .then(() => {
                console.log(data);
                navigate('/')
            })
            .catch((error) => {
                console.log(error.data)
            })
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className='formContainer'>

                    <label htmlFor='username'>Username: </label>
                    <ErrorMessage name="username" component="span" />
                    <Field
                        autocomplete='off'
                        id='inputCreatePost'
                        name='username'
                        placeholder='(Ex. John123...'
                    />
                    <label htmlFor='password' >Password: </label>
                    <ErrorMessage name="password" component="span" />
                    <Field
                        type="password"
                        autocomplete='off'
                        id='inputCreatePost'
                        name='password'
                        placeholder='(Your Password ...'
                    />
                    <button type='submit'>Register</button>
                </Form>
            </Formik>
        </div>
    )
}

export default Registration