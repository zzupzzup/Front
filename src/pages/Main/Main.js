import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import Maps from "./Maps"
import Header from '../Header/Header';
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const Main = ()=>{

  return(
    <div>
      <Header></Header>
      {/* 지도 */}
      <Maps></Maps>
    </div>
  )
}

export default Main