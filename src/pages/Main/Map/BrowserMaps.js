import { useState, useEffect, useRef } from 'react';
import {useRecoilState} from 'recoil';
import {selectList, selectStore} from '../../../Atom';


function BrowserMaps() {
  const { naver } = window;
  const mapElement = useRef(null);
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [store, setStore] = useRecoilState(selectStore);


  //식당 더미데이터
  let stores = []
  if (!chatbot){
    stores = [{storeId: 1, title: "우리콩순두부", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_storeId: 1, tag_name:"또"}, {tag_storeId: 2, tag_name:"먹"}], userScrap:true}]
  } else{
    stores = [
      {storeId: 1, title: "우리콩순두부", result: '87%', point:4.4, view: 10434, review: 9, star:146, address:"서울시 강북구 우이동 182-3", type:"기타 한식", tags:[{tag_storeId: 1, tag_name:"또"}, {tag_storeId: 2, tag_name:"먹"}], userScrap:true},
      {storeId: 2, title: "시래기화덕 생선구이", result: '76%', point:4.3, view: 2676, review: 5, star:17, address:"서울시 강북구 수유동 583-8", type:"탕/찌개/전골", tags:[{tag_storeId: 1, tag_name:"또"}, {tag_storeId: 2, tag_name:"먹"}, {tag_storeId: 3,tag_name:"쭈"}],userScrap:false},
      {storeId: 3, title: "버거파크", result: '70%', point:4.3, view: 2796, review: 6, star:50, address:"서울시 강북구 수유동 47-1", type:"브런치/버거/샌드위치", tags:null,userScrap:true},
      {storeId: 4, title: "하이그라운드제빵소", result: '60%', point:4.2, view: 1229, review: 4, star:25, address:"서울시 강북구 우이동 239-7", type:"베이커리", tags:[{tag_storeId: 1, tag_name:"또"}], userScrap:true},
      {storeId: 5, title: "벼랑순대국", result: '57%', point:4.2, view: 11039, review: 12, star:311, address:"서울시 강북구 번동 428-90", type:"탕/찌개/전골", tags:[{tag_storeId: 3,tag_name:"쭈"}],userScrap:false},
      {storeId: 6, title: "마리웨일마카롱", result: '52%', point:null, view: 3368, review: 4, star:38, address:"서울시 강북구 수유동 192-71", type:"고기 요리", tags:null,userScrap:true},
    ];
  }

  // 지도
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    //중심부 찍기
    const location = new naver.maps.LatLng(37.527118100, 126.932956014);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 12,
      zoomControl: true,
      mapTypeControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);


    //식당 위치
    for (let i = 0; i < stores.length; i++) {

      //지오코딩(주소->좌표)
      naver.maps.Service.geocode({query: stores[i].address}, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert('문제가 발생했습니다.');
        }
        if (response.v2.meta.totalCount === 0) {
          return alert('입력한 주소가 맞는지 다시 확인해주세요!');
        }

        //마커 찍기
        const otherMarkers = new naver.maps.Marker({
          map: map,
          title: stores[i].title,
          position: new naver.maps.LatLng(
            response.v2.addresses[0].y, 
            response.v2.addresses[0].x
          )
        });

        //정보창
        const infowindow = new naver.maps.InfoWindow({
          content: stores[i].title,
          borderWstoreIdth: 1,
          anchorSize: new naver.maps.Size(10, 10),
          pixelOffset: new naver.maps.Point(10, -10),
        });

        //마커 클릭하면 정보창 뜨게함
        naver.maps.Event.addListener(otherMarkers, "click", function(e){
          setStore(stores[i].storeId)
          if (infowindow.getMap()) {
            infowindow.close();
          } else {
            infowindow.open(map,otherMarkers);
          }
        });

      });
    }

  }, [chatbot]);

  return <div ref={mapElement} style={{marginTop:'60px', wstoreIdth: '100vw', height: 'calc(100vh - 60px)' }} />
}


export default BrowserMaps;