import React from "react";
import { useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import axios from 'axios';
import './BrowserDetail.css'

const BrowserDetail = ()=>{
  const params = useParams();
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  // const headers = {
  //   'ACCESS-TOKEN': `${JSON.parse(localStorage.getstore('jwt'))}`,
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // };

  // useEffect( () =>{
  //   fetchstores('passion');
  // },[]);

  // const fetchstores = async (user_id) => {
  //   try {
  //       setError(null);
  //       setLoading(true); //로딩이 시작됨
  //       const response = await axios.get(`${baseUrl}/api/users/${user_id}`, { headers });
  //       setTest(response.data.user_id)
  //       console.log(response)
  //   } catch (e) {
  //       setError(e);
  //   }
  //   setLoading(false);
  // };

  console.log(params)

  return(
    <div className="browser-detail">
      <div>{params.storeIdx}번 식당의 디테일 페이지</div>
    </div>
  )
}

export default BrowserDetail