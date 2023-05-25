import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {resultChat, firstChat, selectStore} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import ChatStore from '../Store/ChatStore';
import './Chat.css'

const Chat = (props)=>{
  const {chatbot, area, type} = props;
  const storeListRef = useRef(null);
  const [originalChat, setOriginalChat] = useRecoilState(firstChat);
  const [searchResult, setSearchResult] = useRecoilState(resultChat);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [text, setText] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    'ACCESS-TOKEN': user.Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    setcheckedStore(null)
    storeListRef.current = null;
  }, [])
  
  //검색
  const onChange =(e)=>{
    setText(true)
    if(e.target.value===''){
      setText(false)
    }
    setSearchTerm(e.target.value)
    e.preventDefault() 
  }
  
  const onClick = () => {
    SearchPost(searchTerm);
  }

  const SearchPost = async (key) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/chatRRS?query=${key}`, { headers });
        setSearchResult(response.data)
        setOriginalChat(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //필터링
  useEffect(() => {
    if (searchResult){
      setSearchResult(originalChat);
      if (area === null){
        setSearchResult(originalChat);
      }else{
        if (area === '마포구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("마포구"))]);
        }else if (area === '광진구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("광진구"))]);
        }else if (area === '성동구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("성동구"))]);
        }else if (area === '서초구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("서초구"))]);
        }else if (area === '강남구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("강남구"))]);
        }
      }
      if (searchResult){
        setSearchResult(state => [...state.filter(store => type.includes(store.category))]);
      }
    }
  }, [originalChat, chatbot, area, type]);

  useEffect(() => {
    if (storeListRef.current && checkedStore) {
      const index = searchResult.findIndex(store => store.id === checkedStore);
      storeListRef.current.scrollTo({
        top: index * 106,
        behavior: 'smooth'
      });
    }
  }, [checkedStore, searchResult]);

  return(
    <div className="chat">
      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        <input type="text" className="search" placeholder={searchTerm} value={searchTerm} onChange={onChange}/>
        <img src={searchIcon} className="search-icon" alt="" onClick={onClick}/>
      </div>
      <div className="browser-store-list">
        {loading?
        <div>로딩중</div>:
        searchResult && searchResult.map(store => {
          return <ChatStore store={store}></ChatStore>
        })}   
      </div>   
    </div>
  )
}

export default Chat