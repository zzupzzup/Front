import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import {useRecoilState} from 'recoil';
import {signin} from '../../Atom';
import './MobileAuth.css';

const MobileAuth = ()=>{
  const navigate = useNavigate();
  const [userId, setUserId] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [pressBtn, setPressBtn] = useState(false);
  const [nextBtn1, setNextBtn1] = useState(false);
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  //요소 넣기
  const onChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value)
  }
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangeSex = (e) => {
    setSex(e.target.value)
  }
  const onChangeAge = (e) => {
    setAge(e.target.value)
  }

  //버튼 클릭
  const onNextClick = async(e)=>{
    setNextBtn1(true)
  } 

  const onSignUpClick = async(e)=>{
    e.preventDefault() 
    setPressBtn(true)
    // if(password !== passwordCheck) {
    //   return alert('비밀번호와 비밀번호확인은 같아야 합니다.')
    // } 
    if (!email || !password || !passwordCheck || !name){
      console.log('fail')
    } 
    else {
      postData(email, password);
    }
  }     

  async function postData(email, password) {
    try {
      const response = await axios.post(`${baseUrl}/auth/register/email`,
        JSON.stringify(
          {
            email : email,
            pw : password,
            // password2 : passwordCheck,
            // name : name
          }),
        { headers }
      );
      navigate("/login");
      console.log('리턴', response);

    } catch (error) {
      console.error(error);
    }
  }

  return(
    <div className='auth'>
      <Header></Header>
      <div className={`auth-content-first ${ nextBtn1 ? 'success' : 'fail'}`}>
        <div className='auth-title'>
          <p style={{fontSize:'18px'}}>회원가입</p>
          <p style={{fontSize:'14px'}}>기본 정보입력(필수)</p>
        </div>
        <div className='auth_warp'>
          <div className='auth_items'>
            <div className='auth_text'><span className={`text_bar ${!pressBtn ? '' :( email ? 'success' : 'fail')}`}>이메일 (ID)</span></div>
            <div className= {`auth_content ${!pressBtn ? '' :( email ? 'success' : 'fail')}`}>
              <input className='textinput' type="email" placeholder="email 형식" onChange={onChangeEmail} value={email}/>
            </div>
          </div>
          <div className='auth_items'>
            <div className='auth_text'><span className={`text_bar ${!pressBtn ? '' :( password ? 'success' : 'fail')}`}>비밀번호</span></div>
            <div className= {`auth_content ${!pressBtn ? '' :( password ? 'success' : 'fail')}`}>
              <input className='textinput' type="password" placeholder="비밀번호" onChange={onChangePassword} value={password} />
            </div>
          </div>
          <div className='auth_items'>
            <div className='auth_text'><span className={`text_bar ${!pressBtn ? '' :( passwordCheck ? 'success' : 'fail')}`}>비밀번호확인</span></div>
            <div className= {`auth_content ${!pressBtn ? '' :( passwordCheck ? 'success' : 'fail')}`}>
              <input className='textinput' type="password" placeholder="비밀번호 확인" onChange={onChangePasswordCheck} value={passwordCheck} />
            </div>
          </div>
          <div className='auth_items'>
            <div className='auth_text'><span className={`text_bar ${!pressBtn ? '' :( name ? 'success' : 'fail')}`}>이름</span></div>
            <div className= {`auth_content ${!pressBtn ? '' :( name ? 'success' : 'fail')}`}>
              <input className='textinput' type="text" placeholder="이름" onChange={onChangeName} value={name} />
            </div>
          </div>
        </div>
        <button className={`start_btn ${!pressBtn ? '' :(email&&password&&passwordCheck&&name ? 'success' : 'fail')}`} onClick={onNextClick}>다음 단계</button>
      </div>
      <div className={`auth-content-second ${ nextBtn1 ? 'success' : 'fail'}`}>
        <div className='auth-title'>
          <p style={{fontSize:'18px'}}>회원가입</p>
          <p style={{fontSize:'14px'}}>추가 정보입력(선택)</p>
        </div>
        <div className='auth_warp'>
          <div className='auth_items'>
            <div className='auth_text'><span className='text_bar'>성별</span></div>
            <div className="auth-check-sex">
              <input type="radio" id="man" name="sex" value="1" onChange={onChangeSex} /><label for="man"> 남</label>
              <input type="radio" id="woman" name="sex" value="0" onChange={onChangeSex} /><label for="woman"> 여</label>
            </div>
          </div>
          <div className='auth_items'>
            <div className='auth_text'><span className='text_bar'>나이</span></div>
            <div className= "auth_content">
              <input className='textinput' type="text" placeholder="나이(숫자만)" onChange={onChangeAge} value={age} />
            </div>
          </div>
        </div>
        <button className={`start_btn ${!pressBtn ? '' :(email&&password&&passwordCheck&&name ? 'success' : 'fail')}`} onClick={onSignUpClick}>가입하기</button>
      </div>
    </div>
  )
}

export default MobileAuth