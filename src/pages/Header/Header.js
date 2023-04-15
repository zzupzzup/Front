import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import {useRecoilState} from 'recoil';
import {signin} from '../../Atom';
import logo from '../../assets/logo_head.png'
import mypage from '../../assets/mypage.png'
import './Header.css';

const Header = ()=>{
  const name = localStorage.getItem('name')

  return(
    <div className="header">

			<Link to="/"><img src={logo} className="logo" alt="" /></Link>
			<Link to="/" style={{textDecoration:"none"}}><div className="title">쩝쩝학사</div></Link>

      {name?
        <Link to="/mypage" className="mypage-logo"><img src={mypage} className="mypage" alt="" /></Link>
        :
        <Link to="/login" className="login"><img src={mypage} className="mypage" alt="" /></Link>
      }

    </div>
  )
}

export default Header