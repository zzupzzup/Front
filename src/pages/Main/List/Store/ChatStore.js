import React from "react";
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {useRecoilState} from 'recoil';
import {selectStore} from '../../../../Atom';	
import pinkHeart from '../../../../assets/pink_heart.png'
import emptyHeart from '../../../../assets/empty_heart.png'
import './ChatStore.css'

const ChatStore = (props)=>{
  const navigate = useNavigate();
  const { store, isScrappedStore } = props;
  const [isScrapped, setIsScrapped] = useState(isScrappedStore);
  const [checkedStore, setcheckedStore] = useRecoilState(selectStore);
  const [isReview, setIsReview] = useState(false)

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
  const setClick = (id) => {
    if (id === store.id){
      return 'store click'
    } else{
      return 'store'
    }
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

  //리뷰보기
  const watchReview = () => {
    setIsReview(state => !state);
  }

  return(
    <div className={setClick(checkedStore)} key={store.id} onClick={clickStore}>
      <div className="store-first">
        <div>
          <span className="store-title" onClick={()=>{navigate(`/detail/${store.id}`)}}>{store.store} </span>
          <span style={{fontSize:'13px', color:'#FED06E'}}> {Math.floor(store.score)}% 정확해요</span>
        </div>
        <div>
          {store.tags && store.tags.map((tag) => (
            <div className={setColor(tag.tag_name)} key={tag.tag_id} >{tag.tag_name}</div>
          ))}
        </div>
      </div>
      <div className="store-type">{store.category}</div>
      <div className="store-address">{store.address}</div>
      <div className="store-last">
        <div className="store-review" onClick={watchReview}>대표 리뷰
        {isReview ?
          <span> 접기▲</span>:
          <span> 보기▼</span>
        }
        </div>
        <div>
          {isScrapped ?
            <img src={pinkHeart} alt='' className="store-chat-like" onClick={storeUnScrap}/> :
            <img src={emptyHeart} alt='' className="store-chat-like" onClick={storeScrap}/>
          }
        </div>
      </div>
      {isReview ?
        <div className="store-review-content">"{store.reviewtext}"</div>
        :
        <div></div>
      }
    </div>
  )
}

export default ChatStore