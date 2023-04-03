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
	const [checkedAreas, setcheckedAreas] = useRecoilState(selectArea);
	const [areas, setAreas] = useState(null);
  const nickname = localStorage.getItem('nickname')

  // 로그아웃
  const onLogOutClick = () => {
    authService.signOut();
    localStorage.clear(); 
		navigate('/')
  }

	// 구 선택하기
	const area = [
    {id: 1, name: "강북구"},
    {id: 2, name: "도봉구"},
    {id: 3, name: "노원구"},
    {id: 4, name: "은평구"},
    {id: 5, name: "서대문구"},
		{id: 6, name: "종로구"},
    {id: 7, name: "성북구"},
    {id: 8, name: "동대문구"},
    {id: 9, name: "중랑구"},
    {id: 10, name: "마포구"},
		{id: 11, name: "용산구"},
    {id: 12, name: "중구"},
    {id: 13, name: "성동구"},
    {id: 14, name: "광진구"},
    {id: 15, name: "강서구"},
		{id: 16, name: "양천구"},
    {id: 17, name: "영등포구"},
    {id: 18, name: "동작구"},
    {id: 19, name: "서초구"},
    {id: 20, name: "강남구"},
		{id: 21, name: "송파구"},
    {id: 22, name: "강동구"},
    {id: 23, name: "구로구"},
    {id: 24, name: "금천구"},
    {id: 25, name: "관악구"},
  ]; 

  //각 카테고리 버튼 눌렀을 때
  const checkHandler = ({ target }) => {
    setAreas(target.value);
    checkedItemHandler(target.value, target.checked);
  };

  const checkedItemHandler = (category, isChecked) => {
    if(isChecked) {
      if (!checkedAreas.includes(category)){
        setcheckedAreas([...checkedAreas, category]);
      }
    } else if (!isChecked ) {
      onRemove(category);
    }
    return checkedAreas;
  };

  const onRemove = name => {
    setcheckedAreas(checkedAreas.filter(each => each !== name));
  };

  //지역 고른 후 확인 버튼 눌렀을 때
  const onSubmitClick = () => {
    navigate("/");
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
          저는 학사를 위해 뛰는 토끼 학뛰토입니다.
        </div>
      </div>
      <div className="select-area-content">
        자주 가는 구를 선택하시면 더 정확한 추천을 해드릴 수 있어요!
        <div className="select-area">
          {area.map((item) => (
            <div>
              {checkedAreas.includes(item.name)?
                <div className="check-area" key={item.id} >
                  <input type = "checkbox" value={item.name||''} id={item.id} onChange={(e) => checkHandler(e)} checked/>
                  <label for={item.id} style={{cursor: 'pointer'}}>{item.name}</label>
                </div>:
                <div className="check-area" key={item.id} >
                  <input type = "checkbox" value={item.name||''} id={item.id} onChange={(e) => checkHandler(e)}/>
                  <label for={item.id} style={{cursor: 'pointer'}}>{item.name}</label>
                </div>
              }
            </div>
          ))}
        </div>
      </div>
      <button className='submit-btn' onClick={onSubmitClick} style={{cursor: 'pointer'}}>확인</button>
      <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>로그아웃</button>
    </div>
  )
}

export default BrowserMyPage