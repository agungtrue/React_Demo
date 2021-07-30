import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import UserInput from './UserInput'

const Expanse = (props) => {
    const { data: currentData, handleUpdateData } = props

    const [dataObj, setDataObj] = useState({
        user_name: '',
        email: '',
        score: ''
    })

    // should be have error handling for this component it self, to set the error
    const [errorForm, setErrorForm] = useState({
        user_name: { text: '', show: false },
        email: { text: '', show: false },
        score: { text: '', show: false }
    })

    useEffect(() => {
        setDataObj((prev) => ({
            ...prev,
            ...currentData
        }))
    }, [currentData])

    return (
        <>
            <tr>
                <td style={{cursor:'pointer'}} colspan="4">
                    <UserInput
                        data={dataObj}
                        handleOnChange={setDataObj}
                        errorForm={errorForm}
                    />
                    <div style={{cursor:'pointer', display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="primary" size="md" onClick={() => handleUpdateData(dataObj)}>
                            Save
                        </Button>
                    </div>
                </td>
            </tr>
        </>
    )
}


export default Expanse