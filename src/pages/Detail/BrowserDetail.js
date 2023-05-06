import React from "react";
import { useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Header from '../Header/Header';
import DetailMap from "./DetailMap/DetailMap"
import './BrowserDetail.css'

const BrowserDetail = ()=>{
  const params = useParams();
  const [test, setTest] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const storeDetails = [
    {id: 1, title: "우리콩순두부", img:"https://mp-seoul-image-production-s3.mangoplate.com/260580/585290_1679191787585_1000009442?fit=around|738:738&crop=738:738;*,*&output-format=jpg&output-quality=80", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_id: 1, tag_name:"또"}, {tag_id: 2, tag_name:"먹"}], userScrap:true, reviews: [{reviewId: 1, reviewScore:"괜찮다", reviewContent:"우왕"}, {reviewId: 2, reviewScore:"맛있다", reviewContent:"또올게요"}, {reviewId: 2, reviewScore:"맛있다", reviewContent:"아주좋아"}, {reviewId: 2, reviewScore:"별로", reviewContent:"좋은디 담에 딴데 가야지"}]},
  ];

  const setColor = (tagName) => {
    if (tagName === "또") {
      return 'store-tag green';
    } else if (tagName === '먹') {
      return 'store-tag mint';
    } else if (tagName === '쭈') {
      return 'store-tag red';
    }
  };

  // const headers = {
  //   'ACCESS-TOKEN': `${JSON.parse(localStorage.getstoreDetail('jwt'))}`,
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // };

  // useEffect( () =>{
  //   fetchstoreDetails('passion');
  // },[]);

  // const fetchstoreDetails = async (user_id) => {
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

  return(
    <div>
      <Header></Header>
      {storeDetails&&storeDetails.map((storeDetail) => (
        <div className="browser-detail" key={storeDetail.id}>
          <div><span className="store-detail-title">{storeDetail.title}</span> {storeDetail.point}({storeDetail.review})</div>
          <div>
            {storeDetail.tags && storeDetail.tags.map((tag) => (
              <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
            ))}
          </div>
          <div className="store-detail-second">
            <img src={storeDetail.img} className="store-detail-img"></img>
            <DetailMap storeAddress={storeDetail.address}></DetailMap>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default BrowserDetail