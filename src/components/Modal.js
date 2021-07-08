import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'


const ModalName = (props) => {

    const { showed, handleModal, dataList, handleNewData } = props

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        handleModal(false)
    };

    const [newData, setNewData] = useState({
        user_name: '',
        email: '',
        score: ''
    })

    const [errorForm, setErrorForm] = useState({
        user_name: { text: '', show: false },
        email: { text: '', show: false },
        score: { text: '', show: false }
    })


    const createNewData = (data) => {
        let newUserInput = data
        newUserInput.user_id = generateId(8)

        const d = new Date()
        const year = d.getFullYear()
        const date = d.getDate() 
        const month = d.getMonth() 

         let dateTemp = `${year}-${month+1}-${date}T23:59:22+00:00`
        newUserInput.registered = dateTemp

        // merge
        let currentData = [...dataList]
        const addingData = [...currentData, {...newUserInput}]

        // pass to parent
        handleNewData(addingData)

         // reset form
         let reset = {
            user_name: { text: '', show: false },
            email: { text: '', show: false },
            score: { text: '', show: false }
        }
        setErrorForm(reset)

        let defaultInput = {
            user_name: '',
            email: '',
            score: ''
        }
        setNewData(defaultInput)
        handleClose()
    }

    const validateForm = () => {
        let valid = true
        let err = {}
        
        if(!newData.user_name || !newData.email || !newData.score) {
            valid = false

            if (!newData.user_name) err = {...err, user_name: { text: 'Username is mandatory', show: true}}
            if (!newData.email) err = {...err, email: { text: 'Email is mandatory', show: true}}
            if (!newData.score) err = {...err, score: { text: 'Score is mandatory', show: true}}

            console.log('err', err)
            setErrorForm(err)
        }

        if(newData.email) {
            let emailCheck = validateEmail(newData.email)
            if(!emailCheck) {
                err = {...err, email: { text: 'Email is not valid', show: true}}
                valid = false
                setErrorForm(err)
            }
        }

        if(newData.score) {
            let scoreCheck = validateScore(newData.score)
            if(!scoreCheck) {
                err = {...err, score: { text: 'Score must be between 0 and 100', show: true}}
                valid = false
                setErrorForm(err)
            }
        }

        // reset err
        if(valid) {
            let reset = {
              user_name: { text: '', show: false },
              email: { text: '', show: false },
              score: { text: '', show: false }
            }
            setErrorForm(reset)
        }

        return valid
    }

    const validateEmail = (email) => {
        let valid = false
        if(email.includes('@')) valid = true

        return valid
    }

    const validateScore = (score) => {
        let valid = false
        const limit = 100
        if(score.length <= 3 && Number(score) <= limit) valid = true

        return valid
    }

    const generateId = (length) => {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }


    useEffect(() => {
        setShow(showed)
    }, [showed])

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Username" 
                        onChange={(e) => setNewData({...newData, user_name: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.user_name && errorForm.user_name.show ? errorForm.user_name.text : ''} </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter Email"
                        onChange={(e) => setNewData({...newData, email: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.email && errorForm.email.show ? errorForm.email.text : ''} </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Score</Form.Label>
                    <Form.Control 
                        type="number" 
                        placeholder="Enter Score"
                        onChange={(e) => setNewData({...newData, score: e.target.value})} 
                    />
                    <div style={{color: 'red'}}> {errorForm.score && errorForm.score.show ? errorForm.score.text : ''} </div>
                </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => validateForm() && createNewData(newData) }>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalName