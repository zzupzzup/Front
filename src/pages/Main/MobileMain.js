import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import Header from '../Header/Header';
import MobileList from './List/MobileList';
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const MobileMain = ()=>{

  return(
    <div>
      <Header></Header>
      <MobileList></MobileList>
    </div>
  )
}

export default MobileMain