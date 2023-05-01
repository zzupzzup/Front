import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectCate} from '../../../../Atom';
import searchIcon from '../../../../assets/search_icon.webp'
import Store from '../Store/Store';
import './MobileChat.css'

const MobileChat = ()=>{
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [text, setText] = useState(false);

  //식당 더미데이터
  const stores = [
    {id: 1, title: "우리콩순두부", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}], userScrap:true},
    {id: 2, title: "시래기화덕 생선구이", result: '76%', point:4.3, view: 2676, review: 5, star:17, address:"서울시 강북구 수유동 583-8", type:"탕/찌개/전골", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}, {tag_id: 3,tag_name:"쭈"}],userScrap:false},
    {id: 3, title: "버거파크", result: '70%', point:4.3, view: 2796, review: 6, star:50, address:"서울시 강북구 수유동 47-1", type:"브런치/버거/샌드위치", tags:null,userScrap:true},
    {id: 4, title: "하이그라운드제빵소", result: '60%', point:4.2, view: 1229, review: 4, star:25, address:"서울시 강북구 우이동 239-7", type:"베이커리", tags:[{tag_id: 1, tag_name:"또"}], userScrap:true},
    {id: 5, title: "벼랑순대국", result: '57%', point:4.2, view: 11039, review: 12, star:311, address:"서울시 강북구 번동 428-90", type:"탕/찌개/전골", tags:[{tag_id: 3,tag_name:"쭈"}],userScrap:false},
    {id: 6, title: "마리웨일마카롱", result: '52%', point:null, view: 3368, review: 4, star:38, address:"서울시 강북구 수유동 192-71", type:"고기 요리", tags:null,userScrap:true},
  ];
  
  //검색
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
        <input type="text" className="search" placeholder="비 오는 날 먹을 음식 추천해줘" onChange={onChange}/>
        <img src={searchIcon} className="search-icon" alt="" />
      </div>
      <div className="mobile-store-list">
        {stores.map(store => {
          return <Store store={store} isScrappedStore={store.userScrap}></Store>
        })}   
      </div>   
    </div>
  )
}

export default MobileChat