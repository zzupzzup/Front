import React from "react";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import './BrowserLogin.css';

const BrowserLogin = ()=>{
  const navigate = useNavigate();
  const [userId, setUserId] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [login, setLogin] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

  const onSignInClick = async(e)=>{
    e.preventDefault() 
    setLogin(true)
    if (!email || !password){
      console.log('fail')
    } 
    else {
      postData(email, password);
    }
  }     

  async function postData(email, password) {
    try {
      const response = await axios.post(`${baseUrl}/auth/login?sns_type=email`,
        JSON.stringify(
          {
            email : email,
            pw : password,
          }),
        { headers }
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/mypage");

    } catch (error) {
      console.error(error);
    }
  }
  const onGotoAuthClick = () => {
    navigate("/auth");
  }

  const onGotoMainClick = () => {
    navigate("/");
  }

  return(
    <div style={{backgroundColor:'#FED06E', height: '100vh'}}>
      <Header></Header>
      <div className="login-content">
        <div>
          <img src={logo} className="login-logo" alt="" />
        </div>
        <div className="login_warp">
          <p className="login-title">반갑습니다.<br></br>
            쩝쩝학사에서 나에게 딱 맞는 <br></br>
            맛집을 추천 받으세요!
          </p>
          <div className='login_items'>
            <div className='login_text'><span className={`text_bar ${!login ? '' :( email ? 'success' : 'fail')}`}>이메일 (ID)</span></div>
            <div className= {`login_content ${!login ? '' :( email ? 'success' : 'fail')}`}>
              <input className='textinput' type="email" placeholder="email 형식" onChange={onChangeEmail} value={email}/>
            </div>
          </div>
          <div className='login_items'>
            <div className='login_text'><span className={`text_bar ${!login ? '' :( password ? 'success' : 'fail')}`}>비밀번호</span></div>
            <div className= {`login_content ${!login ? '' :( password ? 'success' : 'fail')}`}>
              <input className='textinput' type="password" placeholder="비밀번호" onChange={onChangePassword} value={password} />
            </div>
          </div>
          <button className={`login_btn ${!login ? '' :(email&&password ? 'success' : 'fail')}`} onClick={onSignInClick}>로그인하기</button>
        </div>
      </div>
      <div className="browser-goto">
        <button className='goto-auth' onClick={onGotoAuthClick} style={{cursor: 'pointer'}}>회원가입</button>
        <button className='goto-main' onClick={onGotoMainClick} style={{cursor: 'pointer'}}>메인화면</button>
      </div>
    </div>
  )
}

export default BrowserLogin