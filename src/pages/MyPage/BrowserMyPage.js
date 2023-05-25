import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { authService } from "../../firebase";
import {useRecoilState} from 'recoil';
import {selectArea} from '../../Atom';
import axios from 'axios';
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import './BrowserMyPage.css';

const BrowserMyPage = ()=>{
	const navigate = useNavigate();
	const [areas, setAreas] = useState(null);
  const [clickList, setClickList] = useState(null);   //결과값
  const [loading,setLoading] = useState(false); // 로딩되는지 여부
  const [error,setError] = useState(null); //에러
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const user = JSON.parse(localStorage.getItem("user"))

  const headers = {
    'ACCESS-TOKEN': user.Authorization,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  // 로그아웃
  const onLogOutClick = () => {
    localStorage.clear(); 
    localStorage.removeItem('__mantle_tile_meta_data');
    navigate('/login')
  }

  //클릭로그 가져오기
  useEffect(() => {
    fetchClickList(user.id)
  }, [])

  const fetchClickList = async (id) => {
    try {
        setError(null);
        setLoading(true); //로딩이 시작됨
        const response = await axios.get(`${baseUrl}/click_list?user_id=${id}`, { headers });
        setClickList(response.data.click_list)
        console.log(response.data.click_list)
    } catch (e) {
        setError(e);
    }
    setLoading(false);
  };

  //클릭했을 때
  // const clickStoreTitle = () => {
  //   poststoreClick(store.id, user.id)
  //   navigate(`/detail/${store.id}`)
  // }


  return(
    <div style={{backgroundColor:'#FED06E', height: '300px'}}>
			<Header></Header>
      <div className="browser-mypage">
        <div className="mypage-info">
          <div style={{display:"flex"}}>
            <img src={logo} className="mypage-rabbit-logo" alt="" />
            <div className="mypage-content">
              <span style={{fontSize: "25px"}}>{user.nickname} </span>님 반갑습니다!
              <br></br>
              <br></br>
              저는 학사를 위해 뛰는 토끼<br></br>하띠입니다.
            </div>
          </div>
          <div className="mypage-myinfo">{user.age}세 | {user.gender} | {user.category}</div>
          <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>로그아웃</button>
        </div>

        <div className="mypage-log">
          <div className="mypage-click-log">
            <div style={{fontSize: "18px"}}>최근 클릭한 식당</div>
            <div className="mypage-log-list">
              {clickList && clickList.map((store, i) => (
                <div className="store" key={i}>
                  <div className="store-first">
                    <div>
                      {/* <span className="store-title" onClick={clickStoreTitle}>{store}</span> */}
                      <span className="store-title">{store}</span>
                    </div>
                  </div>
                  <div className="store-type">{store.category}</div>
                  <div className="store-address">{store.address}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default BrowserMyPage