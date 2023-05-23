import React from "react";
import { useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Header from '../Header/Header';
import DetailMap from "./DetailMap/DetailMap"
import userLogo from '../../assets/user_logo.png'
import './BrowserDetail.css'

const BrowserDetail = ()=>{
  const params = useParams();
  const [storeDetails, setStoreDetails] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    'ACCESS-TOKEN': user.Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect( () =>{
    fetchstoreDetails(Number(params.storeIdx));
  },[]);

  const fetchstoreDetails = async (id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/detail/${id}`, { headers });
        setStoreDetails(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  const setColor = (tagName) => {
    if (tagName === "또간집") {
      return 'store-detail-tag green';
    } else if (tagName === '먹을텐데') {
      return 'store-detail-tag mint';
    } else if (tagName === '먹보스 쭈엽이') {
      return 'store-detail-tag red';
    }
  };

  return(
    <div>
      <Header></Header>
      {storeDetails&&
        <div className="browser-detail" key={storeDetails.id}>
          <div><span className="store-detail-title">{storeDetails.store}</span></div>

          <div className="store-detail-second">
            <div className="store-detail-info-second">
              <div className="store-info-title">식당 사진 <span className="store-info-subtitle">#{storeDetails.category}</span></div>
              <div>
                {storeDetails.tags && storeDetails.tags.map((tag) => (
                  <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
                ))} 
              </div>
              <img src={storeDetails.img_url} className="store-detail-img"></img>
            </div>
            <div className="store-detail-info-second">
              <div className="store-info-title">식당 위치 <span className="store-info-subtitle">{storeDetails.address}</span></div>
              <DetailMap storeAddress={storeDetails.address}></DetailMap>
            </div>
            
          </div>

          <div className="store-detail-third">
            <div className="store-detail-info">
              <div className="store-info-title">리뷰 <span style={{fontSize:"12px"}}>{storeDetails.point}({storeDetails.reviewtext.length})</span></div>
              <div className="store-info-review">
                {storeDetails.reviewtext && storeDetails.reviewtext.map((r, i) => (
                  <div className="" key={i} >
                    <div style={{display:"flex"}}>
                      <img src={userLogo} className="store-detail-user-img"></img><div style={{paddingTop:"15px"}}> 익명{i+1}</div>
                    </div>
                    <div style={{padding:"0 10px", fontWeight:"100"}}>{r}</div>
                    <hr></hr>
                  </div>
                ))}
              </div>
            </div>
            <div className="store-detail-info">
              <div className="store-info-title">비슷한 추천 식당</div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default BrowserDetail