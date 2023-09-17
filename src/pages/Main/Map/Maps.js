import { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { selectList, selectStore, selectArea, resultChat, resultCheck } from "../../../Atom";

function Maps() {
  const { naver } = window;
  const mapElement = useRef(null);
  const [chatbot, setChatbot] = useRecoilState(selectList);
  const [store, setStore] = useRecoilState(selectStore);
  const [area, setArea] = useRecoilState(selectArea);
  const [resultSearch, setResultSearch] = useRecoilState(resultChat);
  const [resultPersonal, setResultPersonal] = useRecoilState(resultCheck);
  const [map, setMap] = useState(null);
  const [otherMarkers, setOtherMarkers] = useState([]);
  const [infowindows, setInfowindows] = useState([]);
  const [centerLat, setCenterLat] = useState(37.5271181);
  const [centerLong, setCenterLong] = useState(126.932956014);
  const [zoom, setZoom] = useState(12);

  //데이터 정하기
  let stores = [];
  if (!chatbot) {
    if (resultPersonal) {
      stores = resultPersonal;
    }
  } else {
    if (resultSearch) {
      stores = resultSearch;
    }
  }

  // 지도
  useEffect(() => {
    if (!mapElement.current || !naver) return;

    //중심부 찍기
    if (!area) {
      setCenterLat(37.5271181);
      setCenterLong(126.932956014);
      setZoom(12);
    } else {
      setZoom(14);
      if (area === "마포구") {
        setCenterLat(37.555362);
        setCenterLong(126.897518);
      } else if (area === "성동구") {
        setCenterLat(37.556233);
        setCenterLong(127.02976);
      } else if (area === "광진구") {
        setCenterLat(37.5492366);
        setCenterLong(127.0747086);
      } else if (area === "강남구") {
        setCenterLat(37.5092939);
        setCenterLong(127.0214957);
      } else if (area === "서초구") {
        setCenterLat(37.494604);
        setCenterLong(126.995818);
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

    setMap(new naver.maps.Map(mapElement.current, mapOptions));
  }, [area, mapElement, naver]);

  // 식당 위치 설정
  useEffect(() => {
    const newMarkers = [];
    const newInfowindows = [];

    stores.forEach((store, i) => {
      // 지오코딩(주소 -> 좌표)
      naver.maps.Service.geocode({ query: store.address }, function (status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          return alert("문제가 발생했습니다.");
        }

        // 마커 생성
        const marker = new naver.maps.Marker({
          map: map,
          title: store.store,
          position: new naver.maps.LatLng(response.v2.addresses[0].y, response.v2.addresses[0].x),
        });

        // 정보창 생성
        const infowindow = new naver.maps.InfoWindow({
          content: store.store,
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

        // 마커 클릭 이벤트 등록
        naver.maps.Event.addListener(marker, "click", function (e) {
          setStore(store.id);
        });

        newMarkers.push(marker);
        newInfowindows.push(infowindow);
      });
    });

    // 마커와 정보창 배열 업데이트
    setOtherMarkers(newMarkers);
    setInfowindows(newInfowindows);
  }, [stores]);

  // 정보창 열기/닫기(재렌더링 방지)
  useEffect(() => {
    if (store !== null) {
      infowindows.forEach((infowindow, i) => {
        if (store === stores[i].id) {
          infowindow.open(map, otherMarkers[i]);
        } else {
          infowindow.close();
        }
      });
    } else {
      infowindows.forEach((infowindow) => {
        infowindow.close();
      });
    }
  }, [store, stores, infowindows, otherMarkers]);

  return (
    <div
      ref={mapElement}
      style={{ marginTop: "60px", width: "100vw", height: "calc(100vh - 60px)" }}
    />
  );
}

export default Maps;
