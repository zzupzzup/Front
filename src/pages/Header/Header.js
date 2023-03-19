import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import logo from '../../assets/logo.png'
import './Header.css';

const Header = ()=>{
  const nickname = localStorage.getItem('nickname')

  // 로그인
  const onLogOutClick = () =>{
    authService.signOut();
    localStorage.clear(); 
  }

  return(
    <div className="header">

      <img src={logo} className="logo" alt="" />
      <div className="title">쩝쩝학사</div>

      {nickname?
        <div className="logout">
          <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>LOGOUT</button>
          <div className="nickname">{nickname}</div>
        </div>
        :
        <Link to="/login" className="login">LOGIN</Link>
      }

    </div>
  )
}

export default Header