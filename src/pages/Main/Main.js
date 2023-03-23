import React from "react";
import {Link} from 'react-router-dom';
import { authService } from "../../firebase";
import Header from '../Header/Header';
import List from './List/List';
import Maps from "./Maps"
import {useRecoilState} from 'recoil';
import {userId} from '../../Atom';

const Main = ()=>{

  return(
    <div>
      <Header></Header>
      <div style={{display: 'flex'}}>
        <List></List>
        <Maps></Maps>
      </div>
    </div>
  )
}

export default Main