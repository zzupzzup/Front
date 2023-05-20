import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { authService } from "../../firebase";
import {useRecoilState} from 'recoil';
import {selectArea} from '../../Atom';
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import './BrowserMyPage.css';

const BrowserMyPage = ()=>{
	const navigate = useNavigate();
	const [areas, setAreas] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"))

  // 로그아웃
  const onLogOutClick = () => {
    authService.signOut();
    localStorage.clear(); 
    navigate('/login')
  }


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
              저는 학사를 위해 뛰는 토끼<br></br>학뛰토입니다.
            </div>
          </div>
          <div className="mypage-myinfo">{user.age}세 | {user.gender} | {user.category}</div>
          <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>로그아웃</button>
        </div>

        <div className="mypage-log">
          <div className="mypage-click-log">
            <div style={{fontSize: "18px"}}>내가 클릭한 식당</div>
            <div className="mypage-log-list">

            </div>
          </div>

          <div className="mypage-like-log">
            <div style={{fontSize: "18px"}}>내가 좋아요한 식당</div>
            <div className="mypage-log-list">

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrowserMyPage