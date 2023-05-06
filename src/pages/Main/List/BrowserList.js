import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectList, selectStore} from '../../../Atom';
import Check from './Check/Check';
import BrowserChat from './Chat/BrowserChat';
import './BrowserList.css'

const BrowserList = ()=>{
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [store, setStore] = useRecoilState(selectStore);
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // const headers = {
  //   'ACCESS-TOKEN': `${JSON.parse(localStorage.getstore('jwt'))}`,
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // };

  // useEffect( () =>{
  //   fetchstores('passion');
  // },[]);

  // const fetchstores = async (user_id) => {
  //   try {
  //       setError(null);
  //       setLoading(true); //로딩이 시작됨
  //       const response = await axios.get(`${baseUrl}/api/users/${user_id}`, { headers });
  //       setTest(response.data.user_id)
  //       console.log(response)
  //   } catch (e) {
  //       setError(e);
  //   }
  //   setLoading(false);
  // };


  const clickCate = () => {
    setChatbot(false)
  };

  const clickChatbot = () => {
    setChatbot(true)
  };

  return(
    <div className="browser-list">
      <div className="browser-select-content">
        <div className={`browser-select-word ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}>추천 결과 보기</div>
        <div className={`browser-select-word ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}>챗봇에게 물어보기</div>
        <div className={`browser-select ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}></div>
        <div className={`browser-select ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}></div>
      </div>
      {chatbot ? 
        <BrowserChat></BrowserChat>:
        <Check></Check>
      }
    
    </div>
  )
}

export default BrowserList