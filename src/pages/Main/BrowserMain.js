import React from "react";
import {Link} from 'react-router-dom';
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
      <div style={{display: 'flex'}}>
        <BrowserList></BrowserList>
        <BrowserMaps></BrowserMaps>
      </div>
    </div>
  )
}

export default BrowserMain