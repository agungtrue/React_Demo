import React, { useState, useEffect } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Expanse = (props) => {
    const { data: currentData, handleUpdateData } = props

    const [dataObj, setDataObj] = useState({
        user_name: '',
        email: '',
        score: ''
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
                <td></td>
                <td style={{cursor:'pointer'}} >
                    <Form.Control 
                        type="text"
                        value={dataObj ? dataObj.user_name : ''}
                        placeholder="Enter Username" 
                        onChange={(e) => setDataObj({...dataObj, user_name: e.target.value})} 
                    />
                </td>
                <td>
                    <Form.Control 
                        type="text"
                        value={dataObj ? dataObj.score : ''}
                        placeholder="Enter Score" 
                        onChange={(e) => setDataObj({...dataObj, score: e.target.value})} 
                    />
                </td>
                <td>
                    <div style={{cursor:'pointer', display: 'flex', justifyContent: 'space-evenly'}}>
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