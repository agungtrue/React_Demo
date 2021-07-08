import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import ModalName from './Modal'



const Tables = (props) => {
    const { dataSource } = props
    const [showBtn, setShowBtn] = useState({
        data: {}
    })
    const [dataList, setDataList] = useState([])
    const [showModal, setShowModal] = useState(false)

    const deleteData = (dataParams) => {
        const currentData = [...dataList]
        const afterFemoveData = currentData.filter(data => data.user_id !== dataParams.user_id)

        //set new data after remove
        setDataList(afterFemoveData)
    }

    useEffect(() => {

        // waiting request for api and set to dataList
        setDataList(dataSource)

    }, [dataSource]) //watching data changes


    const openModalCreate = () => {
        console.log('openModalCreate')
        setShowModal(true)
    }

    const handleModal = (value) => {
        setShowModal(value)
    }

    const handleNewData = (data) => {
        // replace for new one
        setDataList(data)
    }

    return (
        <>
            <Button 
                variant="primary" 
                size="lg" 
                onClick={openModalCreate}
                style={{marginBottom: '1rem'}}> Create
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>User Name</th>
                        <th>Score</th>
                        <th>Registered</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataList.length ? dataList.map((data, index) => 
                            (
                                <tr 
                                    // onMouseOver={() => console.log(data.user_name)}
                                    onMouseEnter={() => setShowBtn({...showBtn, data})}
                                    onMouseLeave={() => setShowBtn({...showBtn, data: {}})}
                                >
                                    <td>{index+1}</td>
                                    <td>{data.user_name}</td>
                                    <td>{data.score}</td>
                                    <td style={{display: 'flex', justifyContent: 'space-between', cursor: 'pointer'}}>
                                        {data.registered}
                                        { showBtn.data && showBtn.data.user_id === data.user_id && <span onClick={() => deleteData(data)}>Delete</span> }
                                    </td>
                                </tr>
                            )
                        ) : 'Please wait....'
                    }
                </tbody>
            </Table>



            {/* Modal */}
            <ModalName
                showed={showModal}
                handleModal={handleModal}
                handleNewData={handleNewData}
                dataList={dataList}
            />
      </>
    )
}

export default Tables