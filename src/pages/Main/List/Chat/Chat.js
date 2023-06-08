import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {resultChat, firstChat, selectStore, selectArea, selectType} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import noResult from '../../../../assets/noResult.png'
import ChatStore from '../Store/ChatStore';
import './Chat.css'

const Chat = (props)=>{
  const {chatbot, area, type} = props;
  const storeListRef = useRef(null);
  const [selArea, setSelArea] = useRecoilState(selectArea);
  const [selType, setSelType] = useRecoilState(selectType);
  const [originalChat, setOriginalChat] = useRecoilState(firstChat);
  const [searchResult, setSearchResult] = useRecoilState(resultChat);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [text, setText] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const [embeddings, setEmbeddings] = useState([]);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    setcheckedStore(null)
    if (storeListRef.current){
      storeListRef.current.scrollTo({
        top: 0
      });
    }
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
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
    localStorage.setItem('searchTerm', searchTerm);
    SearchPost(user.id, searchTerm);
  }

  const SearchPost = async (id, key) => {
    try {
      setError(null);
      setLoading(true); //로딩이 시작됨
      const response = await axios.post(`${baseUrl}/chatRRS??user_id=${id}&query=${key}`, { headers });
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
      if (selArea === null){
        setSearchResult(originalChat);
      }else{
        if (selArea === '마포구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("마포구"))]);
        }else if (selArea === '광진구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("광진구"))]);
        }else if (selArea === '성동구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("성동구"))]);
        }else if (selArea === '서초구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("서초구"))]);
        }else if (selArea === '강남구'){
          setSearchResult(originalChat);
          setSearchResult(state => [...state.filter(store => store.address.includes("강남구"))]);
        }
      }
      if (searchResult){
        setSearchResult(state => [...state.filter(store => selType.includes(store.category))]);
      }
    }
  }, [originalChat, chatbot, selArea, selType]);

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
      {!loading&&searchResult&&<div style={{textAlign:"left", margin: "10px 20px", fontSize:"13px"}}>검색결과 ({searchResult.length}개)</div>}
      <div className="browser-store-list">
        {loading?
          <div style={{margin: "150px"}}>로딩중</div>:
            searchResult&&!searchResult.length?
            <div>
              <img src={noResult} style={{width: "100px", margin:"30px 120px"}}></img>
              <div style={{fontSize:"18px", margin:"-10px 0 10px 95px"}}>결과를 찾지 못 했어요.</div>
              <div style={{margin:"0 60px"}}>검색어나 필터링을 다시 확인해주세요!</div>
            </div>:
            searchResult && searchResult.map((store, i) => {
              return <ChatStore key={i} store={store} isScrappedStore={store.userScrap}></ChatStore>
            })
        }   
      </div>   
    </div>
  )
}

export default Chat