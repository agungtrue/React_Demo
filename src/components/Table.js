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
    const [dataSelected, setDataSelected] = useState({})
    const [actionType, setActionType] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [sortedBy, setSortedBy] = useState({
        user_name: '',
        email: '',
        score: ''
    })

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


    const openModalCreate = (type, data = {}) => {

        //set action type
        setActionType(type)

        if(type === 'create') {
            setShowModal(true)
        }
        else if (type === 'update') {
            setShowModal(true)
            setDataSelected(data)
        }
        else console.log('invalid type')
    }

    const handleModal = (value) => {
        setShowModal(value)
        setDataSelected({})
    }

    const handleNewData = (data) => {
        // replace for new one
        setDataList(data)
    }

    const sorting = (key) => {

        if(sortedBy[key] === 'asc') {

            // can use reverse method
            // const data = [...dataList].reverse()
            const data = [...dataList]

            let result = []
            for (let i = data.length - 1; i >= 0; i--) {
                result.push(data[i])
            }
            setSortedBy({...sortedBy, [key]: 'desc'})
            setDataList(result)
        }
        else {
            const data = [...dataList].sort((a, b) => (a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
            setSortedBy({...sortedBy, [key]: 'asc'})
            setDataList(data)
        }
    }

    return (
        <>
            <Button 
                variant="primary" 
                size="lg" 
                onClick={() => openModalCreate('create')}
                style={{marginBottom: '1rem'}}> Create
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>No</th>
                        <th style={{cursor:'pointer'}} onClick={() => sorting('user_name')}>User Name ({sortedBy.user_name})</th>
                        <th style={{cursor:'pointer'}} onClick={() => sorting('score')}>Score ({sortedBy.score})</th>
                        <th style={{cursor:'pointer'}} onClick={() => sorting('registered')}>Registered ({sortedBy.registered})</th>
                    </tr>
                </thead>
                <tbody>
                    {
                            dataList && dataList.length ? dataList.map((data, index) => 
                            (
                                <tr
                                    key={data.user_id}
                                    onMouseEnter={() => setShowBtn({...showBtn, data})}
                                    onMouseLeave={() => setShowBtn({...showBtn, data: {}})}
                                >
                                    <td>{index+1}</td>
                                    <td style={{cursor:'pointer'}} onClick={() => openModalCreate('update', data)}>{data.user_name}</td>
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
                dataSelected={dataSelected}
                actionType={actionType}
            />
      </>
    )
}

export default Tables