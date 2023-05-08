import React from "react";
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from '../Header/Header';
import logo from '../../assets/logo.png'
import {useRecoilState} from 'recoil';
import {signin} from '../../Atom';
import './BrowserAuth.css';

const BrowserAuth = ()=>{
  const navigate = useNavigate();
  const [userId, setUserId] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');
  const [pressBtn, setPressBtn] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  const [checkedTypes, setcheckedTypes] = useState([]);
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

  // 음식 카테고리
	const type = [
    {id: 1, name: "한식"},
    {id: 2, name: "일식"},
    {id: 3, name: "술집"},
    {id: 4, name: "양식"},
    {id: 5, name: "중식"},
		{id: 6, name: "분식"},
    {id: 7, name: "카페"},
    {id: 8, name: "식육"},
    {id: 9, name: "기타"}
  ];

  //각 카테고리 버튼 눌렀을 때
  const checkHandler = ({ target }) => {

    if(target.checked) {
      setcheckedTypes([...checkedTypes, target.value]);
    } else if (!target.checked ) {
      target.checked = false;
      setcheckedTypes(checkedTypes.filter(each => each !== target.value));
    }
    if (checkedTypes.length > 2 && !checkedTypes.includes(target.value)){
      alert("최대 3개까지 선택 가능합니다.");
      setcheckedTypes(checkedTypes.filter(each => each !== target.value));
      target.checked = false;
    }
    return checkedTypes;
  };

  //버튼 클릭
  const onNextClick = async(e)=>{
    setNextBtn(true)
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
      <div className={`auth-content-first ${ nextBtn ? 'success' : 'fail'}`}>
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
      <div className={`auth-content-second ${ nextBtn ? 'success' : 'fail'}`}>
        <div className='auth-title'>
          <p style={{fontSize:'18px'}}>회원가입</p>
          <p style={{fontSize:'14px'}}>추가 정보입력(선택)</p>
        </div>
        <div className='auth_warp'>
          <div className='auth_items' style={{height: '75px'}}>
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
          <div className='auth_items'>
            <div className='auth_text'><span className='text_bar'>좋아하는 음식 타입(최대 3개)</span></div>
            <div className="select-type">
              {type.map((item) => (
                <div className="check-type" key={item.id} >
                  <input type = "checkbox" value={item.name||''} id={item.id} onChange={(e) => checkHandler(e)}/>
                  <label for={item.id} style={ item.id === 8 ? {fontSize:'11px', fontWeight:'bold'} : {fontSize:'13.5px'} }>{item.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className={`start_btn ${!pressBtn ? '' :(email&&password&&passwordCheck&&name ? 'success' : 'fail')}`} onClick={onSignUpClick}>가입하기</button>
      </div>
    </div>
  )
}

export default BrowserAuth