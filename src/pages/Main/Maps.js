import { useState, useEffect, useRef } from 'react';


function App() {
  const { naver } = window;
  const mapElement = useRef(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  // 지도
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    //현위치
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
    });
    } else {
      window.alert("현재 위치를 알수 없습니다.");
    }

    // 지도에 표시할 위치의 위도와 경도 좌표를 파라미터로 넣어줍니다.
    const location = new naver.maps.LatLng(lat, long);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    new naver.maps.Marker({
      position: location,
      map,
    });
  }, [lat]);


  return <div ref={mapElement} style={{ width: '90vw', height: '90vh' }} />;
}


export default App;