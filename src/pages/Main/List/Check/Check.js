import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {resultCheck, firstCheck} from '../../../../Atom';
import axios from 'axios';
import CheckStore from '../Store/CheckStore';
import './Check.css'

const Check = (props)=>{
  const {chatbot, area, type} = props;
  const [originalCheck, setOriginalCheck] = useRecoilState(firstCheck);
  const [storeList, setStoreList] = useRecoilState(resultCheck);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    'ACCESS-TOKEN': String(JSON.parse(localStorage.getItem("jwt"))),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  //결과 가져오기
  useEffect( () =>{
    if (!originalCheck){
      fetchstores();
    }
  },[]);

  const fetchstores = async () => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/personalModel`, { headers });
        setStoreList(response.data)
        setOriginalCheck(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //지역 필터링
  useEffect(() => {
    if (storeList){
      if (area === null){
        setStoreList(originalCheck);
      }else{
        if (area === '마포구'){
          setStoreList(originalCheck);
          setStoreList(state => [...state.filter(store => store.address.includes("마포구"))]);
        }else if (area === '광진구'){
          setStoreList(originalCheck);
          setStoreList(state => [...state.filter(store => store.address.includes("광진구"))]);
        }else if (area === '성동구'){
          setStoreList(originalCheck);
          setStoreList(state => [...state.filter(store => store.address.includes("성동구"))]);
        }else if (area === '서초구'){
          setStoreList(originalCheck);
          setStoreList(state => [...state.filter(store => store.address.includes("서초구"))]);
        }else if (area === '강남구'){
          setStoreList(originalCheck);
          setStoreList(state => [...state.filter(store => store.address.includes("강남구"))]);
        }
      }
    }
  }, [area]);

  //카테고리 필터링
  useEffect(() => {
    setStoreList(originalCheck);
    setStoreList(state => [...state.filter(store => type.includes(store.category))]);
  }, [type])

  return(
    <div className="check">
      <div className="browser-store-check-list">
        {storeList && storeList.map(store => {
          return <CheckStore store={store} isScrappedStore={store.userScrap}></CheckStore>
        })}   
      </div> 
    </div>
  )
}

export default Check