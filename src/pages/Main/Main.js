import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import Maps from "./Maps"
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const Main = ()=>{
  const nickname = localStorage.getItem('nickname')

  // 로그인
  const onLogOutClick = () =>{
    authService.signOut();
    localStorage.clear(); 
  }

  return(
    <div>
      <div>{nickname}</div>

      {/* 로그인 */}
      {nickname?
        <div>
          <button className='logout-btn' onClick={onLogOutClick} style={{cursor: 'pointer'}}>로그아웃 하기</button>
        </div>
        :
        <Link to="/login">로그인 하기</Link>
      }


      {/* 지도 */}
      <Maps></Maps>
    </div>
  )
}

export default Main