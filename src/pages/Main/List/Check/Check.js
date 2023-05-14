import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import CheckStore from '../Store/CheckStore';
import './Check.css'

const Check = ()=>{
  const [storeList, setStoreList] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("jwt"))),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect( () =>{
    fetchstores();
  },[]);

  const fetchstores = async () => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/personalModel`, { headers });
        setStoreList(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return(
    <div className="check">
      <div className="browser-store-check-list">
        {storeList && storeList.map(store => {
          return <CheckStore store={store} isScrappedStore={store.userScrap}></CheckStore>
        })}   
      </div> 
    </div>
  )
}

export default Check