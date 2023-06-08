import React from "react";
import { useState, useEffect, useRef} from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import axios from 'axios';
import Header from '../Header/Header';
import DetailMap from "./DetailMap/DetailMap"
import userLogo from '../../assets/user_logo.png'
import pinkHeart from '../../assets/pink_heart.png'
import emptyHeart from '../../assets/empty_heart.png'
import './BrowserDetail.css'

const BrowserDetail = ()=>{
  const params = useParams();
  const navigate = useNavigate();
  const [isScrapped, setIsScrapped] = useState(false);
  const [storeDetails, setStoreDetails] = useState(null);   //결과값
  const [storeSimilar, setStoreSimilar] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  useEffect( () =>{
    fetchstoreDetails(Number(params.storeIdx), user.id);
    fetchstoreSimilar(Number(params.storeIdx), user.id);
  },[params]);

  const fetchstoreDetails = async (storeId, id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/detail/${storeId}?user_id=${id}`, { headers });
        setStoreDetails(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  const fetchstoreSimilar = async (storeId, id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/similarRestaurant?id=${storeId}&user_id=${id}`, { headers });
        setStoreSimilar(response.data)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //스크랩
  const storeScrap = () => {
    poststoreScrap(Number(params.storeIdx), user.id);
    setIsScrapped(state => !state);
  };
  const storeUnScrap = () => {
    poststoreUnScrap(Number(params.storeIdx), user.id);
    setIsScrapped(state => !state);
  }

  const poststoreScrap = async (id, userId) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/userLike/${id}?user_id=${userId}`,{ headers })
        console.log(response)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  const poststoreUnScrap = async (id, userId) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.post(`${baseUrl}/userUnlike/${id}?user_id=${userId}`,{ headers })
        console.log(response)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //클릭했을 때
  const clickStoreTitle = (store_id) => {
    poststoreClick(store_id, user.id)
    navigate(`/detail/${store_id}`)
  }

  const poststoreClick = async (id, userId) => {
    try {
        setError(null);
        setLoading(true);
        const response = await axios.post(`${baseUrl}/click_log/${id}?user_id=${userId}`,{ headers })
        user.click_log_cnt = response.data.click_log_cnt;
        localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  return(
    <div>
      <Header></Header>
      {storeDetails&&
        <div className="browser-detail" key={storeDetails.id}>
          <div><span className="store-detail-title">{storeDetails.store}</span></div>
          <div>
            {isScrapped==1 ?
              <img src={pinkHeart} alt='' className="store-detail-like" onClick={storeUnScrap}/> :
              <img src={emptyHeart} alt='' className="store-detail-like" onClick={storeScrap}/>
            }
          </div>
          <div className="store-detail-second">
            <div className="store-detail-info-second">
              <div className="store-info-title">식당 사진 <span className="store-info-subtitle">#{storeDetails.category}</span></div>
              <img src={storeDetails.img_url} className="store-detail-img"></img>
            </div>
            <div className="store-detail-info-second">
              <div className="store-info-title">식당 위치 <span className="store-info-subtitle">{storeDetails.address}</span></div>
              <DetailMap storeAddress={storeDetails.address}></DetailMap>
            </div>
            
          </div>

          <div className="store-detail-third">
            <div className="store-detail-info">
              <div className="store-info-title">리뷰 <span className="store-info-subtitle">{storeDetails.point}({storeDetails.reviewtext.length})</span></div>
              <div className="store-info-review">
                {storeDetails.reviewtext && storeDetails.reviewtext.map((r, i) => (
                  <div className="" key={i} >
                    <div style={{display:"flex"}}>
                      <img src={userLogo} className="store-detail-user-img"></img><div style={{paddingTop:"15px"}}> 익명{i+1}</div>
                    </div>
                    <div style={{padding:"5px 10px", fontWeight:"100"}}>{r}</div>
                    <hr></hr>
                  </div>
                ))}
              </div>
            </div>
            <div className="store-detail-info">
              <div className="store-info-title">유사한 식당 추천</div>
                <div className="store-info-review">
                  {storeSimilar && storeSimilar.map((store, i) => (
                    <div className="store-similar" key={i} >
                      <div style={{display:"flex"}}>
                        <img src={store.img_url} className="store-similar-img"></img>
                        <div className="store-similar-content">
                          <div>
                            <span className="store-title" onClick={() => clickStoreTitle(store.id)}>{store.store}</span>
                          </div>
                          <div className="store-type">{store.category}</div>
                          <div className="store-address">{store.address}</div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default BrowserDetail