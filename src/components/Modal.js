import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { updateData } from '../API/Request'
import UserInput from './UserInput'


const ModalName = (props) => {

    const { showed, handleModal, dataList, handleNewData, dataSelected, actionType } = props

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        handleModal(false)
        resetDataModal()
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

    const handleUpdateData = (data) => {
        updateData(data, dataList)
            .then(res => {
                // pass to parent
                handleNewData(res)

                resetDataModal()
                handleClose()
            })
            .catch(err => console.log('err', err))
    }

    const createNewData = (data) => {
        let newUserInput = data
        newUserInput.user_id = generateId(8)

        const d = new Date()
        const year = d.getFullYear()
        const date = d.getDate() 
        const month = d.getMonth().length > 1 ? d.getMonth() + 1 : `0${d.getMonth()+1}`

         let dateTemp = `${year}-${month}-${date}T23:59:22+00:00`
        newUserInput.registered = dateTemp

        // merge
        let currentData = [...dataList]
        const addingData = [...currentData, {...newUserInput}]

        // pass to parent
        handleNewData(addingData)

        resetDataModal()
        handleClose()
    }

    const resetDataModal = () => {
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

        // reset err, only for this function scope
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

        // googling
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) valid = true

        return valid
    }

    const validateScore = (score) => {
        let valid = false
        const limit = 100
        const checkLength = String(score)

        if(checkLength.length <= 3 && Number(score) <= limit) valid = true

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
        setNewData(dataSelected)
    }, [showed, dataSelected])

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{actionType === 'create' ? 'Create' : 'Update'} Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserInput
                    data={newData}
                    handleOnChange={setNewData}
                    errorForm={errorForm}
                />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
             {
                actionType === 'create' ?
                <Button variant="primary" onClick={() => validateForm() && createNewData(newData) }>
                    Add
                </Button> :
                 <Button variant="primary" onClick={() => validateForm() && handleUpdateData(newData) }>
                    Update
                </Button>
             }
            </Modal.Footer>
          </Modal>
        </>
      );
}

export default ModalName