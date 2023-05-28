import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import { authService } from "../../firebase";
import Header from '../Header/Header';
import BrowserList from './List/BrowserList';
import BrowserMaps from "./Map/BrowserMaps"
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const BrowserMain = ()=>{

  return(
    <div>
      <Header></Header>
      <BrowserList></BrowserList>
      <BrowserMaps></BrowserMaps>
    </div>
  )
}

export default BrowserMain