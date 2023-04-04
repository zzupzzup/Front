import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectCate} from '../../../Atom';
import Check from './Check';
import './BrowserList.css'

const BrowserList = ()=>{
  const [checkedItems, setcheckedItems] = useState([]);
  const [chatbot, setChatbot] = useState(false);
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect( () =>{
    fetchItems('passion');
  },[]);

  const fetchItems = async (user_id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/api/users/${user_id}`);
        setTest(response.data.user_id)
        console.log(response)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  const clickCate = () => {
    setChatbot(false)
  };

  const clickChatbot = () => {
    setChatbot(true)
  };

  return(
    <div className="browser-list">
      <div className="browser-select-content">
        <div className={`browser-select-word ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}>카테고리로 찾아보기</div>
        <div className={`browser-select-word ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}>챗봇에게 물어보기</div>
        <div className={`browser-select ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}></div>
        <div className={`browser-select ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}></div>
      </div>
      {chatbot ? 
        <div>여긴 챗봇이야</div>:
        <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
      }
      
      
    </div>
  )
}

export default BrowserList