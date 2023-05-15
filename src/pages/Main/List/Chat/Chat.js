import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {resultChat} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import ChatStore from '../Store/ChatStore';
import './Chat.css'

const Chat = ()=>{
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useRecoilState(resultChat);
  const [text, setText] = useState(false);
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("jwt"))),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  
  //검색
  const onChange =(e)=>{
    setText(true)
    if(e.target.value===''){
      setText(false)
    }
    setSearchTerm(e.target.value)
    e.preventDefault() 
  }
  
  const onClick = (e) => {
    SearchPost(searchTerm);
  }

  const SearchPost = async (key) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/chatRRS?query=${key}`, { headers });
        setSearchResult(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return(
    <div className="chat">
      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        <input type="text" className="search" placeholder="비 오는 날 먹을 음식 추천해줘" value={searchTerm} onChange={onChange}/>
        <img src={searchIcon} className="search-icon" alt="" onClick={onClick}/>
      </div>
      <div className="browser-store-list">
        {searchResult && searchResult.map(store => {
          return <ChatStore store={store} isScrappedStore={store.userScrap}></ChatStore>
        })}   
      </div>   
    </div>
  )
}

export default Chat