import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {resultCheck, firstCheck, selectStore} from '../../../../Atom';
import axios from 'axios';
import CheckStore from '../Store/CheckStore';
import './Check.css'

const Check = (props)=>{
  const {chatbot, area, type} = props;
  const storeListRef = useRef(null);
  const [originalCheck, setOriginalCheck] = useRecoilState(firstCheck);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [storeList, setStoreList] = useRecoilState(resultCheck);   //결과값
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
  }, [])

  //결과 가져오기
  useEffect( () =>{
    if (user.click_log_cnt > 10){
      fetchpresonalModel(user.id);
    }else{
      const categoryArr = user.category.split(" ");
      fetchfirstModel(categoryArr);
    }
  },[user.click_log_cnt]);

  useEffect( () =>{
    if (!originalCheck){
      if (user.click_log_cnt > 10){
        fetchpresonalModel();
      }else{
        const categoryArr = user.category.split(" ");
        fetchfirstModel(categoryArr);
      }
    }
  },[chatbot, user.click_log_cnt]);

  const fetchpresonalModel = async (id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/personalModel?user_id=${id}`, { headers });
        setStoreList(response.data)
        setOriginalCheck(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  const fetchfirstModel = async (category) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/firstModel?user_category=${category}`, { headers });
        setStoreList(response.data)
        setOriginalCheck(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //필터링
  useEffect(() => {
    if (storeList){
      setStoreList(originalCheck);
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
      if (storeList){
        setStoreList(state => [...state.filter(store => type.includes(store.category))]);
      }
    }
  }, [originalCheck, chatbot, area, type]);

  //스크롤
  useEffect(() => {
    if (storeListRef.current && checkedStore) {
      const index = storeList.findIndex(store => store.id === checkedStore);
      storeListRef.current.scrollTo({
        top: index * 87,
        behavior: 'smooth'
      });
    }
  }, [checkedStore, storeList]);

  // const index = storeList.findIndex(store => store.id === checkedStore);
  // console.log(index)
  // const storeElement = document.getElementById(`store${index}`);
  // storeElement.scrollIntoView({ behavior: 'smooth' });

  return(
    <div className="check">
      <div className="browser-store-check-list" ref={storeListRef}>
      {storeList && storeList.map(store => (
        <CheckStore key={store.id} className="storeScroll" store={store} isScrappedStore={store.userScrap} />
      ))}  
      </div> 
    </div>
  )
}

export default Check