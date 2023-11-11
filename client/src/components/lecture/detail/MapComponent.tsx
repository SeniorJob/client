import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import CautionSVG from '../../../assets/images/caution.svg?react';

interface MapComponentProps {
  address: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    if (!address) {
      // address가 undefined인 경우 처리
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_MAPS_API_KEY
    }&autoload=false`;

    script.onload = () => {
      // Kakao Maps SDK 스크립트가 로드된 후에 좌표 변환과 지도 생성 수행
      window.kakao.maps.load(() => {
        fetch(
          `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
            address,
          )}`,
          {
            headers: {
              Authorization: `KakaoAK ${
                import.meta.env.VITE_KAKAO_MAPS_REST_API_KEY
              }`,
            },
          },
        )
          .then(response => response.json())
          .then(data => {
            const coords = data.documents[0]?.address;

            if (coords && mapRef.current) {
              const container = mapRef.current;
              const options = {
                center: new window.kakao.maps.LatLng(
                  parseFloat(coords.y),
                  parseFloat(coords.x),
                ),
                level: 3,
                scrollwheel: false,
              };

              const map = new window.kakao.maps.Map(container, options);
              const zoomControl = new window.kakao.maps.ZoomControl();
              map.addControl(
                zoomControl,
                window.kakao.maps.ControlPosition.BOTTOMRIGHT,
              );

              // 마커 생성 및 표시
              const markerPosition = new window.kakao.maps.LatLng(
                parseFloat(coords.y),
                parseFloat(coords.x),
              );
              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
              });
              marker.setMap(map);

              // 마커 위치로 지도 이동
              map.panTo(markerPosition);
            } else {
              // 주소 검색 실패 시의 로직 추가
              console.error('주소 검색 실패');
              setMapError(true);
            }
          })
          .catch(error => {
            console.error('주소 검색 중 오류 발생', error);
            setMapError(true);
          });
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [address]);

  if (mapError) {
    // 주소 검색 실패 시에 표시할 컴포넌트나 메시지
    return (
      <MapContainer>
        <CautionSVG width={70} />
        주소 데이터 불러오기에 실패했습니다.
      </MapContainer>
    );
  }

  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 0.3rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #bbb;
`;

export default MapComponent;
