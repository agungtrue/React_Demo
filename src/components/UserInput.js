import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'

const UserInput = (props) => {

    const { data: dataInput, handleOnChange, errorForm } = props

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={dataInput ? dataInput.user_name : ''}
                        placeholder="Enter Username" 
                        onChange={(e) => handleOnChange({...dataInput, user_name: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.user_name && errorForm.user_name.show ? errorForm.user_name.text : ''} </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        value={dataInput ? dataInput.email : ''}
                        placeholder="Enter Email"
                        onChange={(e) => handleOnChange({...dataInput, email: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.email && errorForm.email.show ? errorForm.email.text : ''} </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Score</Form.Label>
                    <Form.Control 
                        type="number"
                        value={dataInput ? dataInput.score : ''}
                        placeholder="Enter Score"
                        onChange={(e) => handleOnChange({...dataInput, score: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.score && errorForm.score.show ? errorForm.score.text : ''} </div>
                </Form.Group>
            </Form>
        </>
    )

}

export default UserInput