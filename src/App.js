import React, { useState, useEffect } from "react";
import { notification } from 'antd';
import { getData } from './API/Request'
import './App.css';
import Table from './components/Table'

function App() {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
      getApi('getData')
  }, [])

  //api methods
  const getApi = async (type) => {

      try {
          if(type === 'getData') {
            const response = await getData
            console.log('response', response.data)

            if(response && response.data) {
                setDataList(response.data)
            }
          }
          else alert('invalid request type')

      } catch (err) {
          console.log('err', err.message)

          notification.error({
              message: err.message,
              duration: 5
          });
      }
  }


  return (
    <div className="App">
      <p>Test Screening React JS Hooks</p>
      <div className="container">
        <Table
            dataSource={dataList}
         />
      </div>
    </div>
  );
}

export default App;
