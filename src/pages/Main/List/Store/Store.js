import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {selectStore} from '../../../../Atom';	
import star from '../../../../assets/star.png'
import view from '../../../../assets/view.png'
import heart from '../../../../assets/heart.png'
import pinkHeart from '../../../../assets/pink_heart.png'
import emptyHeart from '../../../../assets/empty_heart.png'
import './Store.css'

const Store = (props)=>{
  const navigate = useNavigate();
  const { store, isScrappedStore } = props;
  const [isScrapped, setIsScrapped] = useState(isScrappedStore);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);

  const setColor = (tagName) => {
    if (tagName === "또") {
      return 'store-tag green';
    } else if (tagName === '먹') {
      return 'store-tag mint';
    } else if (tagName === '쭈') {
      return 'store-tag red';
    }
  };

  //선택했을 때
  const clickStore = () => {
    setcheckedStore(store.id)
  }


  //스크랩
  const storeScrap = () => {
    // poststoreScrap(store.storeIdx);
    setIsScrapped(state => !state);
  };

  const storeUnScrap = () => {
    // poststoreUnScrap(store.storeIdx);
    setIsScrapped(state => !state);
  }

  return(
    <div className="store" key={store.id} onClick={clickStore}>
      <div className="store-first">
        <div>
          <span className="store-title" onClick={()=>{navigate(`/detail/${store.id}`)}}>{store.title}</span>
          <span style={{fontSize:'13px', color:'#FED06E'}}> {store.result}</span>
        </div>
        <div>
          {store.tags && store.tags.map((tag) => (
            <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
          ))}
        </div>
      </div>
      <div className="store-type">{store.type}</div>
      <div className="store-address">{store.address}</div>
      <div className="store-last">
        <div>
          <span className="store-info"><img src={star} className="store-icon" alt="" /> {store.point}({store.review})</span>
          <span className="store-info"><img src={view} className="store-icon" alt="" /> {store.view}</span>
          <span className="store-info"><img src={heart} className="store-icon" alt="" /> {store.star}</span>
        </div>
        <div>
          {isScrapped ?
            <img src={pinkHeart} alt='' className="store-like" onClick={storeUnScrap}/> :
            <img src={emptyHeart} alt='' className="store-like" onClick={storeScrap}/>
          }
        </div>
      </div>
      <div>{isScrapped}</div>
    </div>
  )
}

export default Store