import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectCate} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import './Chat.css'

const Chat = ()=>{
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [text, setText] = useState(false);
  
  //검색
  function back() {
    setText(false)
    setSearchTerm("")
  }

  const onChange =(e)=>{
    setText(true)
    if(e.target.value===''){
      setText(false)
    }
    e.preventDefault() 
    // SearchPost(params.boardId, e.target.value );
  }

  // const SearchPost = async (boardIdx, key) => {
  //   try {
  //       setError(null);
  //       setLoading(true); //로딩이 시작됨
  //       const response = await axios.get(`${baseUrl}/api/post/boardPostList/${boardIdx}?key=${key}`, { headers });
  //       setSearchResult(response.data.result)
  //       console.log(response.data);
  //   } catch (e) {
  //       setError(e);
  //   }
  //   setLoading(false);
  // };

  return(
    <div className="chat">
      <div className={`search-bar ${(text ? 'success' : 'fail')}`}>
        <input type="text" className="search" placeholder="생맥주와 마른 안주가 맛있는 곳" onChange={onChange}/>
        <img src={searchIcon} className="search-icon" alt="" />
      </div>
    </div>
  )
}

export default Chat