import { useState, useEffect, useRef } from 'react';
import {useRecoilState} from 'recoil';
import {selectList, selectStore, selectArea, resultChat, resultCheck} from '../../../Atom';


function BrowserMaps() {
  const { naver } = window;
  const mapElement = useRef(null);
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [store, setStore] = useRecoilState(selectStore);
  const [area, setArea] = useRecoilState(selectArea);
  const [resultSearch, setResultSearch] = useRecoilState(resultChat);
  const [resultPersonal, setResultPersonal] = useRecoilState(resultCheck);
  const [centerLat, setCenterLat] = useState(37.527118100);
  const [centerLong, setCenterLong] = useState(126.932956014);
  const [zoom, setZoom] = useState(12);

  let stores = []
  if (!chatbot){
    if (resultPersonal){
      stores = resultPersonal;
    }
  } else{
    if (resultSearch){
      stores = resultSearch;
    }
  }

  // 지도
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    //중심부 찍기
    if (!area){
      setCenterLat(37.527118100);
      setCenterLong(126.932956014);
      setZoom(12);
    }else{
      if (area === '마포구') {
        setCenterLat(37.555362);
        setCenterLong(126.897518);
        setZoom(14);
      } else if (area === '성동구') {
        setCenterLat(37.556233);
        setCenterLong(127.029760);
        setZoom(14);
      } else if (area === '광진구') {
        setCenterLat(37.5492366);
        setCenterLong(127.0747086);
        setZoom(14);
      } else if (area === '강남구') {
        setCenterLat(37.5092939);
        setCenterLong(127.0214957);
        setZoom(14);
      } else if (area === '서초구') {
        setCenterLat(37.494604);
        setCenterLong(126.995818);
        setZoom(14);
      }
    }

    const location = new naver.maps.LatLng(centerLat, centerLong);
    
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: zoom,
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
          title: stores[i].store,
          position: new naver.maps.LatLng(
            response.v2.addresses[0].y, 
            response.v2.addresses[0].x
          )
        });

        //정보창
        const infowindow = new naver.maps.InfoWindow({
          content: stores[i].store,
          backgroundColor: "#fff",
          borderColor: "rgb(80, 80, 80)",
          borderWidth: 3,
          borderRadius: "10px",
          anchorSize: new naver.maps.Size(10, 10),
          anchorSkew: true,
          anchorColor: "#fff",
          pixelOffset: new naver.maps.Point(0, 3),
          boxShadow: "#949494",
        });
              

        //마커 클릭하면 정보창 뜨게함
        naver.maps.Event.addListener(otherMarkers, "click", function(e){
          setStore(stores[i].id)
        });
        if (store===stores[i].id) {
          infowindow.open(map, otherMarkers);
        } else {
          infowindow.close();
        }
        
      });
    }

  }, [area, zoom, centerLat, centerLong, chatbot, stores, mapElement, naver, store]);

  return <div ref={mapElement} style={{marginTop:'60px', wstoreIdth: '100vw', height: 'calc(100vh - 60px)' }} />
}


export default BrowserMaps;