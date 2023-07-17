import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectCate} from '../../../Atom';
import Check from './Check/Check';
import Chat from './Chat/Chat';
import './MobileList.css'

const MobileList = ()=>{
  const [chatbot, setChatbot] = useState(false);
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러


  const clickCate = () => {
    setChatbot(false)
  };

  const clickChatbot = () => {
    setChatbot(true)
  };

  return(
    <div className="mobile-list">
      <div className="mobile-select-content">
        <div className={`mobile-select-word ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}>카테고리로 찾아보기</div>
        <div className={`mobile-select-word ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}>챗봇에게 물어보기</div>
        <div className={`mobile-select ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}></div>
        <div className={`mobile-select ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}></div>
      </div>
      {chatbot ? 
        <Chat></Chat>:
        <Check></Check>
      }
    
    </div>
  )
}

export default MobileList