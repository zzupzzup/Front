import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import Header from '../Header/Header';
import MobileList from './List/MobileList';
import MobileMaps from "./Map/MobileMaps"
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const MobileMain = ()=>{

  return(
    <div>
      <Header></Header>
      <MobileList></MobileList>
      <MobileMaps></MobileMaps>
    </div>
  )
}

export default MobileMain