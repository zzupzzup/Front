import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectList, selectStore} from '../../../Atom';
import Check from './Check/Check';
import BrowserChat from './Chat/BrowserChat';
import SelectModal from './SelectModal/SelectModal';
import './BrowserList.css'

const BrowserList = ()=>{
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [type, setType] = useState(['한식', '일식', '술집', '양식', '분식', '카페', '숯불구이', '중식', '기타']);
  const [area, setArea] = useState(null);
  const [selectModalOn, setSelectModalOn] = useState(false);
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

  const handleAreaClick = (e) => {
    if (area !== e) {
      setArea(e);
      return;
    }
    setArea(null);
  }

  //각 음식 카테고리 버튼 눌렀을 때
  const handleTypeClick = (e) => {
    checkedItemHandler(e);
  };

  const checkedItemHandler = (category) => {
    if (!type.includes(category)){
      setType([...type, category]);
    } else {
      setType(type.filter(each => each !== category));
    }
    return type;
  };

  return(
    <div className="browser-list">
      <SelectModal
        isOpen={selectModalOn}
        onRequestClose={() => setSelectModalOn(false)}
        area={area}
        type={type}
        handleAreaClick={handleAreaClick}
        handleTypeClick={handleTypeClick}
      />
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
      <div className="modal" onClick={() => setSelectModalOn(true)}>
        {area ?
          <div>지역: {area}</div>:
          <div>모든 지역을 보여드릴게요!</div>
        }
        {type.length > 0 ?
          <div>음식: {type.map((t) => (<span> {t}</span>))}</div>:
          <div>음식 카테고리를 선택해주세요!</div>
        }
      </div>
    </div>
  )
}

export default BrowserList