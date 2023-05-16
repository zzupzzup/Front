import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {selectType, selectArea} from '../../../../Atom';
import seoul from '../../../../assets/seoul.jpg';
import './SelectModal.css';

export default function SelectModal(props) {
  const [types, setTypes] = useState(['한식', '일식', '술집', '양식', '분식', '까페', '숯불구이', '중식', '기타']);
  const { isOpen, onRequestClose, area, type, allCheck, handleAreaClick, handleTypeClick, handleTypeAll } = props;

  const customStyles = {
    content: {
      fontFamily: 'SUITE-Regular',
      left: '25.5px',
      top: '130px',
      borderRadius: '10px',
      WebkitOverflowScrolling: 'touch',
      outline: 'none',
      width: '300px',
      height:'500px',
      backgroundColor:'white',
      border: 'none',
      zIndex:-1
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      bottom: 0,
      left: 0,
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 99
    }
  };


  Modal.setAppElement('#root');
  return (
    <Modal closeTimeoutMS={300} isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles} contentLabel="Example Modal">
      <div className="">
        <div className='modal-title'>카테고리 설정</div>
        <br></br>
        <div className='modal-sub-title'>지역</div>
        <div className='modal-area'>
          <img src={seoul} className='area-img'/>
          <button className={area === '마포구' ? 'area1 black' : 'area1'} onClick={() => handleAreaClick('마포구')}>마포구</button>
          <button className={area === '성동구' ? 'area2 black' : 'area2'} onClick={() => handleAreaClick('성동구')}>성동구</button>
          <button className={area === '광진구' ? 'area3 black' : 'area3'} onClick={() => handleAreaClick('광진구')}>광진구</button>
          <button className={area === '서초구' ? 'area4 black' : 'area4'} onClick={() => handleAreaClick('서초구')}>서초구</button>
          <button className={area === '강남구' ? 'area5 black' : 'area5'} onClick={() => handleAreaClick('강남구')}>강남구</button>
        </div>
        <br></br>
        <div className='modal-sub-title'>
          <div>음식 타입</div>
          <div>
            <button className={allCheck ? 'all-check ok' : 'all-check'} onClick={() => handleTypeAll()}>✔</button>
            <span> 모두 선택</span>
          </div>
        </div>
        <div className='type'>
          {types.map((item) => (
            <button className={type.includes(item) ? 'types yellow' : 'types'} onClick={() => handleTypeClick(item)}>{item}</button>
          ))}
        </div>

        <button className='ok-button' onClick={() => onRequestClose()}>확정하기</button>
      </div>
    </Modal>
  );
}
