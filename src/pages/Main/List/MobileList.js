import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectCate} from '../../../Atom';
import Check from './Check/Check';
import './MobileList.css'

const MobileList = ()=>{
  const [checkedItems, setcheckedItems] = useState([]);
  const [items,setItems] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect( () =>{
    fetchItems();
  },[]);

  const fetchItems = async () => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/api/users/passionMan`);
        console.log(response)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return(
    <div className="mobile-list">
      <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
    </div>
  )
}

export default MobileList