// MapSection.js
import React, { useEffect, useRef } from 'react';
import mapmarker from '../../img/mapmarker.svg';
import mapmarkerSelected from '../../img/mapmarkerSelected.svg';

const { kakao } = window;

const MapSection = ({ userList, onMarkerClick }) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);
  const selectedMarker = useRef(null);

  useEffect(() => {
    if (!userList || userList.length === 0) {
      return;
    }

    if (!mapInstance.current) {
      kakao.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new kakao.maps.LatLng(37.4966645, 127.0629804),
          level: 9,
        };

        const map = new kakao.maps.Map(container, options);

        markers.current.forEach(marker => marker.setMap(null));
        markers.current = [];
        selectedMarker.current = null;

        const geocoder = new kakao.maps.services.Geocoder();

        userList.forEach((user) => {
          const address = user.region + ' ' + user.subAddress + ' ' + user.detailAddress;

          geocoder.addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
              const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              const markerImage = new kakao.maps.MarkerImage(
                mapmarker,
                new kakao.maps.Size(54, 54),
                { offset: new kakao.maps.Point(27, 54) }
              );

              const markerImageSelected = new kakao.maps.MarkerImage(
                mapmarkerSelected,
                new kakao.maps.Size(46, 46),
                { offset: new kakao.maps.Point(27, 54) }
              );

              const marker = new kakao.maps.Marker({
                position: coords,
                image: markerImage,
              });

              kakao.maps.event.addListener(marker, 'click', function () {
                if (onMarkerClick) {
                  if (selectedMarker.current && selectedMarker.current !== marker) {
                    // 이전에 선택된 마커가 있고, 현재 클릭한 마커가 다르면 이전 마커를 원래대로 돌림
                    selectedMarker.current.setImage(markerImage);
                  }

                  onMarkerClick(user.id);

                  // 현재 클릭한 마커가 이전에 선택된 마커와 같으면 이미지를 원래대로 돌리고 리스트 섹션에 있는 유저 프로필의 색도 원래대로 돌림
                  if (selectedMarker.current === marker) {
                    selectedMarker.current.setImage(markerImage);
                    selectedMarker.current = null;  // 선택 해제
                  } else {
                    marker.setImage(markerImageSelected);
                    selectedMarker.current = marker;  // 현재 클릭한 마커를 선택
                  }
                }
              });

              marker.setMap(map);
              markers.current.push(marker);
              map.setCenter(coords);
            } else {
              console.log('주소를 찾을 수 없습니다.');
            }
          });
        });

        mapInstance.current = map;
      });
    }
  }, [userList, onMarkerClick]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: '500px',
        height: '650px',
        display: 'flex',
        marginLeft: '50%',
        marginTop: '-200px',
      }}
    ></div>
  );
};

export default MapSection;
