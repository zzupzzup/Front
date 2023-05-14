import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectList, selectStore, selectArea} from '../../../Atom';
import Check from './Check/Check';
import BrowserChat from './Chat/BrowserChat';
import SelectModal from './SelectModal/SelectModal';
import redArea from '../../../assets/red_area.png'
import grayType from '../../../assets/gray_type.png'
import emptyType from '../../../assets/empty_type.png'
import './BrowserList.css'

const BrowserList = ()=>{
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [type, setType] = useState(['한식', '일식', '술집', '양식', '분식', '카페', '숯불구이', '중식', '기타']);
  const [area, setArea] = useState(null);
  const [allCheck, setAllCheck] = useState(true);
  const [selectModalOn, setSelectModalOn] = useState(false);
  const [store, setStore] = useRecoilState(selectStore);
  const [selArea, setSelArea] = useRecoilState(selectArea);
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const storeListRef = useRef(null);
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

  const onRequestClose = () => {
    setSelectModalOn(false)
    setSelArea(area)
  }

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
      if (type.length === 8) {
        setAllCheck(true)
      }
    } else {
      setType(type.filter(each => each !== category));
      setAllCheck(false)
    }
    return type;
  };

  //음식 카테고리 모두 선택
  const handleTypeAll = () => {
    if (!allCheck){
      setType(['한식', '일식', '술집', '양식', '분식', '카페', '숯불구이', '중식', '기타']);
      setAllCheck(true)
    }else{
      setType([]);
      setAllCheck(false)
    }
  }



  return(
    <div className="browser-list">
      <SelectModal
        isOpen={selectModalOn}
        onRequestClose={onRequestClose}
        area={area}
        type={type}
        allCheck={allCheck}
        handleAreaClick={handleAreaClick}
        handleTypeClick={handleTypeClick}
        handleTypeAll={handleTypeAll}
      />
      <div className="browser-select-content">
        <div className={`browser-select-word ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}>추천 결과 보기</div>
        <div className={`browser-select-word ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}>챗봇에게 물어보기</div>
        <div className={`browser-select ${(chatbot ? 'cate' : 'chatbot')}`} onClick={clickCate}></div>
        <div className={`browser-select ${(chatbot ? 'chatbot' : 'cate')}`} onClick={clickChatbot}></div>
      </div>
      <div className="modal" onClick={() => setSelectModalOn(true)}>
        {area ?
          <div className="modal-content">
            <img src={redArea} className="modal-area-img"/>
            <span> {area}</span>
          </div>
          :
          <div className="modal-content">
            <img src={redArea} className="modal-area-img"/>
            <span> 모든 지역을 보여드릴게요!</span>
          </div>
        }
        {type.length > 0 ?
          <div className="modal-content">
            <img src={grayType} className="modal-type-img"/>
            <span> {type.map((t) => (<span> {t}</span>))}</span>
          </div>
          :
          <div className="modal-content">
            <img src={grayType} className="modal-type-img"/>
            <div> 음식 카테고리를 선택해주세요!</div>
          </div>
        }
      </div>
      {chatbot ? 
        <BrowserChat></BrowserChat>:
        <Check></Check>
      }
    </div>
  )
}

export default BrowserList