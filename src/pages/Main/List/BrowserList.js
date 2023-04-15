import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectCate} from '../../../Atom';
import Check from './Check/Check';
import Chat from './Chat/Chat';
import Store from './Store/Store';
import './BrowserList.css'

const BrowserList = ()=>{
  const [chatbot, setChatbot] = useState(false);
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


  const stores = [
    {id: 1, title: "우리콩순두부", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}], userScrap:true},
    {id: 2, title: "시래기화덕 생선구이", result: '76%', point:4.3, view: 2676, review: 5, star:17, address:"서울시 강북구 수유동 583-8", type:"탕/찌개/전골", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}, {tag_id: 3,tag_name:"쭈"}],userScrap:false},
    {id: 3, title: "버거파크", result: '70%', point:4.3, view: 2796, review: 6, star:50, address:"서울시 강북구 수유동 47-1", type:"브런치/버거/샌드위치", tags:null,userScrap:true},
    {id: 1, title: "우리콩순두부", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}], userScrap:true},
    {id: 2, title: "시래기화덕 생선구이", result: '76%', point:4.3, view: 2676, review: 5, star:17, address:"서울시 강북구 수유동 583-8", type:"탕/찌개/전골", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}, {tag_id: 3,tag_name:"쭈"}],userScrap:false},
    {id: 3, title: "버거파크", result: '70%', point:4.3, view: 2796, review: 6, star:50, address:"서울시 강북구 수유동 47-1", type:"브런치/버거/샌드위치", tags:null,userScrap:true},
  ];


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
        <Chat></Chat>:
        <Check></Check>
      }
      
      <div className="browser-store-list">
        {stores.map(store => {
          return <Store store={store} isScrappedStore={store.userScrap}></Store>
        })}   
      </div>   
    </div>
  )
}

export default BrowserList