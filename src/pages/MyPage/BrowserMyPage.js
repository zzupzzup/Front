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
  const nickname = localStorage.getItem('nickname')

  // 로그아웃
  const onLogOutClick = () => {
    authService.signOut();
    localStorage.clear(); 
    navigate('/login')
  }


  return(
    <div style={{backgroundColor:'#FED06E', height: '100vh'}}>
			<Header></Header>
			<div className="browser-mypage">
				<img src={logo} className="logout-logo" alt="" />
				<div className="mypage-content">
          <span style={{fontSize: "25px"}}>{nickname}</span>님 반갑습니다!
          <br></br>
          <br></br>
          저는 학사를 위해 뛰는 토끼<br></br>학뛰토입니다.
        </div>
      </div>
      <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>로그아웃</button>
    </div>
  )
}

export default BrowserMyPage