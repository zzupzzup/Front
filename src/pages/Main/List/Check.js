import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectCate} from '../../../Atom';
import './BrowserList.css'

const Check = ({checkedItems, setcheckedItems})=>{
  const [cate, setCate] = useRecoilState(selectCate);
  const formData = [
    {id: 1, name: "한식"},
    {id: 2, name: "양식"},
    {id: 3, name: "일식"},
    {id: 4, name: "중식"},
    {id: 5, name: "기타"},
    {id: 6, name: "마라탕"},
  ];

  //전체 다 넣어주기
  useEffect(() => {
    const idArray = [];
    formData.forEach((e) => idArray.push(e.name));
    setcheckedItems(idArray);
  }, [])

  //각 카테고리 버튼 눌렀을 때
  const checkHandler = ({ target }) => {
    setCate(target.value);
    checkedItemHandler(target.value, target.checked);
  };

  const checkedItemHandler = (category, isChecked) => {
    if(isChecked) {
      if (!checkedItems.includes(category)){
        setcheckedItems([...checkedItems, category]);
      }
    } else if (!isChecked ) {
      onRemove(category);
    }
    return checkedItems;
  };

  const onRemove = name => {
    setcheckedItems(checkedItems.filter(each => each !== name));
  };

  return(
    <div className="check">
      {formData.map((item) => (
        <div className="check-cate" key={item.id} >
          <input type = "checkbox" value={item.name||''} id={item.id} onChange={(e) => checkHandler(e)} defaultChecked/>
          <label for={item.id} style={{cursor: 'pointer'}}>
            <span className="keyword">{item.name}</span>
            {checkedItems.includes(item.name)?
              <span className="plu-miu">x</span>:
              <span className="plu-miu">+</span>
            }
          </label>
        </div>
      ))}
    </div>
  )
}

export default Check