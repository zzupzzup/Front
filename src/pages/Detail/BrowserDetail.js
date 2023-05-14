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
    {id: 1, title: "우리콩순두부", img:"https://mp-seoul-image-production-s3.mangoplate.com/154630/ef_dsdldqlqmuf.jpg?fit=around|512:512&crop=512:512;*,*&output-format=jpg&output-quality=80", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_id: 1, tag_name:"또간집"}, {tag_id: 2, tag_name:"먹을텐데"}], userScrap:true, reviews: [{reviewId: 1, reviewContent:"우왕"}, {reviewId: 2, reviewContent:"또올게요"}, {reviewId: 2, reviewContent:"아주좋아"}, {reviewId: 2, reviewContent:"담엔 딴데 가야지"}]},
  ];

  const setColor = (tagName) => {
    if (tagName === "또간집") {
      return 'store-detail-tag green';
    } else if (tagName === '먹을텐데') {
      return 'store-detail-tag mint';
    } else if (tagName === '먹보스 쭈엽이') {
      return 'store-detail-tag red';
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
          <div><span className="store-detail-title">{storeDetail.title}</span></div>

          <div className="store-detail-second">
            <img src={storeDetail.img} className="store-detail-img"></img>
            <DetailMap storeAddress={storeDetail.address}></DetailMap>
          </div>

          <div className="store-detail-third">
            <div className="store-detail-info">
              <div className="store-info-title">식당 정보</div>
              <div>
                {storeDetail.tags && storeDetail.tags.map((tag) => (
                  <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
                ))} 
              </div>
              <div>{storeDetail.address}</div>
            </div>
            <div className="store-detail-info">
              <div className="store-info-title">리뷰 <span style={{fontSize:"12px"}}>{storeDetail.point}({storeDetail.review})</span></div>
              {storeDetail.reviews && storeDetail.reviews.map((r) => (
                <div className="" key={r.reviewId} >{r.reviewContent}</div>
              ))}
            </div>
          </div>
        </div>
      ))
      }
    </div>
  )
}

export default BrowserDetail