import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectCate} from '../../../Atom';
import Check from './Check';
import './List.css'

const List = ()=>{
  const [checkedItems, setcheckedItems] = useState([]);

  return(
    <div className="list">
      <Check checkedItems={checkedItems} setcheckedItems={setcheckedItems}></Check>
    </div>
  )
}

export default List