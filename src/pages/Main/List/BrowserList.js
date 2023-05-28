import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import axios from 'axios';
import {selectList, selectArea, selectType} from '../../../Atom';
import Check from './Check/Check';
import Chat from './Chat/Chat';
import SelectModal from './SelectModal/SelectModal';
import redArea from '../../../assets/red_area.png'
import grayType from '../../../assets/gray_type.png'
import logo from '../../../assets/logo.png'
import lock from '../../../assets/lock.png'
import './BrowserList.css'

const BrowserList = ()=>{
  const navigate = useNavigate();
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [type, setType] = useState(['한식', '일식', '술집', '양식', '분식', '카페', '숯불구이', '중식', '기타']);
  const [area, setArea] = useState(null);
  const [allCheck, setAllCheck] = useState(true);
  const [selectModalOn, setSelectModalOn] = useState(false);
  const [selArea, setSelArea] = useRecoilState(selectArea);
  const [selType, setSelType] = useRecoilState(selectType);
  const user = JSON.parse(localStorage.getItem("user"))

  let age
  let gender
  if (user){
    age = parseInt(user.age/10)
    if (user.gender==='man'){
      gender = '남성'
    } else{
      gender = '여성'
    }
  }


  const clickCate = () => {
    setChatbot(false)
  };

  const clickChatbot = () => {
    setChatbot(true)
  };

  const onRequestClose = () => {
    setSelectModalOn(false)
    setSelArea(area)
    setSelType(type)
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
  
  
  const onPlusClick = () => {
    navigate("/plus");
  }

  return(
    <div className="browser-list">
    {user?
      <div>
        <button className="plus-btn" onClick={onPlusClick}>{age}0대 {gender} pick!</button>
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
        <button className="filter_btn" onClick={() => setSelectModalOn(true)}>
          <img style={{width:"10px"}} src="https://w7.pngwing.com/pngs/550/928/png-transparent-computer-icons-iconfinder-symbol-apple-icon-format-filter-icon-angle-text-computer.png"></img>
           필터
        </button>

        <div className="modal">
          <div className="modal-content">
            <div><img src={redArea} className="modal-area-img"/></div>
            {selArea?
              <div> {selArea}</div>:
              <div> 모든 지역을 보여드릴게요!</div>
            }
          </div>
          <div className="modal-content">
            <div><img src={grayType} className="modal-type-img"/></div>
            {selType.length > 0 ?
              <div> {selType.map((t, index) => (<span key={index}> {t}</span>))}</div>:
              <div> 음식 카테고리를 선택해주세요!</div>
            }
          </div>
        </div>

        {chatbot ? 
          <Chat chatbot={chatbot}></Chat>:
          <Check chatbot={chatbot}></Check>
        }
      </div>:
      <div className="please-login">
        <img src={logo} className="please-img"/>
        <img src={lock} className="lock-img"/>
        <div style={{fontSize:"18px", margin:"300px 0 20px 0"}}>로그인이 필요한 서비스입니다.</div>
        <div>로그인 후 이용해주세요!</div>
      </div>
    }
    </div>
  )
}

export default BrowserList