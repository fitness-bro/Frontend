import React, { useEffect } from 'react';

const MapSection = ({ setMap }) => {
  useEffect(() => {
    const loadMapScript = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5501102, 126.924612),
          level: 2,
        };

        const map = new window.kakao.maps.Map(container, options);

        const markerPosition = new window.kakao.maps.LatLng(37.5501102, 126.924612);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        marker.setMap(map);

        setMap(map);
      } else {
        // Kakao 지도 스크립트가 로드되지 않았다면 재시도
        setTimeout(loadMapScript, 100);
      }
    };

    loadMapScript();
  }, [setMap]);

  return <div id="map" style={{ width: '500px', height: '590px', marginLeft: 'auto', marginRight: '16%', marginTop: '-200px' }}></div>;
};

export default MapSection;
