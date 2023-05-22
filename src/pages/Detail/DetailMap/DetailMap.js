import { useState, useEffect, useRef } from 'react';
import {useRecoilState} from 'recoil';


const DetailMap = (props)=>{
  const { naver } = window;
  const mapElement = useRef(null);
  const { storeAddress } = props;
  const [x, setX] = useState(null);
  const [y, setY] = useState(null);

  // 지도
  useEffect(() => {
    if (!mapElement.current || !naver) return;


    //지오코딩(주소->좌표)
    naver.maps.Service.geocode({query: storeAddress}, function(status, response) {
      if (status === naver.maps.Service.Status.ERROR) {
        return alert('문제가 발생했습니다.');
      }
      if (response.v2.meta.totalCount === 0) {
        return alert('입력한 주소가 맞는지 다시 확인해주세요!');
      }
      setX(response.v2.addresses[0].x)
      setY(response.v2.addresses[0].y)

      new naver.maps.Marker({
        map: map,
        title: "",
        position: new naver.maps.LatLng(
          response.v2.addresses[0].y, 
          response.v2.addresses[0].x
        )
      });
    })

    //중심부 찍기
    const location = new naver.maps.LatLng(y, x);

    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 14,
      zoomControl: true,
      mapTypeControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(mapElement.current, mapOptions);
  }, [x]);

  return <div ref={mapElement} style={{width: '350px', height: '233px', margin:'auto' }} />
}


export default DetailMap;