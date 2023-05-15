import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {resultChat} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import ChatStore from '../Store/ChatStore';
import './Chat.css'

const Chat = (props)=>{
  const {chatbot, area, type} = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [originalList, setOriginalList] = useState(null);
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

  //지역 필터링
  useEffect(() => {
    if (searchTerm){
      if (area === null){
        setSearchTerm(originalList);
      }else{
        if (area === '마포구'){
          setSearchTerm(originalList);
          setSearchTerm(state => [...state.filter(store => store.address.includes("마포구"))]);
        }else if (area === '광진구'){
          setSearchTerm(originalList);
          setSearchTerm(state => [...state.filter(store => store.address.includes("광진구"))]);
        }else if (area === '성동구'){
          setSearchTerm(originalList);
          setSearchTerm(state => [...state.filter(store => store.address.includes("성동구"))]);
        }else if (area === '서초구'){
          setSearchTerm(originalList);
          setSearchTerm(state => [...state.filter(store => store.address.includes("서초구"))]);
        }else if (area === '강남구'){
          setSearchTerm(originalList);
          setSearchTerm(state => [...state.filter(store => store.address.includes("강남구"))]);
        }
      }
    }
  }, [searchTerm, area]);

  //카테고리 필터링
  useEffect(() => {
    if (searchTerm){
      setSearchTerm(originalList);
      setSearchTerm(state => state.filter(store => type.includes(store.category)));
    }
  }, [searchTerm, type])

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