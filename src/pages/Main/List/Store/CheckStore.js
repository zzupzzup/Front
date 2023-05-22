import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectStore} from '../../../../Atom';	
import pinkHeart from '../../../../assets/pink_heart.png'
import emptyHeart from '../../../../assets/empty_heart.png'
import './CheckStore.css'

const CheckStore = (props)=>{
  const navigate = useNavigate();
  const { store, isScrappedStore } = props;
  const [isScrapped, setIsScrapped] = useState(isScrappedStore);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [isReview, setIsReview] = useState(false)
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    'ACCESS-TOKEN': user.Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const setColor = (tagName) => {
    if (tagName === "또") {
      return 'store-tag green';
    } else if (tagName === '먹') {
      return 'store-tag mint';
    } else if (tagName === '쭈') {
      return 'store-tag red';
    }
  };

  //선택했을 때
  const clickStore = () => {
    setcheckedStore(store.id)
  }
  const setClick = (id) => {
    if (id === store.id){
      return 'store click'
    } else{
      return 'store'
    }
  }
  const clickStoreTitle = () => {
    poststoreClick(store.id)
    navigate(`/detail/${store.id}`)
  }

  //클릭로그
  const poststoreClick = async (id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/click_log/${id}`, { headers });
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };


  //스크랩
  const storeScrap = () => {
    // poststoreScrap(store.storeIdx);
    setIsScrapped(state => !state);
  };

  const storeUnScrap = () => {
    // poststoreUnScrap(store.storeIdx);
    setIsScrapped(state => !state);
  }

  //리뷰보기
  const watchReview = () => {
    setIsReview(state => !state);
  }

  return(
    <div className={setClick(checkedStore)} key={store.id} onClick={clickStore}>
      <div className="store-first">
        <div>
          <span className="store-title" onClick={clickStoreTitle}>{store.store}</span>
        </div>
        <div>
          {store.tags && store.tags.map((tag) => (
            <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
          ))}
        </div>
      </div>
      <div className="store-type">{store.category}</div>
      <div className="store-address">{store.address}</div>
      <div className="store-last">
        <div>
          {isScrapped ?
            <img src={pinkHeart} alt='' className="store-like" onClick={storeUnScrap}/> :
            <img src={emptyHeart} alt='' className="store-like" onClick={storeScrap}/>
          }
        </div>
      </div>
    </div>
  )
}

export default CheckStore