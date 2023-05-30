import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from 'axios';
import {useRecoilState} from 'recoil';
import {selectStore} from '../../../../Atom';	
import './CheckStore.css'

const CheckStore = (props)=>{
  const navigate = useNavigate();
  const { store } = props;
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
    poststoreClick(store.id, user.id)
    navigate(`/detail/${store.id}`)
  }

  //클릭로그
  const poststoreClick = async (id, userId) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/click_log/${id}?user_id=${userId}`,{ headers })
        user.click_log_cnt = response.data.click_log_cnt;
        localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return(
    <div className={setClick(checkedStore)} key={store.id} onClick={clickStore}>
      <div className="store-first">
        <div>
          <span className="store-title" onClick={clickStoreTitle}>{store.store}</span>
        </div>
      </div>
      <div className="store-type">{store.category}</div>
      <div className="store-address">{store.address}</div>
    </div>
  )
}

export default CheckStore