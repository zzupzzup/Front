import React from "react";
import { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectCate} from '../../../Atom';
import '../Main.css'

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
    formData.forEach((el) => idArray.push(el.name));
    setcheckedItems(idArray);
    console.log(setcheckedItems)
    // checkedItems.forEach((checkbox) => {checkbox.checked = true;})
  }, [])

  const checkHandler = ({ target }) => {
    setCate(target.value);
    console.log(target.checked)
    checkedItemHandler(target.parentNode.lastChild, target.value, target.checked);
  };

  const checkedItemHandler = (text, category, isChecked) => {
    if(isChecked) {
      if (!checkedItems.includes(category)){
        setcheckedItems([...checkedItems, category]);
      }
    } else if (!isChecked ) {
      onRemove(category);
    }
    return checkedItems;
  };

  const onRemove = id => {
    setcheckedItems(checkedItems.filter(each => each !== id));
  };

  console.log(checkedItems);

  return(
    <div className="check">
      {formData.map((item) => (
        <div className="check-cate" key={item.id} >
          <input type = "checkbox" value={item.name} id={item.id} onChange={(e) => checkHandler(e)} defaultChecked/>
          <label for={item.id} style={{cursor: 'pointer'}}>
            <span style={{fontSize: '12px'}}>{item.name}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default Check